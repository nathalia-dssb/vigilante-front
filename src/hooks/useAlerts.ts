import { useState } from 'react';

interface Coordenada {
  latitud: number;
  longitud: number;
}

interface Alerta {
  _id?: string;
  title: string;
  descripcion: string;
  ubicacion: Coordenada;
  fecha: string;
  severidad: string;
  clasificacion: string;
}

interface UseAlerts {
  alerts: Alerta[];
  currentAlert: Alerta | null;
  loading: boolean;
  error: string | null;
  createAlert: (alertData: Omit<Alerta, '_id'>) => Promise<Alerta | undefined>;
  getAlertById: (id: string) => Promise<Alerta | undefined>;
  getAllAlerts: () => Promise<void>;
  updateAlert: (id: string, alertData: Partial<Alerta>) => Promise<Alerta | undefined>;
  deleteAlert: (id: string) => Promise<boolean>;
}

export function useAlerts(): UseAlerts {
  const [alerts, setAlerts] = useState<Alerta[]>([]);
  const [currentAlert, setCurrentAlert] = useState<Alerta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/alerts';
  console.log('API_BASE_URL:', API_BASE_URL);

  const handleRequest = async <T,>(url: string, options?: RequestInit): Promise<T | undefined> => {
    console.log(`Iniciando solicitud a ${url}`, { options });
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });

      console.log('Respuesta recibida:', { status: response.status, ok: response.ok });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta:', errorData);
        throw new Error(errorData.detail || 'Error en la solicitud');
      }

      const data = await response.json();
      console.log('Datos recibidos:', data);
      
      // Convertir fechas de string a Date
      if (data.fecha) {
        console.log('Convirtiendo fecha string a Date:', data.fecha);
        data.fecha = new Date(data.fecha);
      }
      
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error en handleRequest:', message, err);
      setError(message);
      return undefined;
    } finally {
      console.log('Finalizando solicitud, estableciendo loading a false');
      setLoading(false);
    }
  };

  const createAlert = async (alertData: Omit<Alerta, '_id'>): Promise<Alerta | undefined> => {
    console.log('Creando alerta con datos:', alertData);
    const result = await handleRequest<Alerta>('/alerts', {
      method: 'POST',
      body: JSON.stringify({
        ...alertData,
        fecha: alertData.fecha.toString(),
      }),
    });

    if (result) {
      console.log('Alerta creada exitosamente:', result);
      setAlerts(prev => [...prev, result]);
      console.log('Lista de alertas actualizada:', [...alerts, result]);
    } else {
      console.log('No se pudo crear la alerta');
    }

    return result;
  };

  const getAlertById = async (id: string): Promise<Alerta | undefined> => {
    console.log(`Obteniendo alerta con ID: ${id}`);
    const result = await handleRequest<Alerta>(`/alerts/${id}`);
    if (result) {
      console.log('Alerta encontrada:', result);
      setCurrentAlert(result);
    } else {
      console.log('No se encontró la alerta');
    }
    return result;
  };

  const getAllAlerts = async (): Promise<void> => {
    console.log('Obteniendo todas las alertas');
    const result = await handleRequest<Alerta[]>('/alerts');
    if (result) {
      console.log(`Se obtuvieron ${result.length} alertas`);
      setAlerts(result);
      console.log('Alertas actualizadas en el estado');
    } else {
      console.log('No se pudieron obtener las alertas');
    }
  };

  const updateAlert = async (id: string, alertData: Partial<Alerta>): Promise<Alerta | undefined> => {
    console.log(`Actualizando alerta ID: ${id} con datos:`, alertData);
    const dataToSend = {
      ...alertData,
      fecha: alertData.fecha?.toString()
    };

    const result = await handleRequest<Alerta>(`/alerts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dataToSend),
    });

    if (result) {
      console.log('Alerta actualizada exitosamente:', result);
      setAlerts(prev => prev.map(alert => alert._id === id ? result : alert));
      if (currentAlert?._id === id) {
        console.log('Actualizando currentAlert con los nuevos datos');
        setCurrentAlert(result);
      }
    } else {
      console.log('No se pudo actualizar la alerta');
    }

    return result;
  };

  const deleteAlert = async (id: string): Promise<boolean> => {
    console.log(`Eliminando alerta con ID: ${id}`);
    const success = await handleRequest<{ success: boolean }>(`/alerts/${id}`, {
      method: 'DELETE',
    });

    if (success) {
      console.log('Alerta eliminada exitosamente');
      setAlerts(prev => prev.filter(alert => alert._id !== id));
      if (currentAlert?._id === id) {
        console.log('Limpiando currentAlert ya que fue eliminada');
        setCurrentAlert(null);
      }
      return true;
    }

    console.log('No se pudo eliminar la alerta');
    return false;
  };

  return {
    alerts,
    currentAlert,
    loading,
    error,
    createAlert,
    getAlertById,
    getAllAlerts,
    updateAlert,
    deleteAlert,
  };
}