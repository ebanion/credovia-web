import { Module } from '@nestjs/common';
import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';
import { CalendarioService } from './services/calendario.service';
import { IcalImportService } from './services/ical-import.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CommonModule } from '../common/common.module';
import { SesModule } from '../ses/ses.module';

@Module({
  imports: [PrismaModule, CommonModule, SesModule],
  controllers: [ReservasController],
  providers: [ReservasService, CalendarioService, IcalImportService],
  exports: [ReservasService],
})
export class ReservasModule {}