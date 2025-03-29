// hooks/useAssistant.ts
import { useState, useCallback } from 'react';

interface Message {
  text: string;
  isUser: boolean;
}

interface UseAssistant {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

export function useAssistant(): UseAssistant {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Agregar mensaje del usuario
      setMessages(prev => [...prev, { text, isUser: true }]);

      const response = await fetch(`http://localhost:8000/api/chatbot/ask-?question=${encodeURIComponent(text)}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Asumimos que la respuesta viene en formato { answer: string }
      const assistantResponse = data.response || "No pude obtener una respuesta. Por favor intenta nuevamente.";
      setMessages(prev => [...prev, { text: assistantResponse, isUser: false }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setMessages(prev => [...prev, { 
        text: "Lo siento, estoy teniendo dificultades para responder. Por favor intenta nuevamente más tarde.", 
        isUser: false 
      }]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
  };
}