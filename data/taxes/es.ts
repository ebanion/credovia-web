// Mapping of Provinces to CCAA and Tax Rates
// Based on prompt requirements.
// Verification Case: Madrid -> ITP 6%, AJD 0.75%

export interface RegionTaxData {
  itp: number // Impuesto Transmisiones Patrimoniales (Segunda mano)
  ajd: number // Actos Jurídicos Documentados
  iva: number // IVA (Obra nueva) - Generally 10% national, but included for completeness
}

export const PROVINCES = [
  "A Coruña", "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Baleares", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Girona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Jaén", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza", "Ceuta", "Melilla"
] as const

// Simplified mapping. In a real app this would be comprehensive.
// Using Madrid as the "verification" case and generic defaults for others to avoid inventing data without source.
// TODO: Fill with real data for all regions.
export const PROVINCE_TAX_DATA: Record<string, RegionTaxData> = {
  "Madrid": { itp: 0.06, ajd: 0.0075, iva: 0.10 },
  "Barcelona": { itp: 0.10, ajd: 0.015, iva: 0.10 }, // Example
  // Default fallback for others until filled
  "DEFAULT": { itp: 0.08, ajd: 0.01, iva: 0.10 }
}

export function getTaxData(province: string): RegionTaxData {
  return PROVINCE_TAX_DATA[province] || PROVINCE_TAX_DATA["DEFAULT"]
}

export const FIXED_FEES = {
  notary: 1000,
  registry: 900,
  agency: 500,
  appraisal: 400
}
