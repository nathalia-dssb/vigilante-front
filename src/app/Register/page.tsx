'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, Shield, User, HeartPulse, CheckCircle } from "@solar-icons/react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Logo from "@/public/Logo.svg"; // Asegúrate de tener el SVG en la carpeta public


export default function Register() {
  return (
    <div className="min-h-screen flex">
      {/* Sección izquierda - Formulario */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center p-8 overflow-y-auto">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Completa tu registro</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Por favor proporciona la siguiente información para continuar</p>
          </div>

          <form className="mt-8 space-y-6">
            {/* Sección de Información Personal */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Información personal</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nombre(s)*</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Ej. Juan"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Apellidos*</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Ej. Pérez López"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="curp">CURP*</Label>
                <Input
                  id="curp"
                  type="text"
                  placeholder="Ej. PELJ920313HDFLPN01"
                  pattern="[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9A-Z]{2}"
                  title="Formato: 4 letras, 6 números, 6 letras, 2 alfanuméricos"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="birthDate">Fecha de nacimiento*</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Género*</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                      <SelectItem value="unspecified">Prefiero no decir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Sección de Domicilio */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Domicilio</h2>
              
              <div>
                <Label htmlFor="street">Calle y número*</Label>
                <Input
                  id="street"
                  type="text"
                  placeholder="Ej. Av. Principal #123"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">Código Postal*</Label>
                  <Input
                    id="zipCode"
                    type="text"
                    placeholder="Ej. 12345"
                    pattern="[0-9]{5}"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado*</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ciudad-de-mexico">Ciudad de México</SelectItem>
                      <SelectItem value="queretaro">Querétaro</SelectItem>
                      {/* Agrega todos los estados de México */}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Ciudad/Municipio*</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Ej. Ciudad de México"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="neighborhood">Colonia*</Label>
                  <Input
                    id="neighborhood"
                    type="text"
                    placeholder="Ej. Centro"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sección de Credenciales */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Credenciales de acceso</h2>
              
              <div>
                <Label htmlFor="email">Correo electrónico*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Teléfono*</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ej. 5512345678"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Contraseña*</Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Crea tu contraseña" 
                  icon={Eye} 
                  iconPosition="right" 
                  required
                />
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>16-128 caracteres</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Incluye mayúsculas y números</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar contraseña*</Label>
                <Input 
                  id="confirmPassword"
                  type="password" 
                  placeholder="Repite tu contraseña" 
                  icon={Eye} 
                  iconPosition="right" 
                  required
                />
              </div>
            </div>

            <div className="flex items-start pt-2">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 mt-1 rounded border-gray-300 text-vtdarkblue focus:ring-vtdarkblue"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                Acepto los <Link href="/terms" className="text-primary hover:underline">Términos de servicio</Link>, la <Link href="/privacy" className="text-primary hover:underline">Política de privacidad</Link> y autorizo el uso de mis datos conforme a la <Link href="/legal" className="text-primary hover:underline">Ley de Protección de Datos</Link>.
              </label>
            </div>

            <Button type="submit" className="w-full bg-vtdarkblue hover:bg-vtdarkblue/90 mt-6">
              Completar registro
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-4">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-vtdarkblue flex-col items-center justify-center p-12 text-white">
        <div className="max-w-2xl space-y-8">
          <h1 className="text-4xl font-bold">Protección Integral</h1>
          
          <p className="text-lg leading-relaxed">
            Al registrarte en Vigilante, obtendrás acceso a nuestro ecosistema de seguridad
            que combina tecnología de vanguardia con inteligencia artificial para ofrecerte
            protección en tiempo real las 24 horas del día.
          </p>

          <p className="text-lg font-medium">Beneficios exclusivos para miembros registrados:</p>

          {/* Tarjetas de beneficios */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { icon: Shield, title: "Seguridad", desc: "Manejado por servicios Cloud de seguridad" },
              { icon: HeartPulse, title: "Salud", desc: "Conectado con medios de emergencia" },
              { icon: User, title: "Usuario", desc: "Sistema de alertas personalizadas" }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 p-4 rounded-lg border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <item.icon className="h-6 w-6" weight="Bold" />
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-white/80 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>   
        </div>
      </div>
    </div>
  )
}