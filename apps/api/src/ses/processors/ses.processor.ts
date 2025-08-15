import { Processor, Process, OnQueueActive, OnQueueCompleted, OnQueueFailed } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { SesService } from '../ses.service';

@Processor('ses-queue')
export class SesProcessor {
  private readonly logger = new Logger(SesProcessor.name);

  constructor(private readonly sesService: SesService) {}

  @Process('send-parte')
  async handleSendParte(job: Job<{ parteId: string }>) {
    this.logger.log('Processing send-parte job', { parteId: job.data.parteId });
    await this.sesService.sendParte(job.data.parteId);
  }

  @Process('check-status')
  async handleCheckStatus(job: Job<{ parteId: string; numeroReferencia: string }>) {
    this.logger.log('Processing check-status job', { 
      parteId: job.data.parteId,
      numeroReferencia: job.data.numeroReferencia,
    });
    await this.sesService.checkParteStatus(job.data.parteId, job.data.numeroReferencia);
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    this.logger.log(`Job ${job.id} of type ${job.name} completed`);
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} of type ${job.name} failed`, error);
  }
}