'use client'
import { Server, Cpu, ShieldCheck, ShieldNetwork, DangerTriangle, Map, Bell, UsersGroupTwoRounded } from "@solar-icons/react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Images } from '@/lib/images'

export default function Resources() {
  return (
    <div className="bg-vtwhite text-vtblack">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-vtblue/5 to-vtwhite">
        <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Tecnología que <span className="text-vtblue">Protege</span> en Tiempo Real
                </h1>
                <p className="text-lg md:text-xl mt-6 text-vtblack/90">
                  Descubre cómo nuestra plataforma integra inteligencia artificial, datos geoespaciales y respuesta comunitaria para crear un escudo de seguridad inteligente.
                </p>
              </motion.div>
            </div>

            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative rounded-xl overflow-hidden"
              >
                <div className="aspect-video bg-vtblue/10 flex items-center justify-center rounded-xl border border-vtblue/20">
                  <Image 
                    src={Images.partners.platformOverview} 
                    alt="Diagrama de la plataforma" 
                    width={800}
                    height={450}
                    className="object-cover rounded-xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Arquitectura del Sistema */}
      <section className="py-20 bg-vtwhite">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Arquitectura <span className="text-vtblue">Técnica</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-vtblack/90">
              Una infraestructura distribuida diseñada para escalar y responder en segundos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Backend en Tiempo Real",
                description: "Servidores distribuidos globalmente con procesamiento de eventos en menos de 200ms",
                icon: Server,
                stats: "200ms latency"
              },
              {
                title: "Motor de IA",
                description: "Modelos predictivos entrenados con 5 años de datos históricos",
                icon: Cpu,
                stats: "95% precisión"
              },
              {
                title: "Capa de Seguridad",
                description: "Cifrado AES-256 y autenticación multifactor para todos los datos",
                icon: ShieldCheck,
                stats: "Nivel militar"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-vtwhite border border-vtblue/10 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-vtblue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-vtblue" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-vtblack/80 mb-3">{item.description}</p>
                <span className="text-sm font-medium text-vtblue">{item.stats}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flujo de Alertas */}
      <section className="py-20 bg-vtblue/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  Ciclo de <span className="text-vtblue">Detección</span> y <span className="text-vtblue">Respuesta</span>
                </h2>
                
                <div className="space-y-8">
                  {[
                    {
                      step: "1",
                      title: "Detección",
                      description: "Sensores y reportes ciudadanos capturan eventos en tiempo real",
                      icon: DangerTriangle
                    },
                    {
                      step: "2",
                      title: "Verificación",
                      description: "Nuestra IA clasifica y valora la severidad del incidente",
                      icon: ShieldNetwork
                    },
                    {
                      step: "3",
                      title: "Despacho",
                      description: "Coordinación automática con autoridades locales",
                      icon: Map
                    },
                    {
                      step: "4",
                      title: "Notificación",
                      description: "Alertas precisas a afectados y servicios de emergencia",
                      icon: Bell
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="bg-vtblue text-vtwhite rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <step.icon className="h-4 w-4 text-vtblue" />
                          <h3 className="font-bold">{step.title}</h3>
                        </div>
                        <p className="text-vtblack/80">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-vtwhite p-6 rounded-xl border border-vtblue/10 shadow-lg"
              >
                <Image
                  src={Images.partners.alertFlow}
                  alt="Flujo de alertas"
                  width={700}
                  height={400}
                  className="rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Integraciones */}
      <section className="py-20 bg-vtwhite">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ecosistema <span className="text-vtblue">Conectado</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-vtblack/90">
              Interoperabilidad con los principales sistemas de emergencia y seguridad
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
                { name: "911", logo: Images.partners.proteccionCivil },
                { name: "Google Cloud", logo: Images.partners.gcp },
                { name: "OpenAI", logo: Images.partners.openai },
                { name: "POES", logo: Images.partners.poes }
            ].map((partner, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-vtwhite border border-vtblue/10 rounded-xl p-6 flex items-center justify-center h-32 hover:shadow-md transition-shadow"
                >
                <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={80}
                    className="object-contain h-full w-full"
                />
                </motion.div>
            ))}
            </div>
        </div>
      </section>

      {/* Para Comunidades */}
      <section className="py-20 bg-vtblue text-vtwhite">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Image
                  src={Images.partners.communityApp}
                  alt="Aplicación móvil"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>

            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  <span className="text-vtyellow">Participación</span> Ciudadana
                </h2>
                
                <div className="space-y-6 text-lg mb-8">
                  <p>
                    Nuestra aplicación móvil permite a los ciudadanos reportar incidentes en segundos, con geolocalización automática y categorización inteligente.
                  </p>
                  <p>
                    Cada reporte pasa por nuestro sistema de verificación multicapa para garantizar precisión sin saturar los servicios de emergencia.
                  </p>
                  <p>
                    Los usuarios reciben alertas personalizadas según su ubicación y perfiles de riesgo.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/app-guide" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-vtyellow text-vtblue rounded-lg font-medium hover:bg-vtyellow/90 transition-colors"
                  >
                    Guía de la App
                  </Link>
                  <Link 
                    href="/download" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-vtwhite text-vtwhite rounded-lg font-medium hover:bg-vtwhite/10 transition-colors"
                  >
                    Descargar Ahora
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="py-20 bg-vtwhite">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Preguntas <span className="text-vtblue">Frecuentes</span>
            </h2>
            <p className="text-lg text-vtblack/90">
              Todo lo que necesitas saber sobre nuestra plataforma
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "¿Cómo garantizan la privacidad de los datos?",
                answer: "Usamos cifrado end-to-end y no vendemos ni compartimos datos personales. Cumplimos con todas las regulaciones de protección de datos."
              },
              {
                question: "¿Qué hace diferente a su sistema de alertas?",
                answer: "Nuestra IA reduce falsas alarmas en un 70% mediante verificación multicapa y contexto geográfico."
              },
              {
                question: "¿Requiere instalación costosa?",
                answer: "Funciona con infraestructura existente. Ofrecemos opciones desde $99/mes para comunidades pequeñas."
              },
              {
                question: "¿Cómo manejan emergencias médicas?",
                answer: "Integración directa con servicios EMS y envío automático de historiales médicos relevantes (con consentimiento)."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="border-b border-vtblue/10 pb-6"
              >
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-vtblack/80">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}