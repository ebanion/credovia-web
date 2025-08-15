import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class HashingService {
  /**
   * Generate SHA-256 hash of data for legal audit trail
   * Used for hashing SES requests/responses without storing PII
   */
  sha256(data: any): string {
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
    return createHash('sha256').update(jsonString, 'utf8').digest('hex');
  }

  /**
   * Generate hash for password storage
   */
  async hashPassword(password: string): Promise<string> {
    const bcrypt = await import('bcryptjs');
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Verify password against hash
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    const bcrypt = await import('bcryptjs');
    return bcrypt.compare(password, hash);
  }

  /**
   * Redact PII from object for logging
   * Returns object with sensitive fields replaced with [REDACTED]
   */
  redactPII(obj: any): any {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    const sensitiveFields = [
      'dni', 'nif', 'nie', 'pasaporte', 'numeroDocumento',
      'nombre', 'apellidos', 'email', 'telefono', 'direccion',
      'fechaNacimiento', 'password', 'token'
    ];

    const redacted = { ...obj };
    
    for (const field of sensitiveFields) {
      if (field in redacted) {
        redacted[field] = '[REDACTED]';
      }
    }

    // Recursively redact nested objects
    for (const key in redacted) {
      if (typeof redacted[key] === 'object' && redacted[key] !== null) {
        redacted[key] = this.redactPII(redacted[key]);
      }
    }

    return redacted;
  }
}