import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';

@Injectable()
export class UlidService {
  /**
   * Generate a new ULID
   */
  generate(): string {
    return ulid();
  }

  /**
   * Validate if a string is a valid ULID
   */
  isValid(id: string): boolean {
    try {
      return /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/.test(id);
    } catch {
      return false;
    }
  }
}