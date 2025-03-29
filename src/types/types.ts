import { useCallback } from "react";

// types.ts
export type AlertSeverity = "alta" | "media" | "baja";
export type AlertType = "salud" | "transporte" | "seguridad" | "ambiental" | "social" | "transito";

export interface AlertData {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  severity?: AlertSeverity;
  type?: AlertType;// Usamos Date aquí para consistencia en el modelo
}

interface RawAlertData {
  _id?: string;
  suceso: string;
  ubicacion: {
    latitud: number;
    longitud: number;
  };
  fecha: string;
  clasificacion: string;
  severidad: string;
}

export function toAlertSeverity(severity?: string | null): AlertSeverity {
  const validSeverities: AlertSeverity[] = ["alta", "media", "baja"];
  const normalizedSeverity = severity?.toLowerCase() as AlertSeverity;
  return severity && validSeverities.includes(normalizedSeverity) 
    ? normalizedSeverity 
    : "media"; // Valor por defecto
}

export function toAlertType(type?: string | null): AlertType {
  const validTypes: AlertType[] = ["salud", "transporte", "seguridad", "ambiental", "social", "transito"];
  const normalizedType = type?.toLowerCase() as AlertType;
  return type && validTypes.includes(normalizedType)
    ? normalizedType
    : "seguridad"; // Valor por defecto
}

export function toAlertData(rawData: RawAlertData): AlertData {
  // Función auxiliar para normalizar la severidad
  const normalizeSeverity = (severidad: string): AlertSeverity => {
    const lowerSeverity = severidad.toLowerCase();
    if (['alta', 'media', 'baja'].includes(lowerSeverity)) {
      return lowerSeverity as AlertSeverity;
    }
    return 'media'; // Valor por defecto
  };

  // Función auxiliar para determinar el tipo
  const classifyType = (clasificacion: string): AlertType => {
    const lowerCase = clasificacion.toLowerCase();
    
    if (lowerCase.includes('transito') || lowerCase.includes('accidente') || lowerCase.includes('vehicular')) {
      return 'transporte';
    }
    if (lowerCase.includes('salud') || lowerCase.includes('médic') || lowerCase.includes('hospital')) {
      return 'salud';
    }
    if (lowerCase.includes('seguridad') || lowerCase.includes('polic') || lowerCase.includes('rob')) {
      return 'seguridad';
    }
    if (lowerCase.includes('ambiental') || lowerCase.includes('forestal')) {
      return 'ambiental';
    }
    if (lowerCase.includes('social') || lowerCase.includes('disturbio')) {
      return 'social';
    }
    return toAlertType(clasificacion); // Usar la función de conversión estándar como fallback
  };

  // Convertir fecha a objeto Date si es strings

  return {
    id: rawData._id || '', // Proporcionar valor por defecto para _id opcional
    title: rawData.suceso,
    description: rawData.suceso, // Usamos el suceso como descripción
    latitude: rawData.ubicacion.latitud,
    longitude: rawData.ubicacion.longitud,
    severity: normalizeSeverity(rawData.severidad),
    type: classifyType(rawData.clasificacion)
  };
}