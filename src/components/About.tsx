'use client'
import { Shield, HeartPulse, Eye, Cloud, UsersGroupRounded, Global, Cpu, ShieldCheck } from "@solar-icons/react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Images } from '@/lib/images'

export default function AboutUs() {
  return (
    <div className="bg-vtwhite text-vtblack">
      {/* Hero Section About Us */}
      <section className="relative bg-gradient-to-b from-vtwhite to-vtwhite/90">
        <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Nuestra <span className="text-vtblue">Tecnología</span> Protege lo que más Importa
                </h1>
                <p className="text-lg md:text-xl mt-6 text-vtblack/90">
                  En Vigilante, combinamos innovación y compromiso para crear un ecosistema de seguridad integral que protege comunidades, empresas y familias.
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
                    src={Images.about}
                    alt="Equipo de Vigilante" 
                    width={800}
                    height={100}
                    className="object-cover rounded-xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-20 bg-vtwhite">
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
                  De <span className="text-vtblue">Visión</span> a <span className="text-vtblue">Realidad</span>
                </h2>
                <div className="space-y-6 text-lg">
                  <p>
                    Fundada en 2025, Vigilante nació de la necesidad de integrar seguridad física y digital en un solo ecosistema inteligente.
                  </p>
                  <p>
                    Nuestro equipo de expertos en IA, seguridad cibernética y salud pública trabajan para anticipar riesgos antes de que ocurran.
                  </p>
                  <p>
                    Hoy protegemos a más de 500 comunidades en 3 países, con una tasa de respuesta 3 veces más rápida que los sistemas tradicionales.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              {[
                { value: "24/7", label: "Monitoreo continuo", icon: Eye },
                { value: "3x", label: "Más rápido", icon: Cpu },
                { value: "500+", label: "Comunidades", icon: UsersGroupRounded },
                { value: "99.9%", label: "Disponibilidad", icon: Global }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-vtwhite border border-vtblue/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-vtblue/10 p-3 rounded-full">
                      <stat.icon className="h-6 w-6 text-vtblue" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-vtblack/80">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-20 bg-vtblue/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Principios que nos <span className="text-vtblue">Definen</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-vtblack/90">
              Creemos que la tecnología debe servir para proteger y conectar, no para vigilar y controlar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Seguridad Proactiva",
                description: "Anticipamos riesgos mediante análisis predictivo y patrones de comportamiento.",
                icon: ShieldCheck
              },
              {
                title: "Privacidad por Diseño",
                description: "Tus datos son tuyos. Usamos cifrado end-to-end en todas nuestras comunicaciones.",
                icon: Eye
              },
              {
                title: "Impacto Comunitario",
                description: "Trabajamos con líderes locales para adaptar nuestros sistemas a cada contexto.",
                icon: UsersGroupRounded
              },
              {
                title: "Innovación Constante",
                description: "Invertimos el 30% de nuestros ingresos en investigación y desarrollo.",
                icon: Cpu
              },
              {
                title: "Transparencia Radical",
                description: "Reportes mensuales detallados sobre el funcionamiento del sistema.",
                icon: Global
              },
              {
                title: "Salud Integrada",
                description: "Coordinación automática con servicios médicos en emergencias.",
                icon: HeartPulse
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-vtwhite p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-vtblue/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-vtblue" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-vtblack/80">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo Directivo */}
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
              Conoce a Nuestros <span className="text-vtblue">Patrocinadores</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-vtblack/90">
              Expertos con décadas de experiencia combinada en seguridad, tecnología y salud pública.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "911",
                role: "Protección Civil y Bomberos Estatal",
                expertise: "Salud Pública",
                image: Images.partners.proteccionCivil
              },
              {
                name: "GCP",
                role: "Servicios Cloud",
                expertise: "Sistemas Cloud",
                image: Images.partners.gcp
              },
              {
                name: "POES",
                role: "Policía Estatal Estado de Queretaro",
                expertise: "Seguridad Ciudadana",
                image: Images.partners.poes
              },
              {
                name: "OpenAI",
                role: "Investigación y despliegue de Inteligencia Artificial",
                expertise: "Inteligencia Artificial",
                image: Images.partners.openai
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-vtblue/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vtblack/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-vtwhite">{member.expertise}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-vtblue">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-vtblue text-vtwhite">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Shield className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para experimentar la seguridad del futuro?
            </h2>
            <p className="text-xl mb-8 text-vtwhite/90">
              Únete a las cientos de comunidades que ya protegen lo que más les importa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-vtwhite text-vtblue rounded-lg font-medium hover:bg-vtwhite/90 transition-colors"
              >
                Contactar a Ventas
              </Link>
              <Link 
                href="/demo" 
                className="inline-flex items-center justify-center px-8 py-4 border border-vtwhite text-vtwhite rounded-lg font-medium hover:bg-vtwhite/10 transition-colors"
              >
                Solicitar Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}