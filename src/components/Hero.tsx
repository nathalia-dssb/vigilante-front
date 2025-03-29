'use client'
import { Button } from "@/components/ui/button"
import { Shield, HeartPulse, Eye, Cloud } from "@solar-icons/react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-vtwhite text-vtblack">

      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Contenido principal */}
          <div className="lg:w-1/2 space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Seguridad Inteligente <span className="text-vtblue">para Comunidades Modernas</span>
              </h1>
              
              <p className="text-lg md:text-xl mt-6 text-vtblack/90">
                Vigilante integra vigilancia por IA, coordinación en salud y protección ciudadana 
                en un único ecosistema cloud para una seguridad proactiva las 24 horas.
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-vtblue py-6 text-lg">
                <Link href="/userRegister">
                  Comenzar ahora
                </Link>
              </Button>
              <Button variant="outline" className="py-6 text-lg">
                <Link href="/demo">
                  Ver demostración
                </Link>
              </Button>
            </div>

            {/* Puntos destacados */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {[
                { icon: Shield, text: "Protección en tiempo real" },
                { icon: HeartPulse, text: "Coordinación con salud" },
                { icon: Eye, text: "Monitoreo 24/7" },
                { icon: Cloud, text: "Tecnología Cloud" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <item.icon className="h-5 w-5 text-vtblue" />
                  <span className="text-sm md:text-base">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Imagen/Video demostrativo */}
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Placeholder para video o imagen - Reemplazar con tu contenido real */}
              <div className="aspect-video bg-black/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <Cloud className="h-12 w-12 mx-auto text-vtblue" />
                  <p className="mt-4">Demo del sistema de vigilancia</p>
                </div>
              </div>
              
              {/* Efecto de brillo */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-vtblue/20 rounded-full filter blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Olas decorativas en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current text-white/10"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current text-white/10"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current text-white/10"></path>
        </svg>
      </div>
    </section>
  )
}