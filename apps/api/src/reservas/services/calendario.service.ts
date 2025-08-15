import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CalendarioService {
  private readonly logger = new Logger(CalendarioService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Check for reservation collisions
   * Critical for M0 - prevents double bookings
   */
  async checkCollision(
    viviendaId: string,
    unidadId: string | null,
    fechaEntrada: Date,
    fechaSalida: Date,
    excludeReservaId?: string,
  ): Promise<boolean> {
    const where: any = {
      viviendaId,
      estado: {
        not: 'CANCELADA',
      },
      OR: [
        // New reservation starts during existing reservation
        {
          fechaEntrada: {
            lte: fechaEntrada,
          },
          fechaSalida: {
            gt: fechaEntrada,
          },
        },
        // New reservation ends during existing reservation
        {
          fechaEntrada: {
            lt: fechaSalida,
          },
          fechaSalida: {
            gte: fechaSalida,
          },
        },
        // New reservation completely contains existing reservation
        {
          fechaEntrada: {
            gte: fechaEntrada,
          },
          fechaSalida: {
            lte: fechaSalida,
          },
        },
      ],
    };

    // If unidad is specified, check unit-level collision
    if (unidadId) {
      where.unidadId = unidadId;
    }

    // Exclude current reservation from collision check (for updates)
    if (excludeReservaId) {
      where.id = {
        not: excludeReservaId,
      };
    }

    const conflictingReservations = await this.prisma.reserva.count({
      where,
    });

    const hasCollision = conflictingReservations > 0;

    this.logger.debug('Collision check', {
      viviendaId,
      unidadId,
      fechaEntrada,
      fechaSalida,
      excludeReservaId,
      conflictingReservations,
      hasCollision,
    });

    return hasCollision;
  }

  /**
   * Get month view for calendar display
   */
  async getMonthView(viviendaId: string, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Last day of month

    const reservas = await this.prisma.reserva.findMany({
      where: {
        viviendaId,
        estado: {
          not: 'CANCELADA',
        },
        OR: [
          {
            fechaEntrada: {
              gte: startDate,
              lte: endDate,
            },
          },
          {
            fechaSalida: {
              gte: startDate,
              lte: endDate,
            },
          },
          {
            fechaEntrada: {
              lt: startDate,
            },
            fechaSalida: {
              gt: endDate,
            },
          },
        ],
      },
      include: {
        unidad: {
          select: {
            nombre: true,
          },
        },
      },
      orderBy: {
        fechaEntrada: 'asc',
      },
    });

    // Generate calendar days
    const daysInMonth = endDate.getDate();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayReservas = reservas.filter(reserva => {
        return date >= reserva.fechaEntrada && date < reserva.fechaSalida;
      });

      days.push({
        date,
        day,
        isOccupied: dayReservas.length > 0,
        reservas: dayReservas.map(reserva => ({
          ulid: reserva.ulid,
          canal: reserva.canal,
          numeroHuespedes: reserva.numeroHuespedes,
          unidad: reserva.unidad?.nombre,
          fechaEntrada: reserva.fechaEntrada,
          fechaSalida: reserva.fechaSalida,
          estado: reserva.estado,
        })),
      });
    }

    return {
      year,
      month,
      daysInMonth,
      days,
      totalReservas: reservas.length,
      diasOcupados: days.filter(day => day.isOccupied).length,
      tasaOcupacion: Math.round((days.filter(day => day.isOccupied).length / daysInMonth) * 100),
    };
  }

  /**
   * Get availability for date range
   */
  async getAvailability(viviendaId: string, fechaDesde: Date, fechaHasta: Date) {
    const reservas = await this.prisma.reserva.findMany({
      where: {
        viviendaId,
        estado: {
          not: 'CANCELADA',
        },
        OR: [
          {
            fechaEntrada: {
              gte: fechaDesde,
              lte: fechaHasta,
            },
          },
          {
            fechaSalida: {
              gte: fechaDesde,
              lte: fechaHasta,
            },
          },
          {
            fechaEntrada: {
              lt: fechaDesde,
            },
            fechaSalida: {
              gt: fechaHasta,
            },
          },
        ],
      },
      select: {
        fechaEntrada: true,
        fechaSalida: true,
        unidadId: true,
      },
    });

    // Calculate blocked date ranges
    const blockedRanges = reservas.map(reserva => ({
      from: reserva.fechaEntrada,
      to: reserva.fechaSalida,
      unidadId: reserva.unidadId,
    }));

    return {
      fechaDesde,
      fechaHasta,
      blockedRanges,
      totalBlocked: blockedRanges.length,
    };
  }
}