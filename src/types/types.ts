
export type AlertSeverity = "alta" | "media" | "baja";
export type AlertType = "salud" | "transporte" | "seguridad" | "ambiental" | "social" | "transito";

// Interfaz para los datos que vienen de la API
export interface AlertaFromAPI {
  _id: string;
  descripcion: string;
  suceso?: string; // Hacer opcional según tu caso real
  ubicacion: {
    latitud: number;
    longitud: number;
  };
  fecha: string;
  clasificacion: string;
  severidad: string;
}
export interface RawAlert {
  _id: string;
  descripcion: string;
  suceso: string; // Ahora requerido basado en tus datos de ejemplo
  ubicacion: {
    latitud: number;
    longitud: number;
  };
  fecha: string;
  clasificacion: string;
  severidad: string;
}

// Interfaz para datos normalizados usados en el frontend
export interface AlertData {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  severity: AlertSeverity;
  type: AlertType;
  updatedAt: string;
}

// Función mejorada para convertir severidad
export function toAlertSeverity(severity?: string | null): AlertSeverity {
  if (!severity) return 'media';
  
  const lowerSeverity = severity.toLowerCase();
  switch (lowerSeverity) {
    case 'alta':
    case 'media':
    case 'baja':
      return lowerSeverity;
    default:
      return 'media';
  }
}

// Función mejorada para convertir tipo
export function toAlertType(type?: string | null): AlertType {
  if (!type) return 'seguridad';
  
  const lowerType = type.toLowerCase();
  switch (lowerType) {
    case 'salud':
    case 'transporte':
    case 'seguridad':
    case 'ambiental':
    case 'social':
    case 'transito':
      return lowerType;
    default:
      return 'seguridad';
  }
}

// Función robusta para transformar datos crudos a normalizados
export function toAlertData(rawData: AlertaFromAPI): AlertData {
  // Asegurar valores por defecto para campos opcionales
  const title = rawData.suceso || rawData.descripcion || 'Sin título';
  
  return {
    id: rawData._id,
    title: title,
    description: rawData.descripcion || title, // Usar title como fallback
    latitude: rawData.ubicacion.latitud,
    longitude: rawData.ubicacion.longitud,
    severity: toAlertSeverity(rawData.severidad),
    type: toAlertType(rawData.clasificacion),
    updatedAt: rawData.fecha
  };
}

// Función auxiliar mejorada para clasificación de tipos
function classifyAlertType(clasificacion?: string): AlertType {
  if (!clasificacion) return 'seguridad';

  const lowerCase = clasificacion.toLowerCase();

  // Mapeo de palabras clave a tipos
  const typeMap: Record<string, AlertType> = {
    transito: 'transporte',
    accidente: 'transporte',
    vehicular: 'transporte',
    salud: 'salud',
    medic: 'salud',
    hospital: 'salud',
    seguridad: 'seguridad',
    polic: 'seguridad',
    rob: 'seguridad',
    ambiental: 'ambiental',
    forestal: 'ambiental',
    social: 'social',
    disturbio: 'social'
  };

  // Buscar coincidencia en palabras clave
  for (const [keyword, type] of Object.entries(typeMap)) {
    if (lowerCase.includes(keyword)) {
      return type;
    }
  }

  return toAlertType(clasificacion); // Fallback a conversión básica
}