import { PrismaClient } from '@prisma/client';
import { ulid } from 'ulid';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing data
  await prisma.eventoEnvio.deleteMany();
  await prisma.envioOficial.deleteMany();
  await prisma.partePolicial.deleteMany();
  await prisma.huesped.deleteMany();
  await prisma.reserva.deleteMany();
  await prisma.tarea.deleteMany();
  await prisma.gasto.deleteMany();
  await prisma.ingreso.deleteMany();
  await prisma.liquidacionPropietario.deleteMany();
  await prisma.unidad.deleteMany();
  await prisma.vivienda.deleteMany();
  await prisma.propietario.deleteMany();
  await prisma.usuario.deleteMany();

  // Create admin user
  const adminUser = await prisma.usuario.create({
    data: {
      ulid: ulid(),
      email: 'admin@contextomaestrro.com',
      password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsKUMz5n6', // password123
      nombre: 'Admin',
      apellidos: 'Sistema',
      rol: 'ADMIN',
    },
  });

  // Create propietarios
  const propietario1 = await prisma.propietario.create({
    data: {
      ulid: ulid(),
      nombre: 'María',
      apellidos: 'García López',
      email: 'maria.garcia@email.com',
      telefono: '+34666111222',
      nif: '12345678A',
      direccion: 'Calle Mayor 123, Madrid',
      tipoContribuyente: 'PERSONA_FISICA',
    },
  });

  const propietario2 = await prisma.propietario.create({
    data: {
      ulid: ulid(),
      nombre: 'Carlos',
      apellidos: 'Ruiz Martín',
      email: 'carlos.ruiz@email.com',
      telefono: '+34677333444',
      nif: '87654321B',
      direccion: 'Avenida de la Playa 45, Valencia',
      tipoContribuyente: 'PERSONA_FISICA',
    },
  });

  // Create viviendas
  const vivienda1 = await prisma.vivienda.create({
    data: {
      ulid: ulid(),
      nombre: 'Apartamento Centro Madrid',
      direccion: 'Calle Gran Vía 28, 3º A',
      ciudad: 'Madrid',
      codigoPostal: '28013',
      provincia: 'Madrid',
      licenciaTuristica: 'VT-28-123456',
      capacidadMaxima: 4,
      habitaciones: 2,
      banos: 1,
      propietarioId: propietario1.id,
    },
  });

  const vivienda2 = await prisma.vivienda.create({
    data: {
      ulid: ulid(),
      nombre: 'Casa Playa Valencia',
      direccion: 'Paseo Marítimo 15',
      ciudad: 'Valencia',
      codigoPostal: '46011',
      provincia: 'Valencia',
      licenciaTuristica: 'VT-46-789012',
      capacidadMaxima: 6,
      habitaciones: 3,
      banos: 2,
      propietarioId: propietario2.id,
    },
  });

  // Create unidades
  const unidad1 = await prisma.unidad.create({
    data: {
      ulid: ulid(),
      viviendaId: vivienda1.id,
      nombre: 'Apartamento completo',
      descripcion: 'Apartamento de 2 habitaciones en el centro de Madrid',
    },
  });

  const unidad2 = await prisma.unidad.create({
    data: {
      ulid: ulid(),
      viviendaId: vivienda2.id,
      nombre: 'Casa completa',
      descripcion: 'Casa de 3 habitaciones con vistas al mar',
    },
  });

  // Create reservas with different scenarios
  const reserva1 = await prisma.reserva.create({
    data: {
      ulid: ulid(),
      externalId: 'airbnb_HM123456789',
      viviendaId: vivienda1.id,
      unidadId: unidad1.id,
      fechaEntrada: new Date('2024-06-15'),
      fechaSalida: new Date('2024-06-20'),
      numeroHuespedes: 2,
      precioTotal: 450.00,
      moneda: 'EUR',
      canal: 'AIRBNB',
      estado: 'CONFIRMADA',
      estadoOperacion: 'DATOS_COMPLETOS',
      notas: 'Llegada tarde confirmada',
    },
  });

  const reserva2 = await prisma.reserva.create({
    data: {
      ulid: ulid(),
      externalId: 'booking_987654321',
      viviendaId: vivienda1.id,
      unidadId: unidad1.id,
      fechaEntrada: new Date('2024-07-01'),
      fechaSalida: new Date('2024-07-07'),
      numeroHuespedes: 4,
      precioTotal: 780.00,
      moneda: 'EUR',
      canal: 'BOOKING',
      estado: 'CREADA',
      estadoOperacion: 'RESERVA_CREADA',
    },
  });

  const reserva3 = await prisma.reserva.create({
    data: {
      ulid: ulid(),
      externalId: 'direct_001',
      viviendaId: vivienda2.id,
      unidadId: unidad2.id,
      fechaEntrada: new Date('2024-06-25'),
      fechaSalida: new Date('2024-06-30'),
      numeroHuespedes: 3,
      precioTotal: 625.00,
      moneda: 'EUR',
      canal: 'DIRECTO',
      estado: 'CONFIRMADA',
      estadoOperacion: 'SES_ENVIADO',
    },
  });

  // Future reservations for testing
  const reserva4 = await prisma.reserva.create({
    data: {
      ulid: ulid(),
      viviendaId: vivienda2.id,
      unidadId: unidad2.id,
      fechaEntrada: new Date('2024-08-15'),
      fechaSalida: new Date('2024-08-22'),
      numeroHuespedes: 6,
      precioTotal: 1050.00,
      moneda: 'EUR',
      canal: 'VRBO',
      estado: 'CREADA',
      estadoOperacion: 'RESERVA_CREADA',
    },
  });

  // Create huéspedes
  await prisma.huesped.createMany({
    data: [
      // Reserva 1 - Success case
      {
        ulid: ulid(),
        reservaId: reserva1.id,
        nombre: 'Juan',
        apellidos: 'Pérez García',
        tipoDocumento: 'DNI',
        numeroDocumento: '12345678A',
        fechaNacimiento: new Date('1985-03-15'),
        nacionalidad: 'España',
        email: 'juan.perez@email.com',
        telefono: '+34666777888',
        esTitular: true,
      },
      {
        ulid: ulid(),
        reservaId: reserva1.id,
        nombre: 'Ana',
        apellidos: 'Martínez Silva',
        tipoDocumento: 'DNI',
        numeroDocumento: '87654321B',
        fechaNacimiento: new Date('1987-11-22'),
        nacionalidad: 'España',
        email: 'ana.martinez@email.com',
        esTitular: false,
      },
      // Reserva 2 - Will be rejected by SES
      {
        ulid: ulid(),
        reservaId: reserva2.id,
        nombre: 'Pierre',
        apellidos: 'Dubois',
        tipoDocumento: 'PASAPORTE',
        numeroDocumento: 'FR1234567', // Invalid format for testing rejection
        fechaNacimiento: new Date('1975-05-10'),
        nacionalidad: 'Francia',
        email: 'pierre.dubois@email.fr',
        telefono: '+33123456789',
        esTitular: true,
      },
      {
        ulid: ulid(),
        reservaId: reserva2.id,
        nombre: 'Marie',
        apellidos: 'Dubois',
        tipoDocumento: 'PASAPORTE',
        numeroDocumento: 'FR7654321',
        fechaNacimiento: new Date('1978-08-30'),
        nacionalidad: 'Francia',
        esTitular: false,
      },
      // Reserva 3
      {
        ulid: ulid(),
        reservaId: reserva3.id,
        nombre: 'Klaus',
        apellidos: 'Müller',
        tipoDocumento: 'PASAPORTE',
        numeroDocumento: 'DE9876543',
        fechaNacimiento: new Date('1980-12-05'),
        nacionalidad: 'Alemania',
        email: 'klaus.muller@email.de',
        telefono: '+49123456789',
        esTitular: true,
      },
      {
        ulid: ulid(),
        reservaId: reserva3.id,
        nombre: 'Ingrid',
        apellidos: 'Schmidt',
        tipoDocumento: 'PASAPORTE',
        numeroDocumento: 'DE5432109',
        fechaNacimiento: new Date('1982-07-18'),
        nacionalidad: 'Alemania',
        esTitular: false,
      },
      // Reserva 4 - Future booking
      {
        ulid: ulid(),
        reservaId: reserva4.id,
        nombre: 'Robert',
        apellidos: 'Johnson',
        tipoDocumento: 'PASAPORTE',
        numeroDocumento: 'US123456789',
        fechaNacimiento: new Date('1970-01-25'),
        nacionalidad: 'Estados Unidos',
        email: 'robert.johnson@email.com',
        telefono: '+1234567890',
        esTitular: true,
      },
    ],
  });

  // Create partes policiales with different states
  const parteSuccess = await prisma.partePolicial.create({
    data: {
      ulid: ulid(),
      reservaId: reserva1.id,
      fechaEnvio: new Date('2024-06-10T10:30:00Z'),
      estado: 'ACEPTADO',
      numeroReferencia: 'SES202406101030001',
      intentos: 1,
    },
  });

  const parteRejected = await prisma.partePolicial.create({
    data: {
      ulid: ulid(),
      reservaId: reserva2.id,
      fechaEnvio: new Date('2024-06-25T14:15:00Z'),
      estado: 'RECHAZADO',
      numeroReferencia: 'SES202406251415002',
      intentos: 3,
      motivoRechazo: 'Documento de identidad inválido: formato de pasaporte incorrecto',
    },
  });

  const partePending = await prisma.partePolicial.create({
    data: {
      ulid: ulid(),
      reservaId: reserva3.id,
      fechaEnvio: new Date('2024-06-20T09:45:00Z'),
      estado: 'ENVIADO',
      numeroReferencia: 'SES202406200945003',
      intentos: 1,
    },
  });

  // Create envíos oficiales with audit trail
  await prisma.envioOficial.createMany({
    data: [
      {
        ulid: ulid(),
        parteId: parteSuccess.id,
        tipo: 'SES_HOSPEDAJES',
        fechaEnvio: new Date('2024-06-10T10:30:00Z'),
        estado: 'ACEPTADO',
        codigoRespuesta: 'OK',
        mensajeRespuesta: 'Parte procesado correctamente',
        hashSolicitud: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
        hashRespuesta: 'f6e5d4c3b2a1098765432109876543210fedcba0987654321fedcba09876543',
      },
      {
        ulid: ulid(),
        parteId: parteRejected.id,
        tipo: 'SES_HOSPEDAJES',
        fechaEnvio: new Date('2024-06-25T14:15:00Z'),
        estado: 'RECHAZADO',
        codigoRespuesta: 'ERR_VALIDATION',
        mensajeRespuesta: 'Error de validación: Documento de identidad inválido',
        hashSolicitud: 'b2c3d4e5f6a1789012345678901234567890abcdef1234567890abcdef123456',
        hashRespuesta: 'e5d4c3b2a1f6098765432109876543210fedcba0987654321fedcba09876543',
      },
      {
        ulid: ulid(),
        parteId: partePending.id,
        tipo: 'SES_HOSPEDAJES',
        fechaEnvio: new Date('2024-06-20T09:45:00Z'),
        estado: 'ENVIADO',
        codigoRespuesta: 'OK',
        mensajeRespuesta: 'Parte enviado correctamente',
        hashSolicitud: 'c3d4e5f6a1b2789012345678901234567890abcdef1234567890abcdef123456',
        hashRespuesta: 'd4c3b2a1f6e5098765432109876543210fedcba0987654321fedcba09876543',
      },
    ],
  });

  // Create eventos de envío
  await prisma.eventoEnvio.createMany({
    data: [
      {
        ulid: ulid(),
        reservaId: reserva1.id,
        tipo: 'RESERVA_CREADA',
        descripcion: 'Nueva reserva creada en el sistema',
        metadata: { canal: 'AIRBNB', reservaUlid: reserva1.ulid },
      },
      {
        ulid: ulid(),
        reservaId: reserva1.id,
        tipo: 'SES_OK',
        descripcion: 'Parte policial procesado correctamente',
        metadata: { parteId: parteSuccess.id, numeroReferencia: 'SES202406101030001' },
      },
      {
        ulid: ulid(),
        reservaId: reserva2.id,
        tipo: 'RESERVA_CREADA',
        descripcion: 'Nueva reserva creada en el sistema',
        metadata: { canal: 'BOOKING', reservaUlid: reserva2.ulid },
      },
      {
        ulid: ulid(),
        reservaId: reserva2.id,
        tipo: 'SES_FAIL',
        descripcion: 'Error en procesamiento de parte policial',
        metadata: { parteId: parteRejected.id, error: 'Documento inválido' },
      },
    ],
  });

  // Create some financial records
  await prisma.ingreso.createMany({
    data: [
      {
        ulid: ulid(),
        viviendaId: vivienda1.id,
        reservaId: reserva1.id,
        concepto: 'Alojamiento - Reserva Airbnb',
        importe: 450.00,
        fecha: new Date('2024-06-15'),
        canal: 'AIRBNB',
        referencia: 'airbnb_payment_123',
        estado: 'COMPLETADO',
      },
      {
        ulid: ulid(),
        viviendaId: vivienda2.id,
        reservaId: reserva3.id,
        concepto: 'Alojamiento - Reserva Directa',
        importe: 625.00,
        fecha: new Date('2024-06-25'),
        canal: 'STRIPE',
        referencia: 'stripe_pi_456',
        estado: 'COMPLETADO',
      },
    ],
  });

  await prisma.gasto.createMany({
    data: [
      {
        ulid: ulid(),
        viviendaId: vivienda1.id,
        concepto: 'Limpieza profesional',
        importe: 45.00,
        fecha: new Date('2024-06-20'),
        categoria: 'LIMPIEZA',
        proveedor: 'Limpiezas Madrid SL',
      },
      {
        ulid: ulid(),
        viviendaId: vivienda2.id,
        concepto: 'Reparación fontanería',
        importe: 85.00,
        fecha: new Date('2024-06-22'),
        categoria: 'MANTENIMIENTO',
        proveedor: 'Fontanería Valencia',
      },
    ],
  });

  // Create some tasks
  await prisma.tarea.createMany({
    data: [
      {
        ulid: ulid(),
        viviendaId: vivienda1.id,
        reservaId: reserva1.id,
        tipo: 'LIMPIEZA',
        titulo: 'Limpieza post check-out',
        descripcion: 'Limpieza completa tras salida de huéspedes',
        estado: 'COMPLETADA',
        prioridad: 'MEDIA',
        fechaLimite: new Date('2024-06-20T12:00:00Z'),
        fechaCompletada: new Date('2024-06-20T11:30:00Z'),
        asignadoA: 'limpieza@contextomaestrro.com',
      },
      {
        ulid: ulid(),
        viviendaId: vivienda2.id,
        tipo: 'MANTENIMIENTO',
        titulo: 'Revisar grifos cocina',
        descripcion: 'El huésped reportó goteo en grifo de cocina',
        estado: 'PENDIENTE',
        prioridad: 'ALTA',
        fechaLimite: new Date('2024-07-01T10:00:00Z'),
        asignadoA: 'mantenimiento@contextomaestrro.com',
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
  console.log('\n📊 Created:');
  console.log('- 1 Admin user (admin@contextomaestrro.com / password123)');
  console.log('- 2 Propietarios');
  console.log('- 2 Viviendas with licenses');
  console.log('- 2 Unidades');
  console.log('- 4 Reservas (different states)');
  console.log('- 8 Huéspedes');
  console.log('- 3 Partes policiales (ACEPTADO, RECHAZADO, ENVIADO)');
  console.log('- 3 Envíos oficiales with audit hashes');
  console.log('- 4 Eventos de envío');
  console.log('- 2 Ingresos');
  console.log('- 2 Gastos');
  console.log('- 2 Tareas');
  console.log('\n🧪 Test scenarios included:');
  console.log('- ✅ Successful SES submission and acceptance');
  console.log('- ❌ SES rejection with invalid document');
  console.log('- ⏳ Pending SES status check');
  console.log('- 🔄 Idempotency with external_id');
  console.log('- 📅 Future reservations for calendar testing');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });