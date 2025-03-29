"use client";

import NavBar from "@/components/NavBar";
import Alert from "@/components/Alert";
import { AlertModal } from "@/components/AlertModal";
import { useState, useEffect } from "react";
import { useAlerts } from "@/hooks/useAlerts";
import { AlertData, toAlertData } from "@/types/types"; // Importa desde types.ts

function Dashboard() {
  const { alerts, loading, error, getAllAlerts } = useAlerts();
  const [filter, setFilter] = useState<"all" | AlertData["type"]>("all");
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllAlerts();
  }, []);

// Dashboard.tsx
const normalizedAlerts = alerts.map(alert => {
  const alertData = toAlertData({
    _id: alert._id,
    suceso: alert.descripcion,
    ubicacion: {
      latitud: alert.ubicacion.latitud,
      longitud: alert.ubicacion.longitud
    },
    fecha: alert.fecha,
    clasificacion: alert.clasificacion,
    severidad: alert.severidad // Nuevo campo añadido
  });
  return alertData;
});
  const filteredAlerts =
    filter === "all"
      ? normalizedAlerts
      : normalizedAlerts.filter((alerta) => alerta.type === filter);

  const handleAlertClick = (alerta: AlertData) => {
    setSelectedAlert(alerta);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-vtwhite text-vtdarkblue pt-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-vtdarkblue mb-6">
            Tablero de Alertas
          </h1>
          <div className="text-center">Cargando alertas...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-vtwhite text-vtdarkblue pt-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-vtdarkblue mb-6">
            Tablero de Alertas
          </h1>
          <div className="text-center text-red-500">Error al cargar las alertas: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vtwhite text-vtdarkblue pt-25">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-vtdarkblue mb-6">
          Tablero de Alertas
        </h1>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all" ? "bg-vtblue text-vtwhite" : "border border-vtlightblue text-vtdarkblue hover:bg-vtlightblue"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("salud")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "salud" ? "bg-red-500 text-vtwhite" : "border border-red-300 text-red-500 hover:bg-red-100"
            }`}
          >
            Salud
          </button>
          <button
            onClick={() => setFilter("transporte")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "transporte" ? "bg-yellow-500 text-vtwhite" : "border border-yellow-300 text-yellow-500 hover:bg-yellow-100"
            }`}
          >
            Transporte
          </button>
          <button
            onClick={() => setFilter("seguridad")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "seguridad" ? "bg-blue-500 text-vtwhite" : "border border-blue-300 text-blue-500 hover:bg-blue-100"
            }`}
          >
            Seguridad
          </button>
        </div>

        {/* Lista de alertas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alerta) => (
              <Alert 
                key={alerta.id} 
                data={alerta} 
                onClick={() => handleAlertClick(alerta)}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No hay alertas disponibles para este filtro.
            </div>
          )}
        </div>
      </div>

      {/* Modal para alerta seleccionada */}
      {selectedAlert && (
        <AlertModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          alertData={selectedAlert}
        />
      )}
    </div>
  );
}

export default Dashboard;