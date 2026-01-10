
export interface TaxData {
  itp: number; // For used homes (2nd hand)
  ajd: number; // For new homes (on top of IVA)
  iva: number; // For new homes
  name: string;
}

export const REGIONS: Record<string, TaxData> = {
  "Andalucía": { itp: 0.07, ajd: 0.012, iva: 0.10, name: "Andalucía" },
  "Aragón": { itp: 0.08, ajd: 0.015, iva: 0.10, name: "Aragón" },
  "Asturias": { itp: 0.08, ajd: 0.012, iva: 0.10, name: "Asturias" },
  "Baleares": { itp: 0.08, ajd: 0.012, iva: 0.10, name: "Baleares" },
  "Canarias": { itp: 0.065, ajd: 0.0075, iva: 0.07, name: "Canarias" }, // IGIC 7%
  "Cantabria": { itp: 0.09, ajd: 0.015, iva: 0.10, name: "Cantabria" },
  "Castilla y León": { itp: 0.08, ajd: 0.015, iva: 0.10, name: "Castilla y León" },
  "Castilla-La Mancha": { itp: 0.09, ajd: 0.015, iva: 0.10, name: "Castilla-La Mancha" },
  "Cataluña": { itp: 0.10, ajd: 0.015, iva: 0.10, name: "Cataluña" },
  "Ceuta": { itp: 0.06, ajd: 0.005, iva: 0.10, name: "Ceuta" }, // IPSI instead of IVA/ITP usually, but sticking to prompt map for simplicity or standard
  "Comunidad Valenciana": { itp: 0.10, ajd: 0.015, iva: 0.10, name: "Comunidad Valenciana" },
  "Extremadura": { itp: 0.08, ajd: 0.015, iva: 0.10, name: "Extremadura" },
  "Galicia": { itp: 0.08, ajd: 0.015, iva: 0.10, name: "Galicia" },
  "La Rioja": { itp: 0.07, ajd: 0.01, iva: 0.10, name: "La Rioja" },
  "Madrid": { itp: 0.06, ajd: 0.0075, iva: 0.10, name: "Madrid" },
  "Melilla": { itp: 0.06, ajd: 0.005, iva: 0.10, name: "Melilla" },
  "Murcia": { itp: 0.08, ajd: 0.015, iva: 0.10, name: "Murcia" },
  "Navarra": { itp: 0.06, ajd: 0.005, iva: 0.10, name: "Navarra" },
  "País Vasco": { itp: 0.07, ajd: 0.00, iva: 0.10, name: "País Vasco" }, // AJD 0 according to prompt table
};

export const PROVINCE_TO_REGION: Record<string, string> = {
  "A Coruña": "Galicia", "Lugo": "Galicia", "Ourense": "Galicia", "Pontevedra": "Galicia",
  "Asturias": "Asturias",
  "Cantabria": "Cantabria",
  "Álava": "País Vasco", "Guipúzcoa": "País Vasco", "Vizcaya": "País Vasco",
  "Navarra": "Navarra",
  "La Rioja": "La Rioja",
  "Huesca": "Aragón", "Teruel": "Aragón", "Zaragoza": "Aragón",
  "Barcelona": "Cataluña", "Girona": "Cataluña", "Lleida": "Cataluña", "Tarragona": "Cataluña",
  "Baleares": "Baleares",
  "Castellón": "Comunidad Valenciana", "Valencia": "Comunidad Valenciana", "Alicante": "Comunidad Valenciana",
  "Murcia": "Murcia",
  "Madrid": "Madrid",
  "León": "Castilla y León", "Palencia": "Castilla y León", "Burgos": "Castilla y León", "Zamora": "Castilla y León", "Valladolid": "Castilla y León", "Soria": "Castilla y León", "Segovia": "Castilla y León", "Ávila": "Castilla y León", "Salamanca": "Castilla y León",
  "Guadalajara": "Castilla-La Mancha", "Toledo": "Castilla-La Mancha", "Cuenca": "Castilla-La Mancha", "Ciudad Real": "Castilla-La Mancha", "Albacete": "Castilla-La Mancha",
  "Cáceres": "Extremadura", "Badajoz": "Extremadura",
  "Huelva": "Andalucía", "Sevilla": "Andalucía", "Córdoba": "Andalucía", "Jaén": "Andalucía", "Almería": "Andalucía", "Granada": "Andalucía", "Málaga": "Andalucía", "Cádiz": "Andalucía",
  "Las Palmas": "Canarias", "Santa Cruz de Tenerife": "Canarias",
  "Ceuta": "Ceuta",
  "Melilla": "Melilla"
};

export const FIXED_FEES = {
  notary: 800,
  registry: 500,
  agency: 400,
  appraisal: 300
};

export function getTaxData(province: string): TaxData {
  const regionName = PROVINCE_TO_REGION[province] || "Madrid"; // Default to Madrid if unknown
  return REGIONS[regionName];
}

export const PROVINCES_LIST = Object.keys(PROVINCE_TO_REGION).sort();
export const PROVINCES = PROVINCES_LIST; // Alias for backward compatibility
