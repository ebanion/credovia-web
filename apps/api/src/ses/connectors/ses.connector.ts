import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SesConnectorInterface,
  SesParteData,
  SesResponse,
  SesStatusResponse,
} from '../interfaces/ses.interface';

/**
 * SES Connector Stub
 * 
 * This is a stub implementation that simulates the SES.Hospedajes API
 * for development and testing purposes.
 * 
 * In production, this would be replaced with the actual SES API client.
 * The interface remains the same for easy swapping.
 */
@Injectable()
export class SesConnector implements SesConnectorInterface {
  private readonly logger = new Logger(SesConnector.name);
  private readonly isProduction: boolean;
  private readonly simulateFailures: boolean;

  constructor(private readonly configService: ConfigService) {
    this.isProduction = configService.get('NODE_ENV') === 'production';
    this.simulateFailures = configService.get('SES_SIMULATE_FAILURES', 'true') === 'true';
  }

  async sendParte(data: SesParteData): Promise<SesResponse> {
    this.logger.debug('Sending parte to SES', { 
      vivienda: data.vivienda.nombre,
      huespedes: data.huespedes.length,
    });

    // Simulate network delay
    await this.delay(500 + Math.random() * 1000);

    // In production, this would make the actual API call
    if (this.isProduction) {
      return this.callRealSesApi(data);
    }

    // Stub behavior for development/testing
    return this.simulateSesResponse(data);
  }

  async checkStatus(numeroReferencia: string): Promise<SesStatusResponse> {
    this.logger.debug('Checking SES status', { numeroReferencia });

    // Simulate network delay
    await this.delay(200 + Math.random() * 300);

    if (this.isProduction) {
      return this.callRealSesStatusApi(numeroReferencia);
    }

    // Stub behavior - simulate status progression
    return this.simulateStatusResponse(numeroReferencia);
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.delay(100);
      
      if (this.isProduction) {
        // Test real SES connection
        return this.testRealSesConnection();
      }

      // Always return true for stub
      this.logger.debug('SES connection test (stub): OK');
      return true;
    } catch (error) {
      this.logger.error('SES connection test failed', error);
      return false;
    }
  }

  private async simulateSesResponse(data: SesParteData): Promise<SesResponse> {
    // Simulate 2% failure rate if enabled
    if (this.simulateFailures && Math.random() < 0.02) {
      return {
        success: false,
        codigo: 'ERR_VALIDATION',
        mensaje: 'Error de validación: Documento de identidad inválido',
        timestamp: new Date(),
      };
    }

    // Generate realistic reference number
    const numeroReferencia = `SES${Date.now()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    return {
      success: true,
      numeroReferencia,
      codigo: 'OK',
      mensaje: 'Parte enviado correctamente',
      timestamp: new Date(),
    };
  }

  private async simulateStatusResponse(numeroReferencia: string): Promise<SesStatusResponse> {
    // Simulate different states based on reference number age
    const timestamp = parseInt(numeroReferencia.replace('SES', '').slice(0, 13));
    const ageMinutes = (Date.now() - timestamp) / (1000 * 60);

    let estado: 'ACEPTADO' | 'RECHAZADO' | 'PENDIENTE';
    let mensaje: string;

    if (ageMinutes < 2) {
      estado = 'PENDIENTE';
      mensaje = 'Parte en proceso de validación';
    } else if (this.simulateFailures && Math.random() < 0.05) {
      estado = 'RECHAZADO';
      mensaje = 'Parte rechazado: Datos incompletos';
    } else {
      estado = 'ACEPTADO';
      mensaje = 'Parte aceptado correctamente';
    }

    return {
      numeroReferencia,
      estado,
      codigo: estado === 'ACEPTADO' ? 'OK' : estado === 'RECHAZADO' ? 'ERR_REJECTED' : 'PENDING',
      mensaje,
      fechaProceso: estado !== 'PENDIENTE' ? new Date() : undefined,
    };
  }

  private async callRealSesApi(data: SesParteData): Promise<SesResponse> {
    // TODO: Implement real SES API call
    // This would use the actual SES.Hospedajes API endpoints
    const sesApiUrl = this.configService.get('SES_API_URL');
    const sesApiKey = this.configService.get('SES_API_KEY');

    this.logger.log('Calling real SES API', { url: sesApiUrl });

    // Example implementation:
    // const response = await axios.post(`${sesApiUrl}/partes`, {
    //   ...data,
    //   apiKey: sesApiKey,
    // });
    // return response.data;

    throw new Error('Real SES API implementation not yet available');
  }

  private async callRealSesStatusApi(numeroReferencia: string): Promise<SesStatusResponse> {
    // TODO: Implement real SES status API call
    const sesApiUrl = this.configService.get('SES_API_URL');
    const sesApiKey = this.configService.get('SES_API_KEY');

    this.logger.log('Calling real SES status API', { numeroReferencia });

    throw new Error('Real SES status API implementation not yet available');
  }

  private async testRealSesConnection(): Promise<boolean> {
    // TODO: Implement real SES connection test
    const sesApiUrl = this.configService.get('SES_API_URL');
    
    this.logger.log('Testing real SES connection', { url: sesApiUrl });

    throw new Error('Real SES connection test not yet implemented');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}