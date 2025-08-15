import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PrismaService } from '../prisma/prisma.service';
import { UlidService } from '../common/services/ulid.service';
import { HashingService } from '../common/services/hashing.service';
import { SesConnector } from './connectors/ses.connector';
import { SesParteData } from './interfaces/ses.interface';
import {
  EstadoPartePolicial,
  EstadoEnvio,
  TipoEnvio,
  TipoEvento,
} from '@prisma/client';

@Injectable()
export class SesService {
  private readonly logger = new Logger(SesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly ulidService: UlidService,
    private readonly hashingService: HashingService,
    private readonly sesConnector: SesConnector,
    @InjectQueue('ses-queue') private readonly sesQueue: Queue,
  ) {}

  /**
   * Create and queue parte policial for sending to SES
   * Implements idempotency by external_id
   */
  async createParte(reservaId: string, externalId?: string): Promise<string> {
    this.logger.log('Creating parte policial', { reservaId, externalId });

    // Check for existing parte with same external_id (idempotency)
    if (externalId) {
      const existing = await this.prisma.partePolicial.findFirst({
        where: {
          reserva: { externalId },
        },
      });

      if (existing) {
        this.logger.debug('Parte already exists for external_id', { externalId, parteId: existing.id });
        return existing.ulid;
      }
    }

    // Get reservation with all required data
    const reserva = await this.prisma.reserva.findUnique({
      where: { id: reservaId },
      include: {
        vivienda: {
          include: {
            propietario: true,
          },
        },
        huespedes: true,
      },
    });

    if (!reserva) {
      throw new Error(`Reservation not found: ${reservaId}`);
    }

    if (reserva.huespedes.length === 0) {
      throw new Error(`No guests found for reservation: ${reservaId}`);
    }

    // Create parte policial record
    const parte = await this.prisma.partePolicial.create({
      data: {
        ulid: this.ulidService.generate(),
        reservaId,
        estado: EstadoPartePolicial.PENDIENTE,
        intentos: 0,
        maxIntentos: 3,
        proximoIntento: new Date(), // Send immediately
      },
    });

    // Queue for immediate sending
    await this.sesQueue.add('send-parte', {
      parteId: parte.id,
    });

    // Log event (without PII)
    await this.logEvent(TipoEvento.SES_PROGRAMADO, reservaId, {
      parteId: parte.id,
      parteUlid: parte.ulid,
    });

    this.logger.log('Parte created and queued', { parteId: parte.id, parteUlid: parte.ulid });

    return parte.ulid;
  }

  /**
   * Send parte to SES with retry logic and audit trail
   */
  async sendParte(parteId: string): Promise<void> {
    this.logger.log('Processing parte send', { parteId });

    const parte = await this.prisma.partePolicial.findUnique({
      where: { id: parteId },
      include: {
        reserva: {
          include: {
            vivienda: true,
            huespedes: true,
          },
        },
      },
    });

    if (!parte) {
      throw new Error(`Parte not found: ${parteId}`);
    }

    if (parte.estado !== EstadoPartePolicial.PENDIENTE) {
      this.logger.debug('Parte already processed', { parteId, estado: parte.estado });
      return;
    }

    try {
      // Prepare data for SES (no PII in logs)
      const sesData: SesParteData = {
        fechaEntrada: parte.reserva.fechaEntrada,
        fechaSalida: parte.reserva.fechaSalida,
        vivienda: {
          nombre: parte.reserva.vivienda.nombre,
          direccion: parte.reserva.vivienda.direccion,
          ciudad: parte.reserva.vivienda.ciudad,
          provincia: parte.reserva.vivienda.provincia,
          licenciaTuristica: parte.reserva.vivienda.licenciaTuristica,
        },
        huespedes: parte.reserva.huespedes.map(huesped => ({
          nombre: huesped.nombre,
          apellidos: huesped.apellidos,
          tipoDocumento: huesped.tipoDocumento,
          numeroDocumento: huesped.numeroDocumento,
          fechaNacimiento: huesped.fechaNacimiento,
          nacionalidad: huesped.nacionalidad,
          esTitular: huesped.esTitular,
        })),
      };

      // Generate hash of request for audit trail (before sending)
      const requestHash = this.hashingService.sha256(sesData);

      // Send to SES
      const response = await this.sesConnector.sendParte(sesData);

      // Generate hash of response for audit trail
      const responseHash = this.hashingService.sha256(response);

      if (response.success) {
        // Update parte as sent successfully
        await this.prisma.partePolicial.update({
          where: { id: parteId },
          data: {
            estado: EstadoPartePolicial.ENVIADO,
            fechaEnvio: new Date(),
            numeroReferencia: response.numeroReferencia,
            intentos: parte.intentos + 1,
          },
        });

        // Create envío oficial record with hashes
        await this.prisma.envioOficial.create({
          data: {
            ulid: this.ulidService.generate(),
            parteId,
            tipo: TipoEnvio.SES_HOSPEDAJES,
            fechaEnvio: new Date(),
            estado: EstadoEnvio.ENVIADO,
            codigoRespuesta: response.codigo,
            mensajeRespuesta: response.mensaje,
            hashSolicitud: requestHash,
            hashRespuesta: responseHash,
          },
        });

        // Log success event
        await this.logEvent(TipoEvento.SES_OK, parte.reservaId, {
          parteId,
          numeroReferencia: response.numeroReferencia,
        });

        // Queue status check for later
        await this.sesQueue.add('check-status', {
          parteId,
          numeroReferencia: response.numeroReferencia,
        }, {
          delay: 5 * 60 * 1000, // Check after 5 minutes
        });

        this.logger.log('Parte sent successfully', { 
          parteId, 
          numeroReferencia: response.numeroReferencia 
        });
      } else {
        throw new Error(`SES rejected parte: ${response.mensaje}`);
      }

    } catch (error) {
      this.logger.error('Error sending parte', { parteId, error: error.message });

      const newIntentos = parte.intentos + 1;
      const shouldRetry = newIntentos < parte.maxIntentos;

      // Update parte with error
      await this.prisma.partePolicial.update({
        where: { id: parteId },
        data: {
          estado: shouldRetry ? EstadoPartePolicial.PENDIENTE : EstadoPartePolicial.ERROR,
          intentos: newIntentos,
          motivoRechazo: error.message,
          proximoIntento: shouldRetry 
            ? new Date(Date.now() + Math.pow(2, newIntentos) * 60000) // Exponential backoff
            : null,
        },
      });

      // Log failure event
      await this.logEvent(TipoEvento.SES_FAIL, parte.reservaId, {
        parteId,
        error: error.message,
        intentos: newIntentos,
        willRetry: shouldRetry,
      });

      // Schedule retry if within limits
      if (shouldRetry) {
        const delay = Math.pow(2, newIntentos) * 60000; // Exponential backoff
        await this.sesQueue.add('send-parte', { parteId }, { delay });
        this.logger.log('Scheduled retry', { parteId, delay, attempt: newIntentos });
      } else {
        this.logger.error('Max retries exceeded for parte', { parteId });
      }
    }
  }

  /**
   * Check status of sent parte and update accordingly
   */
  async checkParteStatus(parteId: string, numeroReferencia: string): Promise<void> {
    this.logger.log('Checking parte status', { parteId, numeroReferencia });

    try {
      const statusResponse = await this.sesConnector.checkStatus(numeroReferencia);

      let newEstado: EstadoPartePolicial;
      switch (statusResponse.estado) {
        case 'ACEPTADO':
          newEstado = EstadoPartePolicial.ACEPTADO;
          break;
        case 'RECHAZADO':
          newEstado = EstadoPartePolicial.RECHAZADO;
          break;
        case 'PENDIENTE':
          // Schedule another check
          await this.sesQueue.add('check-status', {
            parteId,
            numeroReferencia,
          }, {
            delay: 10 * 60 * 1000, // Check again in 10 minutes
          });
          return;
        default:
          throw new Error(`Unknown SES status: ${statusResponse.estado}`);
      }

      // Update parte status
      await this.prisma.partePolicial.update({
        where: { id: parteId },
        data: {
          estado: newEstado,
          motivoRechazo: statusResponse.estado === 'RECHAZADO' ? statusResponse.mensaje : null,
        },
      });

      // Update envío oficial status
      await this.prisma.envioOficial.updateMany({
        where: { parteId },
        data: {
          estado: statusResponse.estado === 'ACEPTADO' ? EstadoEnvio.ACEPTADO : EstadoEnvio.RECHAZADO,
          codigoRespuesta: statusResponse.codigo,
          mensajeRespuesta: statusResponse.mensaje,
        },
      });

      // Get reservation ID for event logging
      const parte = await this.prisma.partePolicial.findUnique({
        where: { id: parteId },
        select: { reservaId: true },
      });

      if (parte) {
        const eventType = statusResponse.estado === 'ACEPTADO' ? TipoEvento.SES_OK : TipoEvento.SES_FAIL;
        await this.logEvent(eventType, parte.reservaId, {
          parteId,
          numeroReferencia,
          estadoFinal: statusResponse.estado,
        });
      }

      this.logger.log('Parte status updated', { parteId, estado: newEstado });

    } catch (error) {
      this.logger.error('Error checking parte status', { parteId, error: error.message });
      
      // Schedule retry for status check
      await this.sesQueue.add('check-status', {
        parteId,
        numeroReferencia,
      }, {
        delay: 30 * 60 * 1000, // Retry in 30 minutes
      });
    }
  }

  /**
   * Get evidence export for inspection (CSV/PDF)
   */
  async getEvidenceExport(viviendaId?: string, fechaDesde?: Date, fechaHasta?: Date) {
    const where: any = {};
    
    if (viviendaId) {
      where.reserva = { viviendaId };
    }
    
    if (fechaDesde || fechaHasta) {
      where.createdAt = {};
      if (fechaDesde) where.createdAt.gte = fechaDesde;
      if (fechaHasta) where.createdAt.lte = fechaHasta;
    }

    const partes = await this.prisma.partePolicial.findMany({
      where,
      include: {
        reserva: {
          include: {
            vivienda: {
              select: {
                nombre: true,
                direccion: true,
                licenciaTuristica: true,
              },
            },
          },
        },
        envios: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Format for export (no PII, only audit trail)
    return partes.map(parte => ({
      parteUlid: parte.ulid,
      vivienda: parte.reserva.vivienda.nombre,
      licencia: parte.reserva.vivienda.licenciaTuristica,
      fechaCreacion: parte.createdAt,
      fechaEnvio: parte.fechaEnvio,
      estado: parte.estado,
      numeroReferencia: parte.numeroReferencia,
      intentos: parte.intentos,
      motivoRechazo: parte.motivoRechazo,
      envios: parte.envios.map(envio => ({
        fechaEnvio: envio.fechaEnvio,
        estado: envio.estado,
        codigoRespuesta: envio.codigoRespuesta,
        hashSolicitud: envio.hashSolicitud,
        hashRespuesta: envio.hashRespuesta,
      })),
    }));
  }

  /**
   * Test SES connection
   */
  async testConnection(): Promise<boolean> {
    return this.sesConnector.testConnection();
  }

  /**
   * Log event without PII
   */
  private async logEvent(tipo: TipoEvento, reservaId: string, metadata: any): Promise<void> {
    await this.prisma.eventoEnvio.create({
      data: {
        ulid: this.ulidService.generate(),
        reservaId,
        tipo,
        descripcion: this.getEventDescription(tipo),
        metadata: this.hashingService.redactPII(metadata),
      },
    });
  }

  private getEventDescription(tipo: TipoEvento): string {
    switch (tipo) {
      case TipoEvento.SES_PROGRAMADO: return 'Parte policial programado para envío';
      case TipoEvento.SES_OK: return 'Parte policial procesado correctamente';
      case TipoEvento.SES_FAIL: return 'Error en procesamiento de parte policial';
      default: return 'Evento SES';
    }
  }
}