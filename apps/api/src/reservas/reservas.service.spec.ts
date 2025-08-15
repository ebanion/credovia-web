import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { PrismaService } from '../prisma/prisma.service';
import { UlidService } from '../common/services/ulid.service';
import { SesService } from '../ses/ses.service';
import { CalendarioService } from './services/calendario.service';
import { IcalImportService } from './services/ical-import.service';

describe('ReservasService - M0 Acceptance Tests', () => {
  let service: ReservasService;
  let prismaService: PrismaService;
  let calendarioService: CalendarioService;

  const mockPrismaService = {
    reserva: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
    },
    huesped: {
      createMany: jest.fn(),
    },
    eventoEnvio: {
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const mockCalendarioService = {
    checkCollision: jest.fn(),
    getMonthView: jest.fn(),
  };

  const mockSesService = {
    createParte: jest.fn(),
  };

  const mockUlidService = {
    generate: jest.fn().mockReturnValue('01HK9X8Y2VQZJN4K3M2L1P0QRS'),
  };

  const mockIcalImportService = {
    importFromUrl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservasService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: UlidService, useValue: mockUlidService },
        { provide: SesService, useValue: mockSesService },
        { provide: CalendarioService, useValue: mockCalendarioService },
        { provide: IcalImportService, useValue: mockIcalImportService },
      ],
    }).compile();

    service = module.get<ReservasService>(ReservasService);
    prismaService = module.get<PrismaService>(PrismaService);
    calendarioService = module.get<CalendarioService>(CalendarioService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('M0 Acceptance Criteria', () => {
    describe('AC1: Evita colisiones al importar iCal', () => {
      it('should prevent double bookings when creating reservation', async () => {
        // Arrange
        const reservaData = {
          viviendaId: 'test-vivienda',
          fechaEntrada: '2024-06-15',
          fechaSalida: '2024-06-20',
          numeroHuespedes: 2,
          precioTotal: 450,
        };

        mockCalendarioService.checkCollision.mockResolvedValue(true); // Collision detected

        // Act & Assert
        await expect(service.create(reservaData)).rejects.toThrow(ConflictException);
        expect(calendarioService.checkCollision).toHaveBeenCalledWith(
          'test-vivienda',
          undefined,
          new Date('2024-06-15'),
          new Date('2024-06-20'),
        );
      });

      it('should allow reservation when no collision exists', async () => {
        // Arrange
        const reservaData = {
          viviendaId: 'test-vivienda',
          fechaEntrada: '2024-06-15',
          fechaSalida: '2024-06-20',
          numeroHuespedes: 2,
          precioTotal: 450,
        };

        const mockReserva = {
          id: 'test-id',
          ulid: '01HK9X8Y2VQZJN4K3M2L1P0QRS',
          vivienda: { nombre: 'Test Property' },
          ...reservaData,
        };

        mockCalendarioService.checkCollision.mockResolvedValue(false);
        mockPrismaService.$transaction.mockImplementation(async (callback) => {
          return callback({
            reserva: {
              create: jest.fn().mockResolvedValue(mockReserva),
            },
            eventoEnvio: {
              create: jest.fn(),
            },
          });
        });
        mockPrismaService.reserva.findUnique.mockResolvedValue({
          ...mockReserva,
          huespedes: [],
        });

        // Act
        const result = await service.create(reservaData);

        // Assert
        expect(result).toBeDefined();
        expect(result.ulid).toBe('01HK9X8Y2VQZJN4K3M2L1P0QRS');
        expect(calendarioService.checkCollision).toHaveBeenCalled();
      });
    });

    describe('AC2: CRUD consistente de reservas', () => {
      it('should implement idempotency by external_id', async () => {
        // Arrange
        const reservaData = {
          externalId: 'airbnb_123456',
          viviendaId: 'test-vivienda',
          fechaEntrada: '2024-06-15',
          fechaSalida: '2024-06-20',
          numeroHuespedes: 2,
          precioTotal: 450,
        };

        const existingReserva = {
          id: 'existing-id',
          ulid: 'existing-ulid',
          vivienda: { nombre: 'Test Property' },
          huespedes: [],
          ...reservaData,
        };

        mockPrismaService.reserva.findUnique.mockResolvedValue(existingReserva);

        // Act
        const result = await service.create(reservaData);

        // Assert
        expect(result.ulid).toBe('existing-ulid');
        expect(mockPrismaService.reserva.findUnique).toHaveBeenCalledWith({
          where: { externalId: 'airbnb_123456' },
          include: {
            vivienda: { select: { nombre: true } },
            huespedes: true,
          },
        });
        // Should not create new reservation
        expect(mockPrismaService.$transaction).not.toHaveBeenCalled();
      });

      it('should validate date ranges', async () => {
        // Arrange
        const invalidReservaData = {
          viviendaId: 'test-vivienda',
          fechaEntrada: '2024-06-20', // After end date
          fechaSalida: '2024-06-15',  // Before start date
          numeroHuespedes: 2,
          precioTotal: 450,
        };

        // Act & Assert
        await expect(service.create(invalidReservaData)).rejects.toThrow(
          'Fecha de entrada debe ser anterior a fecha de salida'
        );
      });
    });

    describe('AC3: Calendario coherente con fechas', () => {
      it('should return calendar view with correct occupancy', async () => {
        // Arrange
        const mockCalendarData = {
          year: 2024,
          month: 6,
          daysInMonth: 30,
          days: [
            { date: new Date('2024-06-01'), day: 1, isOccupied: false, reservas: [] },
            { date: new Date('2024-06-15'), day: 15, isOccupied: true, reservas: [
              { ulid: 'test-ulid', canal: 'AIRBNB', numeroHuespedes: 2 }
            ]},
          ],
          totalReservas: 1,
          diasOcupados: 1,
          tasaOcupacion: 3, // 1/30 * 100 rounded
        };

        mockCalendarioService.getMonthView.mockResolvedValue(mockCalendarData);

        // Act
        const result = await service.getCalendar('test-vivienda', 2024, 6);

        // Assert
        expect(result).toEqual(mockCalendarData);
        expect(calendarioService.getMonthView).toHaveBeenCalledWith('test-vivienda', 2024, 6);
      });
    });

    describe('iCal Import Integration', () => {
      it('should import reservations from iCal without duplicates', async () => {
        // Arrange
        const mockIcalReservas = [
          {
            externalId: 'ical_airbnb_event1',
            viviendaId: 'test-vivienda',
            fechaEntrada: '2024-07-01',
            fechaSalida: '2024-07-05',
            numeroHuespedes: 1,
            precioTotal: 0,
            canal: 'AIRBNB',
          },
        ];

        mockIcalImportService.importFromUrl.mockResolvedValue(mockIcalReservas);
        mockCalendarioService.checkCollision.mockResolvedValue(false);
        mockPrismaService.reserva.findUnique.mockResolvedValue(null); // No existing reservation
        mockPrismaService.$transaction.mockImplementation(async (callback) => {
          return callback({
            reserva: { create: jest.fn().mockResolvedValue({ id: 'new-id', ulid: 'new-ulid' }) },
            eventoEnvio: { create: jest.fn() },
          });
        });
        mockPrismaService.reserva.findUnique.mockResolvedValueOnce(null) // For idempotency check
          .mockResolvedValueOnce({ // For final fetch
            id: 'new-id',
            ulid: 'new-ulid',
            vivienda: { nombre: 'Test Property' },
            huespedes: [],
          });

        // Act
        const result = await service.importFromIcal('test-vivienda', 'http://example.com/cal.ics', 'AIRBNB');

        // Assert
        expect(result.imported).toBe(1);
        expect(result.skipped).toBe(0);
        expect(result.errors).toHaveLength(0);
        expect(mockIcalImportService.importFromUrl).toHaveBeenCalledWith(
          'http://example.com/cal.ics',
          'test-vivienda',
          'AIRBNB'
        );
      });
    });
  });

  describe('Integration with SES (M1)', () => {
    it('should trigger SES parte creation when guests are provided', async () => {
      // Arrange
      const reservaData = {
        viviendaId: 'test-vivienda',
        fechaEntrada: '2024-06-15',
        fechaSalida: '2024-06-20',
        numeroHuespedes: 2,
        precioTotal: 450,
        huespedes: [
          {
            nombre: 'Juan',
            apellidos: 'Pérez',
            tipoDocumento: 'DNI',
            numeroDocumento: '12345678A',
            esTitular: true,
          },
        ],
      };

      const mockReserva = {
        id: 'test-id',
        ulid: '01HK9X8Y2VQZJN4K3M2L1P0QRS',
        vivienda: { nombre: 'Test Property' },
      };

      mockCalendarioService.checkCollision.mockResolvedValue(false);
      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return callback({
          reserva: { create: jest.fn().mockResolvedValue(mockReserva) },
          huesped: { createMany: jest.fn() },
          eventoEnvio: { create: jest.fn() },
        });
      });
      mockPrismaService.reserva.findUnique.mockResolvedValue({
        ...mockReserva,
        huespedes: [{ nombre: 'Juan', apellidos: 'Pérez' }],
      });
      mockSesService.createParte.mockResolvedValue('parte-ulid');

      // Act
      await service.create(reservaData);

      // Assert
      expect(mockSesService.createParte).toHaveBeenCalledWith('test-id', undefined);
    });

    it('should not fail reservation creation if SES fails', async () => {
      // Arrange
      const reservaData = {
        viviendaId: 'test-vivienda',
        fechaEntrada: '2024-06-15',
        fechaSalida: '2024-06-20',
        numeroHuespedes: 2,
        precioTotal: 450,
        huespedes: [
          {
            nombre: 'Juan',
            apellidos: 'Pérez',
            tipoDocumento: 'DNI',
            numeroDocumento: '12345678A',
            esTitular: true,
          },
        ],
      };

      const mockReserva = {
        id: 'test-id',
        ulid: '01HK9X8Y2VQZJN4K3M2L1P0QRS',
        vivienda: { nombre: 'Test Property' },
      };

      mockCalendarioService.checkCollision.mockResolvedValue(false);
      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return callback({
          reserva: { create: jest.fn().mockResolvedValue(mockReserva) },
          huesped: { createMany: jest.fn() },
          eventoEnvio: { create: jest.fn() },
        });
      });
      mockPrismaService.reserva.findUnique.mockResolvedValue({
        ...mockReserva,
        huespedes: [{ nombre: 'Juan', apellidos: 'Pérez' }],
      });
      mockSesService.createParte.mockRejectedValue(new Error('SES service unavailable'));

      // Act
      const result = await service.create(reservaData);

      // Assert
      expect(result).toBeDefined();
      expect(result.ulid).toBe('01HK9X8Y2VQZJN4K3M2L1P0QRS');
      // SES error should be logged but not fail the reservation
    });
  });
});