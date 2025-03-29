"use client";

import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import { AlertSeverity, AlertType, AlertData as TypesAlertData, toAlertSeverity } from "@/types/types";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Router } from "next/router";

// Definimos AlertData extendiendo el tipo original y asegurando todos los campos requeridos
interface AlertData {
    id: string;
    suceso: string;
    description: string;
    latitude: number;
    longitude: number;
    severity?: AlertSeverity;
    type?: AlertType;
    updatedAt?: string;
  }

interface GoogleMapEmbedProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  width?: string;
  height?: string;
}

interface AlertProps {
  data?: AlertData;
  apiEndpoint?: string;
  defaultLocation?: {
    latitude: number;
    longitude: number;
  };
  expanded?: boolean;
  onClick?: () => void;
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  latitude,
  longitude,
  width = "100%",
  height = "150px",
}) => {
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8351288872545!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQyJzExLjciTiAxMDDCsDI2JzU1LjAiVw!5e0!3m2!1ses-419!2smx`;

  return (
    <iframe
      width={width}
      height={height}
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={embedUrl}
      title="Ubicación con marcador"
    />
  );
};

const getAlertImage = (type?: string) => {
  const images: Record<string, string> = {
    seguridad: '/images/security-alert.png',
    transporte: '/images/traffic-alert.png',
    salud: '/images/health-alert.png',
    ambiental: '/images/environment-alert.png',
    social: '/images/social-alert.png',
    transito: '/images/traffic-alert.png',
    emergencia: '/images/emergency-alert.png'
  };
  return images[type || 'seguridad'] || '/images/default-alert.png';
};

const getAlertDescription = (type?: string) => {
  const descriptions: Record<string, string> = {
    seguridad: 'Alerta relacionada con seguridad pública',
    transporte: 'Alerta sobre problemas de transporte',
    salud: 'Alerta relacionada con salud pública',
    ambiental: 'Alerta ambiental o ecológica',
    social: 'Alerta sobre disturbios sociales',
    transito: 'Alerta sobre accidentes de tránsito'
  };
  return descriptions[type || 'seguridad'] || 'Alerta general';
};

export default function Alert({
  data,
  apiEndpoint,
  defaultLocation = { latitude: 20.703239, longitude: -100.4486203 },
  expanded = false,
  onClick,
}: AlertProps) {
    const router = useRouter();
    console.log("Props recibidas en Alert:", {
        data,
        apiEndpoint,
        defaultLocation,
        expanded
      });  // Estado inicial completo con todos los campos requeridos
  const [alertData, setAlertData] = useState<AlertData>({
    id: 'loading',
    suceso: "Cargando...",
    description: "Obteniendo información de la alerta...",
    latitude: defaultLocation.latitude,
    longitude: defaultLocation.longitude,
    severity: 'media',
    type: 'seguridad'
  });

  const [isLoading, setIsLoading] = useState(!data);

  // Función de normalización robusta que maneja todos los campos
  const normalizeAlertData = useCallback((rawData: any): AlertData => {
    console.log("Datos crudos recibidos para normalización:", rawData);
    return {
      id: rawData.id || rawData._id || '',
      suceso: rawData.suceso || rawData.title || 'Sin título',
      description: rawData.description || rawData.suceso || 'Sin descripción',
      latitude: rawData.latitude || rawData.ubicacion?.latitud || defaultLocation.latitude,
      longitude: rawData.longitude || rawData.ubicacion?.longitud || defaultLocation.longitude,
      severity: toAlertSeverity(rawData.severity || rawData.severidad),
      type: rawData.type || 'seguridad',
      updatedAt: rawData.updatedAt || rawData.fecha || new Date().toISOString()
    };
  }, [defaultLocation.latitude, defaultLocation.longitude]);

  useEffect(() => {
    if (data) {
      const normalizedData = normalizeAlertData(data);
      setAlertData(normalizedData);
      setIsLoading(false);
      return;
    }

    if (apiEndpoint) {
      const fetchAlertData = async () => {
        try {
          const response = await fetch(apiEndpoint);
          if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
          const fetchedData = await response.json();
          const normalizedData = normalizeAlertData(fetchedData);
          setAlertData(normalizedData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error al obtener datos de alerta:", error);
          setAlertData({
            id: 'error',
            suceso: "Error",
            description: "No se pudieron cargar los datos de la alerta",
            latitude: defaultLocation.latitude,
            longitude: defaultLocation.longitude,
            severity: 'media',
            type: 'seguridad' // Usar un valor válido de AlertType
          });
          setIsLoading(false);
        }
      };

      fetchAlertData();
    } else {
      console.warn("No se proporcionaron datos ni API endpoint para Alert");
      setAlertData({
        id: 'error',
        suceso: "Error",
        description: "No se pudieron cargar los datos de la alerta",
        latitude: defaultLocation.latitude,
        longitude: defaultLocation.longitude,
        severity: 'media',
        type: 'seguridad' // Usar un valor válido de AlertType
        });
      setIsLoading(false);
    }
  }, [data, apiEndpoint, normalizeAlertData, defaultLocation.latitude, defaultLocation.longitude]);

  if (isLoading) {
    return (
      <div
        className="p-4 bg-vtwhite rounded-lg shadow-md flex items-center justify-center space-x-2 animate-pulse"
        style={{ fontFamily: "var(--font-text)" }}
      >
        <div className="w-3 h-3 bg-vtlightblue rounded-full animate-bounce"></div>
        <span className="text-vtdarkblue font-medium text-sm">Cargando...</span>
      </div>
    );
  }

  // Estilos para la severidad
  const severityStyles = {
    alta: "bg-red-100 border-red-500 text-red-800",
    media: "bg-yellow-100 border-yellow-500 text-yellow-800",
    baja: "bg-green-100 border-green-500 text-green-800",
    default: "bg-gray-100 border-gray-500 text-gray-800",
  };

  const getSeverityStyle = () => {
    if (!alertData.severity) return severityStyles.default;
    return severityStyles[alertData.severity] || severityStyles.default;
  };

  const handleAssistanceClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se propague el evento onClick del Card
    
    // Construye el objeto de query params
    const queryParams = new URLSearchParams({
      id: alertData.id,
      suceso: alertData.suceso,
      description: alertData.description,
      latitude: alertData.latitude.toString(),
      longitude: alertData.longitude.toString(),
      severity: alertData.severity || 'media',
      type: alertData.type || 'seguridad',
      updatedAt: alertData.updatedAt || ''
    }).toString();

    router.push(`/asistance?${queryParams}`);
  };

  return (
    <div 
      className={`w-full ${expanded ? "max-w-2xl" : "max-w-md"} cursor-pointer`}
      onClick={onClick}
    >
      <Card
        className={`border rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${getSeverityStyle()}`}
        style={{ fontFamily: "var(--font-text)" }}
      >
        {/* Encabezado */}
        <CardHeader
          className={`p-3 border-b ${expanded ? "bg-opacity-20" : ""}`}
          style={{ fontFamily: "var(--font-titles)" }}
        >
          <div className="flex justify-between items-center">
            <h1 className={`font-bold ${expanded ? "text-2xl" : "text-xl"} text-current`}>
              {alertData.suceso}
            </h1>
            {alertData.severity && (
              <span className={`px-2 py-1 text-xs rounded-full ${getSeverityStyle()}`}>
                {alertData.severity.toUpperCase()}
              </span>
            )}
          </div>
        </CardHeader>

        {/* Contenido */}
        <div className="p-3 space-y-3">
          <CardDescription className={`text-current ${expanded ? "text-base" : "text-sm line-clamp-2"}`}>
            {alertData.description}
          </CardDescription>
          
          <div className="rounded-md overflow-hidden border border-opacity-30 shadow-sm">
            <GoogleMapEmbed
              latitude={alertData.latitude}
              longitude={alertData.longitude}
              zoom={expanded ? 14 : 16}
              height={expanded ? "300px" : "150px"}
            />
          </div>

          {/* Información adicional cuando está expandido */}
          {expanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="space-y-2">
                <h3 className="font-semibold">Detalles:</h3>
                <p><strong>Tipo:</strong> {alertData.type || "No especificado"}</p>
                <p><strong>ID:</strong> {alertData.id || "N/A"}</p>
                <p><strong>Coordenadas:</strong> {alertData.latitude.toFixed(4)}, {alertData.longitude.toFixed(4)}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Estado:</h3>
                <p><strong>Severidad:</strong> {alertData.severity || "No especificada"}</p>
                <p><strong>Última actualización:</strong> {alertData.updatedAt ? new Date(alertData.updatedAt).toLocaleString() : "Hace 5 min"}</p>
              </div>
              
              {/* Línea separadora con imagen */}
              <div className="md:col-span-2 border-t border-gray-200 pt-4">
                <div className="flex flex-col items-center">
                  <Button 
                    onClick={handleAssistanceClick}
                    className="mt-4 mb-4 bg-red-500 hover:bg-red-600 text-white"
                    >
                    Pedir Ayuda
                    </Button>                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {getAlertDescription(alertData.type)}
                  </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!expanded && (
          <div
            className="px-3 py-2 bg-opacity-50 border-t text-xs flex justify-between items-center"
            style={{ fontFamily: "var(--font-text)" }}
          >
            <span>Última actualización</span>
            <span className="font-medium">
              {alertData.updatedAt ? new Date(alertData.updatedAt).toLocaleString() : "Hace 5 min"}
            </span>
          </div>
        )}
      </Card>
    </div>
  );
}