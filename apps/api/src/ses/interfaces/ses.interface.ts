export interface SesParteData {
  numeroReferencia?: string;
  fechaEntrada: Date;
  fechaSalida: Date;
  vivienda: {
    nombre: string;
    direccion: string;
    ciudad: string;
    provincia: string;
    licenciaTuristica?: string;
  };
  huespedes: Array<{
    nombre: string;
    apellidos: string;
    tipoDocumento: string;
    numeroDocumento: string;
    fechaNacimiento?: Date;
    nacionalidad?: string;
    esTitular: boolean;
  }>;
}

export interface SesResponse {
  success: boolean;
  numeroReferencia?: string;
  codigo: string;
  mensaje: string;
  timestamp: Date;
}

export interface SesStatusResponse {
  numeroReferencia: string;
  estado: 'ACEPTADO' | 'RECHAZADO' | 'PENDIENTE';
  codigo: string;
  mensaje: string;
  fechaProceso?: Date;
}

export interface SesConnectorInterface {
  /**
   * Send parte policial to SES
   */
  sendParte(data: SesParteData): Promise<SesResponse>;

  /**
   * Check status of sent parte
   */
  checkStatus(numeroReferencia: string): Promise<SesStatusResponse>;

  /**
   * Test connection to SES
   */
  testConnection(): Promise<boolean>;
}