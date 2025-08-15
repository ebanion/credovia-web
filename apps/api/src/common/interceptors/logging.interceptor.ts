import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HashingService } from '../services/hashing.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(private readonly hashingService: HashingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    // Redact PII from request body and query params for logging
    const redactedBody = this.hashingService.redactPII(request.body);
    const redactedQuery = this.hashingService.redactPII(request.query);

    this.logger.log(
      `${method} ${url} - Request: ${JSON.stringify({
        body: redactedBody,
        query: redactedQuery,
        headers: {
          'content-type': request.headers['content-type'],
          'user-agent': request.headers['user-agent'],
        },
      })}`,
    );

    return next.handle().pipe(
      tap((data) => {
        const responseTime = Date.now() - now;
        
        // Redact PII from response data for logging
        const redactedResponse = this.hashingService.redactPII(data);
        
        this.logger.log(
          `${method} ${url} - Response: ${responseTime}ms - ${JSON.stringify({
            statusCode: context.switchToHttp().getResponse().statusCode,
            data: redactedResponse,
          })}`,
        );
      }),
    );
  }
}