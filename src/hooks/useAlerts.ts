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
  fecha: string | Date;
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

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

  const handleRequest = async <T,>(url: string, options?: RequestInit): Promise<T | undefined> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error en la solicitud');
      }

      const data = await response.json();
      
      // Convertir fechas de string a Date
      if (data.fecha) {
        data.fecha = new Date(data.fecha);
      }
      
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      console.error('Error en la solicitud:', message);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const createAlert = async (alertData: Omit<Alerta, '_id'>): Promise<Alerta | undefined> => {
    const result = await handleRequest<Alerta>('/alerts', {
      method: 'POST',
      body: JSON.stringify({
        ...alertData,
        fecha: alertData.fecha instanceof Date ? alertData.fecha.toISOString() : alertData.fecha
      }),
    });

    if (result) {
      setAlerts(prev => [...prev, result]);
    }

    return result;
  };

  const getAlertById = async (id: string): Promise<Alerta | undefined> => {
    return await handleRequest<Alerta>(`/alerts/${id}`);
  };

  const getAllAlerts = async (): Promise<void> => {
    const result = await handleRequest<Alerta[]>('/alerts');
    if (result) {
      setAlerts(result);
    }
  };

  const updateAlert = async (id: string, alertData: Partial<Alerta>): Promise<Alerta | undefined> => {
    const dataToSend = {
      ...alertData,
      fecha: alertData.fecha instanceof Date ? alertData.fecha.toISOString() : alertData.fecha
    };

    const result = await handleRequest<Alerta>(`/alerts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dataToSend),
    });

    if (result) {
      setAlerts(prev => prev.map(alert => alert._id === id ? result : alert));
      if (currentAlert?._id === id) {
        setCurrentAlert(result);
      }
    }

    return result;
  };

  const deleteAlert = async (id: string): Promise<boolean> => {
    const success = await handleRequest<{ success: boolean }>(`/alerts/${id}`, {
      method: 'DELETE',
    });

    if (success) {
      setAlerts(prev => prev.filter(alert => alert._id !== id));
      if (currentAlert?._id === id) {
        setCurrentAlert(null);
      }
      return true;
    }

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