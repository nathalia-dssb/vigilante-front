"use client";

import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Alert from "@/components/Alert";
import { useState } from "react";

const alertasQueretaro = [
  {
    id: 1,
    title: "Incendio",
    description: "Incendio forestal en la Sierra Gorda, se requiere evacuación inmediata",
    latitude: 21.1698,
    longitude: -99.8295,
    severity: "alta",
    type: "seguridad",
  },
  {
    id: 2,
    title: "Inundación",
    description: "Desbordamiento del río en San Juan del Río, calles afectadas",
    latitude: 20.3936,
    longitude: -100.0018,
    severity: "media",
    type: "seguridad",
  },
  {
    id: 3,
    title: "Robo",
    description: "Robo a mano armada en centro comercial Antea",
    latitude: 20.6897,
    longitude: -100.4464,
    severity: "alta",
    type: "seguridad",
  },
  {
    id: 4,
    title: "Accidente vial",
    description: "Choque múltiple en Av. 5 de Febrero, tráfico detenido",
    latitude: 20.5883,
    longitude: -100.3889,
    severity: "media",
    type: "transporte",
  },
  {
    id: 5,
    title: "Fuga de gas",
    description: "Fuga de gas reportada en zona industrial Benito Juárez",
    latitude: 20.5586,
    longitude: -100.4215,
    severity: "alta",
    type: "seguridad",
  },
  {
    id: 6,
    title: "Manifestación",
    description: "Bloqueo por manifestación en Plaza de Armas del Centro Histórico",
    latitude: 20.5929,
    longitude: -100.3965,
    severity: "baja",
    type: "seguridad",
  },
  {
    id: 7,
    title: "Deslizamiento de tierra",
    description: "Derrumbe en carretera a Tequisquiapan, precaución al conducir",
    latitude: 20.5197,
    longitude: -100.1467,
    severity: "media",
    type: "transporte",
  },
  {
    id: 8,
    title: "Corte de suministro eléctrico",
    description: "Apagón reportado en toda la colonia Jurica",
    latitude: 20.6564,
    longitude: -100.4274,
    severity: "baja",
    type: "seguridad",
  },
  {
    id: 9,
    title: "Toma clandestina",
    description: "Detectada toma clandestina de combustible en ducto cerca de Pedro Escobedo",
    latitude: 20.5021,
    longitude: -100.1419,
    severity: "alta",
    type: "seguridad",
  },
  {
    id: 10,
    title: "Granizada",
    description: "Fuerte granizada en El Marqués, daños en techos y vehículos",
    latitude: 20.7153,
    longitude: -100.3167,
    severity: "media",
    type: "seguridad",
  },
];

function Dashboard() {
  const [filter, setFilter] = useState<"all" | "salud" | "transporte" | "seguridad">("all");

  // Filtrar alertas según el tipo seleccionado
  const filteredAlerts =
    filter === "all"
      ? alertasQueretaro
      : alertasQueretaro.filter((alerta) => alerta.type === filter);

  return (
    <div className="min-h-screen bg-vtwhite text-vtdarkblue">
      {/* Barra de navegación */}
      <NavBar />

      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título */}
        <h1 className="text-center text-3xl md:text-4xl font-bold text-vtdarkblue mb-6">
          Tablero de Alertas
        </h1>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "default" : "outline"}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all" ? "bg-vtblue text-vtwhite" : "border border-vtlightblue text-vtdarkblue hover:bg-vtlightblue"
            }`}
          >
            Todos
          </Button>
          <Button
            onClick={() => setFilter("salud")}
            variant={filter === "salud" ? "destructive" : "outline"}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "salud" ? "bg-red-500 text-vtwhite" : "border border-red-300 text-red-500 hover:bg-red-300"
            }`}
          >
            Salud ❤️
          </Button>
          <Button
            onClick={() => setFilter("transporte")}
            variant={filter === "transporte" ? "default" : "outline"}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "transporte" ? "bg-yellow-500 text-vtwhite" : "border border-yellow-300 text-yellow-500 hover:bg-yellow-300"
            }`}
          >
            Transporte 🚗
          </Button>
          <Button
            onClick={() => setFilter("seguridad")}
            variant={filter === "seguridad" ? "secondary" : "outline"}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "seguridad" ? "bg-blue-500 text-vtwhite" : "border border-blue-300 text-blue-500 hover:bg-blue-300"
            }`}
          >
            Seguridad 🔒
          </Button>
        </div>

        {/* Lista de alertas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alerta) => (
              <Alert key={alerta.id} data={alerta} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No hay alertas disponibles para este filtro.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;