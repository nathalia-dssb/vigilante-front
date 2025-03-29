// hooks/useCitizens.ts
import { useState } from 'react';

interface Domicilio {
  codigo_postal: number;
  calle: string;
  estado: string;
  municipio: string;
  colonia: string;
}

interface Ciudadano {
  _id?: string;
  nombre: string;
  apellidos: string;
  curp: string;
  fecha_nacimiento: string | Date;
  domicilio: Domicilio;
  sexo: string;
  correo: string;
  telefono: string;
  contrasena?: string; 
}

interface UseCitizens {
  citizens: Ciudadano[];
  currentCitizen: Ciudadano | null;
  loading: boolean;
  error: string | null;
  createCitizen: (citizenData: Omit<Ciudadano, '_id'>) => Promise<Ciudadano | undefined>;
  getCitizenById: (id: string) => Promise<Ciudadano | undefined>;
  clearCurrent: () => void;
}

export function useCitizens(): UseCitizens {
  const [citizens, setCitizens] = useState<Ciudadano[]>([]);
  const [currentCitizen, setCurrentCitizen] = useState<Ciudadano | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/citizens';

  const handleRequest = async <T,>(url: string, options?: RequestInit): Promise<T | undefined> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}`, {
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
      if (data.fecha_nacimiento) {
        data.fecha_nacimiento = new Date(data.fecha_nacimiento);
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

  const createCitizen = async (citizenData: Omit<Ciudadano, '_id'>): Promise<Ciudadano | undefined> => {
    const dataToSend = {
      ...citizenData,
      fecha_nacimiento: citizenData.fecha_nacimiento instanceof Date 
        ? citizenData.fecha_nacimiento.toISOString() 
        : citizenData.fecha_nacimiento,
      // No enviar contraseña si está vacía o undefined
      contrasena: citizenData.contrasena || undefined
    };

    const result = await handleRequest<Ciudadano>('/citizens', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    });

    if (result) {
      setCitizens(prev => [...prev, result]);
    }

    return result;
  };

  const getCitizenById = async (id: string): Promise<Ciudadano | undefined> => {
    const result = await handleRequest<Ciudadano>(`/citizens/${id}`);
    if (result) {
      setCurrentCitizen(result);
    }
    return result;
  };

  const clearCurrent = () => {
    setCurrentCitizen(null);
  };

  return {
    citizens,
    currentCitizen,
    loading,
    error,
    createCitizen,
    getCitizenById,
    clearCurrent,
  };
}