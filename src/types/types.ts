// types.ts
export type AlertSeverity = "alta" | "media" | "baja";
export type AlertType = "salud" | "transporte" | "seguridad";


export interface AlertData {
  id: string;  // Cambiado a string para MongoDB
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  severity: AlertSeverity;
  type: AlertType;
  date: Date;
}

export interface RawAlertData {
  _id?: string;
  title: string;
  descripcion: string;
  ubicacion: {
    latitud: number;
    longitud: number;
  };
  fecha: string | Date;
  severidad: string;
  clasificacion: string;
}

export function toAlertSeverity(severity: string): AlertSeverity {
  const validSeverities: AlertSeverity[] = ["alta", "media", "baja"];
  const normalizedSeverity = severity.toLowerCase() as AlertSeverity;
  return validSeverities.includes(normalizedSeverity) 
    ? normalizedSeverity 
    : "media"; // Valor por defecto
}

export function toAlertType(type: string): AlertType {
  const validTypes: AlertType[] = ["salud", "transporte", "seguridad"];
  const normalizedType = type.toLowerCase() as AlertType;
  return validTypes.includes(normalizedType)
    ? normalizedType
    : "seguridad"; // Valor por defecto
}

export function toAlertData(rawData: RawAlertData): AlertData {
  return {
    id: rawData._id || '',
    title: rawData.title,
    description: rawData.descripcion,
    latitude: rawData.ubicacion.latitud,
    longitude: rawData.ubicacion.longitud,
    severity: toAlertSeverity(rawData.severidad),
    type: toAlertType(rawData.clasificacion),
    date: rawData.fecha instanceof Date ? rawData.fecha : new Date(rawData.fecha)
  };
}