import { Injectable, Logger } from '@nestjs/common';
import { CreateReservaDto } from '../dto/reserva.dto';
import axios from 'axios';
import { UlidService } from '../../common/services/ulid.service';

@Injectable()
export class IcalImportService {
  private readonly logger = new Logger(IcalImportService.name);

  constructor(private readonly ulidService: UlidService) {}

  /**
   * Import reservations from iCal URL
   * Critical for M0 - prevents double bookings from external calendars
   */
  async importFromUrl(icalUrl: string, viviendaId: string, canal: string): Promise<CreateReservaDto[]> {
    this.logger.log('Importing from iCal URL', { icalUrl, viviendaId, canal });

    try {
      // Fetch iCal data
      const response = await axios.get(icalUrl, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Contexto-Maestro/1.0',
        },
      });

      const icalData = response.data;

      // Parse iCal data (simplified parser - in production use a proper iCal library)
      const events = this.parseIcalData(icalData);

      // Convert events to reservations
      const reservas: CreateReservaDto[] = events.map(event => ({
        externalId: `ical_${canal.toLowerCase()}_${event.uid}`,
        viviendaId,
        fechaEntrada: event.dtstart,
        fechaSalida: event.dtend,
        numeroHuespedes: 1, // Default, as iCal doesn't usually include guest count
        precioTotal: 0, // Default, as iCal doesn't include pricing
        canal,
        notas: event.summary ? `Importado de iCal: ${event.summary}` : 'Importado de iCal',
      }));

      this.logger.log('iCal parsing completed', { 
        eventsFound: events.length,
        reservasCreated: reservas.length 
      });

      return reservas;

    } catch (error) {
      this.logger.error('Error importing from iCal', { error: error.message, icalUrl });
      throw new Error(`Error importing iCal: ${error.message}`);
    }
  }

  /**
   * Simple iCal parser
   * In production, use a proper library like node-ical or ical.js
   */
  private parseIcalData(icalData: string): any[] {
    const events = [];
    const lines = icalData.split('\n').map(line => line.trim());
    
    let currentEvent: any = null;
    let inEvent = false;

    for (const line of lines) {
      if (line === 'BEGIN:VEVENT') {
        inEvent = true;
        currentEvent = {};
        continue;
      }

      if (line === 'END:VEVENT') {
        if (currentEvent && currentEvent.dtstart && currentEvent.dtend) {
          // Only add events with valid dates
          events.push(currentEvent);
        }
        inEvent = false;
        currentEvent = null;
        continue;
      }

      if (!inEvent || !currentEvent) {
        continue;
      }

      // Parse event properties
      if (line.startsWith('UID:')) {
        currentEvent.uid = line.substring(4);
      } else if (line.startsWith('DTSTART')) {
        const dateStr = this.extractDateValue(line);
        if (dateStr) {
          currentEvent.dtstart = this.parseIcalDate(dateStr);
        }
      } else if (line.startsWith('DTEND')) {
        const dateStr = this.extractDateValue(line);
        if (dateStr) {
          currentEvent.dtend = this.parseIcalDate(dateStr);
        }
      } else if (line.startsWith('SUMMARY:')) {
        currentEvent.summary = line.substring(8);
      } else if (line.startsWith('DESCRIPTION:')) {
        currentEvent.description = line.substring(12);
      }
    }

    // Filter out invalid events
    const validEvents = events.filter(event => {
      const isValid = event.dtstart && 
                     event.dtend && 
                     event.dtstart instanceof Date && 
                     event.dtend instanceof Date &&
                     event.dtstart < event.dtend;
      
      if (!isValid) {
        this.logger.warn('Skipping invalid iCal event', { event });
      }
      
      return isValid;
    });

    this.logger.debug('Parsed iCal events', { 
      totalLines: lines.length,
      totalEvents: events.length,
      validEvents: validEvents.length 
    });

    return validEvents;
  }

  /**
   * Extract date value from iCal line (handles different formats)
   */
  private extractDateValue(line: string): string | null {
    // Handle different date formats:
    // DTSTART:20240615T100000Z
    // DTSTART;VALUE=DATE:20240615
    // DTSTART;TZID=Europe/Madrid:20240615T100000
    
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return null;
    
    return line.substring(colonIndex + 1);
  }

  /**
   * Parse iCal date string to JavaScript Date
   */
  private parseIcalDate(dateStr: string): Date | null {
    try {
      // Remove any trailing characters and clean the string
      const cleanDateStr = dateStr.replace(/[^0-9TZ]/g, '');
      
      // Handle different formats:
      // 20240615T100000Z (UTC)
      // 20240615T100000 (local)
      // 20240615 (date only)
      
      if (cleanDateStr.length === 8) {
        // Date only: 20240615
        const year = parseInt(cleanDateStr.substring(0, 4));
        const month = parseInt(cleanDateStr.substring(4, 6)) - 1; // Month is 0-based
        const day = parseInt(cleanDateStr.substring(6, 8));
        return new Date(year, month, day);
      } else if (cleanDateStr.length >= 15) {
        // Date and time: 20240615T100000 or 20240615T100000Z
        const year = parseInt(cleanDateStr.substring(0, 4));
        const month = parseInt(cleanDateStr.substring(4, 6)) - 1;
        const day = parseInt(cleanDateStr.substring(6, 8));
        const hour = parseInt(cleanDateStr.substring(9, 11));
        const minute = parseInt(cleanDateStr.substring(11, 13));
        const second = parseInt(cleanDateStr.substring(13, 15));
        
        if (cleanDateStr.endsWith('Z')) {
          // UTC time
          return new Date(Date.UTC(year, month, day, hour, minute, second));
        } else {
          // Local time
          return new Date(year, month, day, hour, minute, second);
        }
      }
      
      return null;
    } catch (error) {
      this.logger.warn('Error parsing iCal date', { dateStr, error: error.message });
      return null;
    }
  }

  /**
   * Validate iCal URL format
   */
  validateIcalUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol) && 
             (url.endsWith('.ics') || url.includes('ical') || url.includes('calendar'));
    } catch {
      return false;
    }
  }
}