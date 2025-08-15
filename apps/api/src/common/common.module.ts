import { Module } from '@nestjs/common';
import { UlidService } from './services/ulid.service';
import { HashingService } from './services/hashing.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  providers: [UlidService, HashingService, LoggingInterceptor],
  exports: [UlidService, HashingService, LoggingInterceptor],
})
export class CommonModule {}