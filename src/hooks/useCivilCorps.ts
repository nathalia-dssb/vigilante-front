// hooks/useCivilCorps.ts
import { useState } from 'react';

interface CuerpoCivil {
  _id?: string;
  matricula: string;
  tipo_vehiculo: string;
  encargado: string;
  zona: string;
  user: string;
  contrasena?: string;
}

interface UseCivilCorps {
  civilCorps: CuerpoCivil[];
  currentMember: CuerpoCivil | null;
  loading: boolean;
  error: string | null;
  createCivilCorps: (memberData: Omit<CuerpoCivil, '_id'>) => Promise<CuerpoCivil | undefined>;
  getCivilCorpsById: (id: string) => Promise<CuerpoCivil | undefined>;
  clearCurrent: () => void;
}

export function useCivilCorps(): UseCivilCorps {
  const [civilCorps, setCivilCorps] = useState<CuerpoCivil[]>([]);
  const [currentMember, setCurrentMember] = useState<CuerpoCivil | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/civil-corps';

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

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      console.error('Error en la solicitud:', message);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const createCivilCorps = async (memberData: Omit<CuerpoCivil, '_id'>): Promise<CuerpoCivil | undefined> => {
    const dataToSend = {
      ...memberData,
      // No enviar contraseña si está vacía o undefined
      contrasena: memberData.contrasena || undefined
    };

    const result = await handleRequest<CuerpoCivil>('/civil-corps', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    });

    if (result) {
      setCivilCorps(prev => [...prev, result]);
    }

    return result;
  };

  const getCivilCorpsById = async (id: string): Promise<CuerpoCivil | undefined> => {
    const result = await handleRequest<CuerpoCivil>(`/civil-corps/${id}`);
    if (result) {
      setCurrentMember(result);
    }
    return result;
  };

  const clearCurrent = () => {
    setCurrentMember(null);
  };

  return {
    civilCorps,
    currentMember,
    loading,
    error,
    createCivilCorps,
    getCivilCorpsById,
    clearCurrent,
  };
}