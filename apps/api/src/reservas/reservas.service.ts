import { Injectable, Logger, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UlidService } from '../common/services/ulid.service';
import { SesService } from '../ses/ses.service';
import { CalendarioService } from './services/calendario.service';
import { IcalImportService } from './services/ical-import.service';
import { CreateReservaDto, UpdateReservaDto } from './dto/reserva.dto';
import { EstadoReserva, EstadoOperacion, TipoEvento } from '@prisma/client';

@Injectable()
export class ReservasService {
  private readonly logger = new Logger(ReservasService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly ulidService: UlidService,
    private readonly sesService: SesService,
    private readonly calendarioService: CalendarioService,
    private readonly icalImportService: IcalImportService,
  ) {}

  /**
   * Create new reservation with collision detection
   * Implements idempotency by external_id
   */
  async create(data: CreateReservaDto): Promise<any> {
    this.logger.log('Creating reservation', { 
      viviendaId: data.viviendaId,
      externalId: data.externalId,
      fechaEntrada: data.fechaEntrada,
      fechaSalida: data.fechaSalida,
    });

    // Check for idempotency by external_id
    if (data.externalId) {
      const existing = await this.prisma.reserva.findUnique({
        where: { externalId: data.externalId },
        include: {
          vivienda: { select: { nombre: true } },
          huespedes: true,
        },
      });

      if (existing) {
        this.logger.debug('Reservation already exists for external_id', { 
          externalId: data.externalId,
          reservaId: existing.id 
        });
        return this.formatReservaResponse(existing);
      }
    }

    // Validate dates
    if (new Date(data.fechaEntrada) >= new Date(data.fechaSalida)) {
      throw new BadRequestException('Fecha de entrada debe ser anterior a fecha de salida');
    }

    // Check for collisions
    const hasCollision = await this.calendarioService.checkCollision(
      data.viviendaId,
      data.unidadId,
      new Date(data.fechaEntrada),
      new Date(data.fechaSalida),
    );

    if (hasCollision) {
      throw new ConflictException('Ya existe una reserva para las fechas seleccionadas');
    }

    // Create reservation in transaction
    const reserva = await this.prisma.$transaction(async (tx) => {
      const newReserva = await tx.reserva.create({
        data: {
          ulid: this.ulidService.generate(),
          externalId: data.externalId,
          viviendaId: data.viviendaId,
          unidadId: data.unidadId,
          fechaEntrada: new Date(data.fechaEntrada),
          fechaSalida: new Date(data.fechaSalida),
          numeroHuespedes: data.numeroHuespedes,
          precioTotal: data.precioTotal,
          moneda: data.moneda || 'EUR',
          canal: data.canal || 'DIRECTO',
          estado: EstadoReserva.CREADA,
          estadoOperacion: EstadoOperacion.RESERVA_CREADA,
          notas: data.notas,
        },
        include: {
          vivienda: { select: { nombre: true } },
        },
      });

      // Create guests if provided
      if (data.huespedes && data.huespedes.length > 0) {
        await tx.huesped.createMany({
          data: data.huespedes.map((huesped, index) => ({
            ulid: this.ulidService.generate(),
            reservaId: newReserva.id,
            nombre: huesped.nombre,
            apellidos: huesped.apellidos,
            tipoDocumento: huesped.tipoDocumento,
            numeroDocumento: huesped.numeroDocumento,
            fechaNacimiento: huesped.fechaNacimiento ? new Date(huesped.fechaNacimiento) : null,
            nacionalidad: huesped.nacionalidad,
            email: huesped.email,
            telefono: huesped.telefono,
            esTitular: index === 0 || huesped.esTitular === true, // First guest is titular by default
          })),
        });
      }

      // Log RESERVA_CREADA event
      await tx.eventoEnvio.create({
        data: {
          ulid: this.ulidService.generate(),
          reservaId: newReserva.id,
          tipo: TipoEvento.RESERVA_CREADA,
          descripcion: 'Nueva reserva creada en el sistema',
          metadata: {
            reservaUlid: newReserva.ulid,
            vivienda: newReserva.vivienda.nombre,
            canal: newReserva.canal,
          },
        },
      });

      return newReserva;
    });

    // Trigger SES parte creation asynchronously if guests are present
    if (data.huespedes && data.huespedes.length > 0) {
      try {
        await this.sesService.createParte(reserva.id, data.externalId);
      } catch (error) {
        this.logger.error('Failed to create SES parte for reservation', { 
          reservaId: reserva.id,
          error: error.message 
        });
        // Don't fail the reservation creation for SES errors
      }
    }

    // Fetch complete reservation for response
    const completeReserva = await this.prisma.reserva.findUnique({
      where: { id: reserva.id },
      include: {
        vivienda: { select: { nombre: true } },
        unidad: { select: { nombre: true } },
        huespedes: true,
      },
    });

    this.logger.log('Reservation created successfully', { 
      reservaId: reserva.id,
      reservaUlid: reserva.ulid 
    });

    return this.formatReservaResponse(completeReserva);
  }

  /**
   * Find all reservations with filters
   */
  async findAll(filters: {
    viviendaId?: string;
    fechaDesde?: Date;
    fechaHasta?: Date;
    estado?: EstadoReserva;
    canal?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: any = {};

    if (filters.viviendaId) {
      where.viviendaId = filters.viviendaId;
    }

    if (filters.fechaDesde || filters.fechaHasta) {
      where.fechaEntrada = {};
      if (filters.fechaDesde) where.fechaEntrada.gte = filters.fechaDesde;
      if (filters.fechaHasta) where.fechaEntrada.lte = filters.fechaHasta;
    }

    if (filters.estado) {
      where.estado = filters.estado;
    }

    if (filters.canal) {
      where.canal = filters.canal;
    }

    const [reservas, total] = await Promise.all([
      this.prisma.reserva.findMany({
        where,
        include: {
          vivienda: { select: { nombre: true } },
          unidad: { select: { nombre: true } },
          huespedes: true,
        },
        orderBy: { fechaEntrada: 'asc' },
        take: filters.limit || 50,
        skip: filters.offset || 0,
      }),
      this.prisma.reserva.count({ where }),
    ]);

    return {
      data: reservas.map(this.formatReservaResponse),
      total,
      limit: filters.limit || 50,
      offset: filters.offset || 0,
    };
  }

  /**
   * Find single reservation by ULID
   */
  async findOne(ulid: string) {
    const reserva = await this.prisma.reserva.findUnique({
      where: { ulid },
      include: {
        vivienda: { select: { nombre: true } },
        unidad: { select: { nombre: true } },
        huespedes: true,
        partesPoliciales: {
          include: {
            envios: true,
          },
        },
      },
    });

    if (!reserva) {
      throw new BadRequestException('Reserva no encontrada');
    }

    return this.formatReservaResponse(reserva);
  }

  /**
   * Update reservation
   */
  async update(ulid: string, data: UpdateReservaDto) {
    const existing = await this.prisma.reserva.findUnique({
      where: { ulid },
    });

    if (!existing) {
      throw new BadRequestException('Reserva no encontrada');
    }

    // Check for date collision if dates are being changed
    if (data.fechaEntrada || data.fechaSalida) {
      const newFechaEntrada = data.fechaEntrada ? new Date(data.fechaEntrada) : existing.fechaEntrada;
      const newFechaeSalida = data.fechaSalida ? new Date(data.fechaSalida) : existing.fechaSalida;

      if (newFechaEntrada >= newFechaeSalida) {
        throw new BadRequestException('Fecha de entrada debe ser anterior a fecha de salida');
      }

      const hasCollision = await this.calendarioService.checkCollision(
        existing.viviendaId,
        existing.unidadId,
        newFechaEntrada,
        newFechaeSalida,
        existing.id, // Exclude current reservation from collision check
      );

      if (hasCollision) {
        throw new ConflictException('Ya existe una reserva para las fechas seleccionadas');
      }
    }

    const updatedReserva = await this.prisma.reserva.update({
      where: { ulid },
      data: {
        fechaEntrada: data.fechaEntrada ? new Date(data.fechaEntrada) : undefined,
        fechaSalida: data.fechaSalida ? new Date(data.fechaSalida) : undefined,
        numeroHuespedes: data.numeroHuespedes,
        precioTotal: data.precioTotal,
        estado: data.estado,
        estadoOperacion: data.estadoOperacion,
        notas: data.notas,
      },
      include: {
        vivienda: { select: { nombre: true } },
        unidad: { select: { nombre: true } },
        huespedes: true,
      },
    });

    return this.formatReservaResponse(updatedReserva);
  }

  /**
   * Import reservations from iCal URL
   */
  async importFromIcal(viviendaId: string, icalUrl: string, canal: string = 'ICAL_IMPORT') {
    this.logger.log('Importing from iCal', { viviendaId, icalUrl, canal });

    try {
      const reservas = await this.icalImportService.importFromUrl(icalUrl, viviendaId, canal);
      
      let importedCount = 0;
      let skippedCount = 0;
      const errors: string[] = [];

      for (const reservaData of reservas) {
        try {
          await this.create(reservaData);
          importedCount++;
        } catch (error) {
          if (error instanceof ConflictException) {
            skippedCount++; // Skip existing reservations
          } else {
            errors.push(`Error importing reservation: ${error.message}`);
          }
        }
      }

      this.logger.log('iCal import completed', { 
        importedCount, 
        skippedCount, 
        errorCount: errors.length 
      });

      return {
        imported: importedCount,
        skipped: skippedCount,
        errors,
        total: reservas.length,
      };

    } catch (error) {
      this.logger.error('iCal import failed', { error: error.message });
      throw new BadRequestException(`Error importing iCal: ${error.message}`);
    }
  }

  /**
   * Get calendar view for a property
   */
  async getCalendar(viviendaId: string, year: number, month: number) {
    return this.calendarioService.getMonthView(viviendaId, year, month);
  }

  /**
   * Format reservation response (remove internal IDs, add calculated fields)
   */
  private formatReservaResponse(reserva: any) {
    const noches = Math.ceil(
      (new Date(reserva.fechaSalida).getTime() - new Date(reserva.fechaEntrada).getTime()) / 
      (1000 * 60 * 60 * 24)
    );

    return {
      ulid: reserva.ulid,
      externalId: reserva.externalId,
      vivienda: {
        nombre: reserva.vivienda?.nombre,
      },
      unidad: reserva.unidad ? {
        nombre: reserva.unidad.nombre,
      } : null,
      fechaEntrada: reserva.fechaEntrada,
      fechaSalida: reserva.fechaSalida,
      noches,
      numeroHuespedes: reserva.numeroHuespedes,
      precioTotal: reserva.precioTotal,
      precioPromedioPorNoche: noches > 0 ? Number(reserva.precioTotal) / noches : 0,
      moneda: reserva.moneda,
      canal: reserva.canal,
      estado: reserva.estado,
      estadoOperacion: reserva.estadoOperacion,
      notas: reserva.notas,
      huespedes: reserva.huespedes?.map((huesped: any) => ({
        ulid: huesped.ulid,
        nombre: huesped.nombre,
        apellidos: huesped.apellidos,
        tipoDocumento: huesped.tipoDocumento,
        numeroDocumento: huesped.numeroDocumento,
        fechaNacimiento: huesped.fechaNacimiento,
        nacionalidad: huesped.nacionalidad,
        email: huesped.email,
        telefono: huesped.telefono,
        esTitular: huesped.esTitular,
      })) || [],
      partesPoliciales: reserva.partesPoliciales?.map((parte: any) => ({
        ulid: parte.ulid,
        estado: parte.estado,
        fechaEnvio: parte.fechaEnvio,
        numeroReferencia: parte.numeroReferencia,
        intentos: parte.intentos,
        motivoRechazo: parte.motivoRechazo,
      })) || [],
      createdAt: reserva.createdAt,
      updatedAt: reserva.updatedAt,
    };
  }
}