'use client'
import { Shield, Phone, LetterUnread, PointOnMap, ClockCircle } from "@solar-icons/react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-vtdarkblue text-vtwhite">
      {/* Olas decorativas en la parte superior */}
      <div className="overflow-hidden transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current text-vtblue/30"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current text-vtblue/30"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current text-vtblue/30"></path>
        </svg>
      </div>

      {/* Contenido principal del footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-vtblue" />
              <span className="text-2xl font-bold">Vigilante</span>
            </div>
            <p className="text-vtwhite/80">
              Tecnología de seguridad integrada para proteger comunidades, empresas y familias.
            </p>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: "Inicio", href: "/" },
                { name: "Sobre Nosotros", href: "/about" },
                { name: "Servicios", href: "/services" },
                { name: "Precios", href: "/pricing" },
                { name: "Contacto", href: "/contact" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-vtwhite/80 hover:text-vtblue transition-colors flex items-center gap-2"
                  >
                    <span className="h-px w-3 bg-vtblue opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Servicios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Nuestros Servicios</h3>
            <ul className="space-y-3">
              {[
                { name: "Vigilancia por IA", href: "/services/ai" },
                { name: "Monitoreo 24/7", href: "/services/monitoring" },
                { name: "Coordinación Médica", href: "/services/health" },
                { name: "Seguridad Residencial", href: "/services/residential" },
                { name: "Protección Empresarial", href: "/services/business" }
              ].map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href} 
                    className="text-vtwhite/80 hover:text-vtblue transition-colors flex items-center gap-2"
                  >
                    <span className="h-px w-3 bg-vtblue opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <PointOnMap className="h-5 w-5 text-vtblue mt-0.5 flex-shrink-0" />
                <span className="text-vtwhite/80">Blvd. Hacienda La Gloria 2400</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-vtblue" />
                <span className="text-vtwhite/80">+52 55 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <LetterUnread className="h-5 w-5 text-vtblue" />
                <span className="text-vtwhite/80">contacto@vigilante.com</span>
              </li>
              <li className="flex items-center gap-3">
                <ClockCircle className="h-5 w-5 text-vtblue" />
                <span className="text-vtwhite/80">Lun-Vie: 9am - 6pm</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-vtblue/20 my-12"></div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-sm text-vtwhite/60"
          >
            © {new Date().getFullYear()} Vigilante. Todos los derechos reservados.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            <Link href="/privacy" className="text-sm text-vtwhite/60 hover:text-vtblue transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terms" className="text-sm text-vtwhite/60 hover:text-vtblue transition-colors">
              Términos de Servicio
            </Link>
            <Link href="/cookies" className="text-sm text-vtwhite/60 hover:text-vtblue transition-colors">
              Cookies
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}