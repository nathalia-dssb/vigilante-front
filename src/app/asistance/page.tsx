'use client'
import { useState, useRef, useEffect } from 'react'
import { AltArrowLeft, ChatSquare } from "@solar-icons/react"
import { motion } from "framer-motion"
import Link from 'next/link'

export default function Asistencia() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mensaje inicial del asistente
  useEffect(() => {
    setMessages([{
      text: "¡Hola! Soy tu asistente de seguridad VIGILANTE. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre alertas, protocolos de emergencia o el funcionamiento de nuestra plataforma.",
      isUser: false
    }])
  }, [])

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Agregar mensaje del usuario
    const userMessage = { text: input, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Aquí integrarías la llamada a la API de Gemini
      // Ejemplo simulado:
      const response = await simulateGeminiCall(input)
      
      // Agregar respuesta del asistente
      setMessages(prev => [...prev, {
        text: response,
        isUser: false
      }])
    // En la función handleSubmit, modifica el bloque catch:
    } catch (error) {
        console.error('Error al obtener respuesta:', error); // <-- Aquí usamos el error
        setMessages(prev => [...prev, {
        text: "Lo siento, estoy teniendo dificultades para responder. Por favor intenta nuevamente más tarde.",
        isUser: false
        }])
    } finally {
        setIsLoading(false)
    }
  }

  // Función de simulación - reemplazar con llamada real a Gemini
  const simulateGeminiCall = async (query: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simular delay de red
    
    const responses: Record<string, string> = {
      "hola": "¡Hola! ¿Cómo puedo ayudarte con información sobre seguridad y alertas hoy?",
      "protocolo de incendio": "El protocolo para incendios incluye: 1) Activar la alarma, 2) Llamar al 911, 3) Usar extintores solo si es seguro, 4) Evacuar por rutas señaladas, 5) No usar ascensores.",
      "cómo reportar una emergencia": "Puedes reportar emergencias: 1) Por la app VIGILANTE (botón rojo), 2) Llamando al 911, 3) En nuestro sitio web en la sección 'Reportes'.",
      "qué hacer en un sismo": "Durante un sismo: 1) Conserva la calma, 2) Busca un lugar seguro (triángulo de vida), 3) Aléjate de ventanas, 4) Si estás en silla de ruedas, frena y cubre cabeza, 5) Después del sismo, evacúa con precaución."
    }

    return responses[query.toLowerCase()] || "Como asistente de seguridad VIGILANTE, te recomiendo: 1) Mantener la calma, 2) Seguir los protocolos establecidos, 3) Usar nuestra app para reportar cualquier incidente. ¿Necesitas información más específica sobre algún protocolo de seguridad?"
  }

  return (
    <div className="min-h-screen bg-vtwhite text-vtblack">
      {/* Contenedor principal del chat */}
      <main className="container mx-auto px-6 py-8 max-w-4xl pt-25">
        {/* Botón de volver atrás */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="text-sm text-vtblue hover:underline flex items-center gap-1"
          >
            <AltArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col h-[70vh] border border-vtblue/20 rounded-xl shadow-sm bg-vtwhite mt-6 "
        >
          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-lg p-4 ${message.isUser 
                  ? 'bg-vtblue text-vtwhite rounded-br-none' 
                  : 'bg-vtblue/10 text-vtblack rounded-bl-none'}`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-vtblue/10 text-vtblack rounded-lg rounded-bl-none p-4 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-vtblue animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-vtblue animate-bounce delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-vtblue animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Formulario de entrada */}
          <form onSubmit={handleSubmit} className="border-t border-vtblue/10 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta sobre seguridad..."
                className="flex-1 border border-vtblue/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-vtblue/50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-vtblue text-vtwhite rounded-lg px-6 py-3 font-medium hover:bg-vtblue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <ChatSquare className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <ChatSquare className="h-4 w-4" />
                    Enviar
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-vtblack/50 mt-2 text-center">
              El asistente puede cometer errores. Verifica siempre la información crítica con autoridades.
            </p>
          </form>
        </motion.div>

        {/* Sección de sugerencias */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h3 className="text-lg font-medium text-center mb-4 text-vtblack/80">
            ¿No sabes qué preguntar? Prueba con:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              "Protocolo para sismos",
              "Cómo reportar una emergencia",
              "Qué hacer en caso de incendio"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInput(suggestion)}
                className="bg-vtblue/5 hover:bg-vtblue/10 border border-vtblue/20 rounded-lg px-4 py-3 text-sm transition-colors text-start"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer minimalista */}
      <footer className="bg-vtblue/5 py-6 mt-12 border-t border-vtblue/10">
        <div className="container mx-auto px-6 text-center text-sm text-vtblack/70">
          <p>Asistente de seguridad VIGILANTE - Respuestas generadas por IA</p>
          <p className="mt-1">Para emergencias reales, contacta a las autoridades locales</p>
        </div>
      </footer>
    </div>
  )
}