import { Controller, Post, Get, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SesService } from './ses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('ses')
@Controller('api/ses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SesController {
  constructor(private readonly sesService: SesService) {}

  @Post('partes/:reservaId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Crear parte policial para reserva',
    description: 'Crea y programa el envío de un parte policial al SES para una reserva específica'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Parte creado y programado para envío',
    schema: {
      type: 'object',
      properties: {
        parteUlid: { type: 'string', example: '01HK9X8Y2VQZJN4K3M2L1P0QRS' },
        message: { type: 'string', example: 'Parte policial creado y programado para envío' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos o reserva no encontrada' })
  @ApiResponse({ status: 409, description: 'Parte ya existe para esta reserva' })
  async createParte(
    @Param('reservaId') reservaId: string,
    @Query('externalId') externalId?: string,
  ) {
    const parteUlid = await this.sesService.createParte(reservaId, externalId);
    return {
      parteUlid,
      message: 'Parte policial creado y programado para envío',
    };
  }

  @Get('evidence/export')
  @ApiOperation({ 
    summary: 'Exportar evidencias de cumplimiento',
    description: 'Exporta las evidencias de envíos al SES para auditoría e inspección'
  })
  @ApiQuery({ name: 'viviendaId', required: false, description: 'Filtrar por vivienda específica' })
  @ApiQuery({ name: 'fechaDesde', required: false, description: 'Fecha desde (ISO 8601)' })
  @ApiQuery({ name: 'fechaHasta', required: false, description: 'Fecha hasta (ISO 8601)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Evidencias exportadas exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          parteUlid: { type: 'string' },
          vivienda: { type: 'string' },
          licencia: { type: 'string' },
          fechaCreacion: { type: 'string', format: 'date-time' },
          fechaEnvio: { type: 'string', format: 'date-time' },
          estado: { type: 'string', enum: ['PENDIENTE', 'ENVIADO', 'ACEPTADO', 'RECHAZADO', 'ERROR'] },
          numeroReferencia: { type: 'string' },
          intentos: { type: 'number' },
          motivoRechazo: { type: 'string' },
          envios: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                fechaEnvio: { type: 'string', format: 'date-time' },
                estado: { type: 'string' },
                codigoRespuesta: { type: 'string' },
                hashSolicitud: { type: 'string' },
                hashRespuesta: { type: 'string' }
              }
            }
          }
        }
      }
    }
  })
  async getEvidenceExport(
    @Query('viviendaId') viviendaId?: string,
    @Query('fechaDesde') fechaDesde?: string,
    @Query('fechaHasta') fechaHasta?: string,
  ) {
    const fechaDesdeDate = fechaDesde ? new Date(fechaDesde) : undefined;
    const fechaHastaDate = fechaHasta ? new Date(fechaHasta) : undefined;
    
    return this.sesService.getEvidenceExport(viviendaId, fechaDesdeDate, fechaHastaDate);
  }

  @Get('connection/test')
  @ApiOperation({ 
    summary: 'Probar conexión con SES',
    description: 'Verifica la conectividad con el servicio SES'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Estado de la conexión',
    schema: {
      type: 'object',
      properties: {
        connected: { type: 'boolean' },
        message: { type: 'string' }
      }
    }
  })
  async testConnection() {
    const connected = await this.sesService.testConnection();
    return {
      connected,
      message: connected ? 'Conexión exitosa con SES' : 'Error de conexión con SES',
    };
  }
}