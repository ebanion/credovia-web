# Contexto Maestro - CRM/PMS de Alquiler Turístico

**Versión 1.0** | Sistema de gestión integral para alquiler turístico en España

## 🎯 Visión y Propuesta de Valor

Contexto Maestro es un CRM/PMS especializado para propietarios y gestores de viviendas turísticas en España. Combina la funcionalidad estándar del sector con diferenciadores únicos para el mercado español:

### ✨ Diferenciales Clave
- **🏛️ Cumplimiento Legal a Prueba de Inspección**: Envío automático de partes policiales al SES con estados, reintentos y bitácora con huella digital
- **📊 Calculadora Fiscal Trimestral**: Estimaciones orientativas con supuestos visibles y simulaciones
- **💰 Precios Dinámicos Explicables**: Motor que explica por qué sube o baja cada precio
- **💬 Salas de Mensajería Inteligentes**: Comunicación post-reserva con ventanas temporales y bloqueo automático de códigos
- **🔧 Automatización Operativa**: Robots de ayuda para limpieza y mantenimiento

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Backend**: TypeScript + NestJS + Prisma ORM
- **Base de Datos**: PostgreSQL
- **Caché/Colas**: Redis + Bull
- **API**: REST con OpenAPI 3.1
- **Autenticación**: JWT + Roles
- **Orquestación**: n8n para workflows
- **Mensajería**: WhatsApp Business API + SMTP
- **Containerización**: Docker + Docker Compose

### Principios de Arquitectura
- **🔒 Privacidad desde el Diseño**: Cero PII en logs técnicos
- **🔄 Idempotencia**: Por `external_id` en todas las operaciones críticas
- **📋 Trazabilidad Legal**: Hashes SHA-256 de solicitudes/respuestas SES
- **⚡ Reintentos Inteligentes**: Backoff exponencial con límites configurables
- **🎯 Multi-cliente**: Scoping por propietario desde el diseño

## 📦 Estructura del Proyecto

```
contexto-maestro/
├── apps/
│   ├── api/                 # Backend NestJS
│   │   ├── src/
│   │   │   ├── auth/        # Autenticación y autorización
│   │   │   ├── common/      # Utilidades compartidas
│   │   │   ├── ses/         # Módulo SES (M1) - CRÍTICO
│   │   │   ├── reservas/    # Módulo reservas (M0)
│   │   │   ├── viviendas/   # Gestión de propiedades
│   │   │   ├── huespedes/   # Gestión de huéspedes
│   │   │   ├── tareas/      # Housekeeping y mantenimiento
│   │   │   ├── finanzas/    # Ingresos, gastos, fianzas
│   │   │   └── events/      # Sistema de eventos
│   │   └── prisma/          # Esquema de base de datos
│   └── web/                 # Frontend Next.js
└── packages/
    ├── sdk/                 # SDK compartido
    └── config/              # Configuraciones compartidas
```

## 🚀 Inicio Rápido

### Prerrequisitos
- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Docker** y **Docker Compose**

### 1. Configuración Inicial

```bash
# Clonar y configurar el proyecto
git clone <repository-url>
cd contexto-maestro

# Copiar variables de entorno
cp .env.example .env

# Instalar dependencias
pnpm install
```

### 2. Configurar Variables de Entorno

Edita el archivo `.env` con tus configuraciones:

```bash
# Base de datos
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/contexto_maestro"

# SES (usar stub en desarrollo)
SES_SIMULATE_FAILURES=true
SES_API_URL=https://api.ses.example.com
SES_API_KEY=your-ses-api-key

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### 3. Iniciar Servicios

```bash
# Iniciar base de datos y Redis
docker-compose up -d postgres redis

# Ejecutar migraciones
pnpm db:migrate

# Sembrar datos de prueba
pnpm db:seed

# Iniciar aplicación en desarrollo
pnpm dev
```

### 4. Verificar Instalación

- **API**: http://localhost:3001
- **Documentación API**: http://localhost:3001/api/docs
- **Frontend**: http://localhost:3000
- **Prisma Studio**: `pnpm db:studio`

## 🧪 Datos de Prueba

El sistema incluye datos realistas para testing:

### Usuarios
- **Admin**: `admin@contextomaestrro.com` / `password123`

### Escenarios de Prueba
- ✅ **Reserva exitosa**: SES aceptado, parte procesado
- ❌ **Reserva rechazada**: SES rechaza por documento inválido  
- ⏳ **Reserva pendiente**: SES en proceso de validación
- 🔄 **Idempotencia**: Reservas con `external_id` duplicados

### Propiedades de Prueba
- **Apartamento Centro Madrid** (VT-28-123456)
- **Casa Playa Valencia** (VT-46-789012)

## 📋 Módulos Implementados

### ✅ M0 - Núcleo de Datos y Reservas
- CRUD de reservas con detección de colisiones
- Importación iCal sin duplicados
- Calendario coherente
- Sistema de eventos

### ✅ M1 - Cumplimiento Legal SES (CRÍTICO)
- Envío automático de partes policiales
- Estados: PENDIENTE → ENVIADO → ACEPTADO/RECHAZADO
- Reintentos con backoff exponencial
- Bitácora con huellas SHA-256 (sin PII)
- Exportación de evidencias para inspección
- **Tasa de aceptación objetivo: ≥98%**

### 🔄 En Desarrollo
- M2: Salas de mensajería post-reserva
- M3: Cobros, fianzas y facturación
- M4: Calculadora fiscal estimativa
- M5: Precio dinámico explicable

## 🔒 Seguridad y Cumplimiento

### Protección de Datos
- **Cero PII en logs técnicos**: Solo IDs y hashes
- **Redacción automática**: Middleware que elimina campos sensibles
- **Cifrado en tránsito y reposo**
- **Retención programada** de datos

### Trazabilidad Legal
- **Hashes SHA-256** de todas las comunicaciones SES
- **Estados auditables** con timestamps
- **Evidencias descargables** en CSV/PDF
- **Idempotencia garantizada** por `external_id`

### Ejemplo de Bitácora Legal
```json
{
  "parteUlid": "01HK9X8Y2VQZJN4K3M2L1P0QRS",
  "fechaEnvio": "2024-06-10T10:30:00Z",
  "estado": "ACEPTADO",
  "numeroReferencia": "SES202406101030001",
  "hashSolicitud": "a1b2c3d4e5f6789...",
  "hashRespuesta": "f6e5d4c3b2a1098...",
  "intentos": 1
}
```

## 🧪 Testing y Validación

### Criterios de Aceptación M0
- ✅ Evita colisiones al importar iCal
- ✅ CRUD consistente de reservas
- ✅ Calendario coherente con fechas

### Criterios de Aceptación M1
- ✅ Tasa de aceptación SES ≥98% en tests
- ✅ Evidencias exportables (CSV/PDF)
- ✅ Reintentos en fallos transitorios
- ✅ Bitácora con hash SHA-256
- ✅ Logs sin DNI/dirección, solo IDs/huellas

### Ejecutar Tests
```bash
# Tests unitarios
pnpm test

# Tests de integración
pnpm test:e2e

# Coverage
pnpm test:cov
```

## 📡 API y Endpoints

### SES (Cumplimiento Legal)
```http
POST /api/ses/partes/:reservaId
GET  /api/ses/evidence/export
GET  /api/ses/connection/test
```

### Reservas
```http
GET    /api/reservas
POST   /api/reservas
GET    /api/reservas/:ulid
PATCH  /api/reservas/:ulid
POST   /api/reservas/import/ical
```

### Documentación Completa
Disponible en: http://localhost:3001/api/docs

## 🔧 Comandos Útiles

### Base de Datos
```bash
pnpm db:migrate        # Ejecutar migraciones
pnpm db:seed          # Sembrar datos de prueba
pnpm db:studio        # Abrir Prisma Studio
pnpm db:generate      # Generar cliente Prisma
```

### Desarrollo
```bash
pnpm dev              # Modo desarrollo (hot reload)
pnpm build            # Construir para producción
pnpm start:prod       # Ejecutar en producción
pnpm lint             # Linter
pnpm format           # Formatear código
```

### Docker
```bash
pnpm docker:up        # Iniciar servicios
pnpm docker:down      # Detener servicios
```

## 🚨 Resolución de Problemas

### Error de Conexión a Base de Datos
```bash
# Verificar que PostgreSQL esté ejecutándose
docker-compose ps

# Reiniciar servicios
docker-compose restart postgres
```

### Error en Migraciones
```bash
# Reset de base de datos (CUIDADO: borra datos)
pnpm db:reset

# Aplicar migraciones manualmente
pnpm db:migrate:prod
```

### Problemas con Redis/Colas
```bash
# Verificar Redis
docker-compose logs redis

# Limpiar colas
redis-cli FLUSHALL
```

## 🛣️ Hoja de Ruta

### Semanas 1-2 ✅
- M0: Núcleo + calendario + cobros básicos + tareas + panel inicial

### Semanas 3-5 ✅
- M1: SES con estados, bitácora y reintentos + panel legal

### Próximas Entregas
- **Semanas 6-7**: M12 (informes) + M4 (calculadora fiscal v1)
- **Semanas 8-9**: M6 (socio de canales) — disponibilidad, precios y reservas
- **Semana 10**: M5 (precio dinámico) + M2 (salas de mensajería)
- **Semanas 11-12**: M10 (anti-fiestas) + M8 (propietarios) + testing

## 🤝 Contribución

### Convenciones de Código
- **TypeScript estricto** con tipos explícitos
- **Logs sin PII**: usar `hashingService.redactPII()`
- **ULIDs** para IDs públicos
- **Idempotencia** por `external_id` en operaciones críticas
- **Documentación OpenAPI** completa

### Workflow de Desarrollo
1. Crear feature branch desde `main`
2. Implementar con tests
3. Verificar que pasan los criterios de aceptación
4. Pull request con revisión de código
5. Merge tras aprobación

## 📞 Soporte y Contacto

- **Documentación**: http://localhost:3001/api/docs
- **Issues**: GitHub Issues
- **Email**: soporte@contextomaestrro.com

---

**Contexto Maestro v1.0** - Desarrollado con ❤️ para el sector turístico español