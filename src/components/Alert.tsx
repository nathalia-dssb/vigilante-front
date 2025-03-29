"use client";

import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { useState, useEffect } from "react";
import React from "react";

interface AlertData {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
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
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  latitude,
  longitude,
  zoom = 15,
  width = "100%",
  height = "150px", // Altura reducida para hacer la tarjeta más compacta
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

export default function Alert({
  data,
  apiEndpoint,
  defaultLocation = { latitude: 20.703239, longitude: -100.4486203 },
}: AlertProps) {
  const [alertData, setAlertData] = useState<AlertData>({
    title: "Cargando...",
    description: "Obteniendo información de la alerta...",
    latitude: defaultLocation.latitude,
    longitude: defaultLocation.longitude,
  });

  const [isLoading, setIsLoading] = useState(!data);

  useEffect(() => {
    if (data) {
      setAlertData(data);
      setIsLoading(false);
      return;
    }

    if (apiEndpoint) {
      const fetchAlertData = async () => {
        try {
          const response = await fetch(apiEndpoint);
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
          const fetchedData = await response.json();
          setAlertData(fetchedData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error al obtener datos de alerta:", error);
          setAlertData({
            title: "Error",
            description: "No se pudieron cargar los datos de la alerta",
            latitude: defaultLocation.latitude,
            longitude: defaultLocation.longitude,
          });
          setIsLoading(false);
        }
      };

      fetchAlertData();
    } else {
      console.warn("No se proporcionaron datos ni API endpoint para Alert");
      setAlertData({
        title: "Datos de ejemplo",
        description: "Estos son datos de ejemplo al no proporcionar datos reales",
        latitude: defaultLocation.latitude,
        longitude: defaultLocation.longitude,
      });
      setIsLoading(false);
    }
  }, [data, apiEndpoint, defaultLocation]);

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

  return (
    <div className="w-full max-w-md">
      <Card
        className="border border-vtlightblue rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
        style={{ fontFamily: "var(--font-text)" }}
      >
        {/* Encabezado */}
        <CardHeader
          className="p-3 bg-vtblue border-b border-vtlightblue"
          style={{ fontFamily: "var(--font-titles)" }}
        >
          <h1 className="text-2xl font-bold text-vtwhite ">{alertData.title}</h1>
        </CardHeader>

        {/* Contenido */}
        <div className="p-3">
          <CardDescription className="text-vtdarkblue text-sm mb-2 line-clamp-2">
            {alertData.description}
          </CardDescription>
          <div className="rounded-md overflow-hidden border border-vtlightblue shadow-sm">
            <GoogleMapEmbed
              latitude={alertData.latitude}
              longitude={alertData.longitude}
              zoom={16}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-3 py-2 bg-vtwhite border-t border-vtlightblue text-xs text-vtdarkblue flex justify-between items-center"
          style={{ fontFamily: "var(--font-text)" }}
        >
          <span>Última actualización</span>
          <span className="text-vtredacc font-medium">Hace 5 min</span>
        </div>
      </Card>
    </div>
  );
}