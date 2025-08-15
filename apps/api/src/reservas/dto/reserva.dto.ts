import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { 
  IsString, 
  IsOptional, 
  IsDateString, 
  IsNumber, 
  IsArray, 
  ValidateNested, 
  IsEnum,
  Min,
  Max,
  IsEmail,
  IsPhoneNumber,
  IsBoolean
} from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoReserva, EstadoOperacion } from '@prisma/client';

export class CreateHuespedDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Pérez García' })
  @IsString()
  apellidos: string;

  @ApiProperty({ example: 'DNI', enum: ['DNI', 'NIE', 'PASAPORTE'] })
  @IsString()
  tipoDocumento: string;

  @ApiProperty({ example: '12345678A' })
  @IsString()
  numeroDocumento: string;

  @ApiPropertyOptional({ example: '1990-01-15' })
  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @ApiPropertyOptional({ example: 'España' })
  @IsOptional()
  @IsString()
  nacionalidad?: string;

  @ApiPropertyOptional({ example: 'juan@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+34666777888' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  esTitular?: boolean;
}

export class CreateReservaDto {
  @ApiPropertyOptional({ 
    example: 'booking_123456',
    description: 'ID externo para idempotencia' 
  })
  @IsOptional()
  @IsString()
  externalId?: string;

  @ApiProperty({ example: 'clv123abc456' })
  @IsString()
  viviendaId: string;

  @ApiPropertyOptional({ example: 'clu456def789' })
  @IsOptional()
  @IsString()
  unidadId?: string;

  @ApiProperty({ example: '2024-06-15' })
  @IsDateString()
  fechaEntrada: string;

  @ApiProperty({ example: '2024-06-20' })
  @IsDateString()
  fechaSalida: string;

  @ApiProperty({ example: 4, minimum: 1, maximum: 20 })
  @IsNumber()
  @Min(1)
  @Max(20)
  numeroHuespedes: number;

  @ApiProperty({ example: 450.00 })
  @IsNumber()
  @Min(0)
  precioTotal: number;

  @ApiPropertyOptional({ example: 'EUR' })
  @IsOptional()
  @IsString()
  moneda?: string;

  @ApiPropertyOptional({ 
    example: 'AIRBNB',
    enum: ['DIRECTO', 'AIRBNB', 'BOOKING', 'VRBO', 'ICAL_IMPORT']
  })
  @IsOptional()
  @IsString()
  canal?: string;

  @ApiPropertyOptional({ description: 'Notas adicionales sobre la reserva' })
  @IsOptional()
  @IsString()
  notas?: string;

  @ApiPropertyOptional({ 
    type: [CreateHuespedDto],
    description: 'Lista de huéspedes'
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHuespedDto)
  huespedes?: CreateHuespedDto[];
}

export class UpdateReservaDto extends PartialType(CreateReservaDto) {
  @ApiPropertyOptional({ enum: EstadoReserva })
  @IsOptional()
  @IsEnum(EstadoReserva)
  estado?: EstadoReserva;

  @ApiPropertyOptional({ enum: EstadoOperacion })
  @IsOptional()
  @IsEnum(EstadoOperacion)
  estadoOperacion?: EstadoOperacion;
}

export class ImportIcalDto {
  @ApiProperty({ 
    example: 'https://calendar.airbnb.com/calendar/ical/12345.ics',
    description: 'URL del calendario iCal'
  })
  @IsString()
  icalUrl: string;

  @ApiProperty({ example: 'clv123abc456' })
  @IsString()
  viviendaId: string;

  @ApiPropertyOptional({ 
    example: 'AIRBNB',
    description: 'Canal de origen para las reservas importadas'
  })
  @IsOptional()
  @IsString()
  canal?: string;
}