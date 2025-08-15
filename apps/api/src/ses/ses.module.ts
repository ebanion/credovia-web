import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SesController } from './ses.controller';
import { SesService } from './ses.service';
import { SesConnector } from './connectors/ses.connector';
import { SesProcessor } from './processors/ses.processor';
import { PrismaModule } from '../prisma/prisma.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    PrismaModule,
    CommonModule,
    BullModule.registerQueue({
      name: 'ses-queue',
    }),
  ],
  controllers: [SesController],
  providers: [SesService, SesConnector, SesProcessor],
  exports: [SesService],
})
export class SesModule {}