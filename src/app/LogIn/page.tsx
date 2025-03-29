'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, Shield, User, HeartPulse, Lock } from "@solar-icons/react"
import Link from "next/link"

export default function Login() {
  return (
    <div className="min-h-screen flex">
      {/* Sección izquierda - Formulario */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-vtdarkblue/10 mb-4">
              <Lock className="h-6 w-6 text-vtdarkblue" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bienvenido de vuelta</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  autoComplete="username"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="flex items-center gap-1">
                  <Lock className="h-4 w-4" />
                  Contraseña
                </Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Password" 
                  icon={Eye} 
                  iconPosition="right" 
                  required
                  className="mt-1"
                />
                <div className="flex justify-between mt-2">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-vtdarkblue focus:ring-vtdarkblue"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-600 dark:text-gray-400">
                      Recordar sesión
                    </label>
                  </div>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-vtdarkblue hover:bg-vtdarkblue/90 transition-colors"
            >
              Iniciar sesión
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  O continúa con
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" type="button">
                <svg className="h-4 w-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button">
                <svg className="h-4 w-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"></path>
                </svg>
                Microsoft
              </Button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{' '}
            <Link href="/userRegister" className="font-medium text-primary hover:underline">
              Regístrate ahora
            </Link>
          </div>
        </div>
      </div>

      {/* Sección derecha - Información */}
      <div className="hidden md:flex md:w-1/2 bg-vtdarkblue flex-col items-center justify-center p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-vtdarkblue/80 to-vtdarkblue z-0"></div>
        <div className="max-w-2xl space-y-8 relative z-10">
          <h1 className="text-4xl font-bold leading-tight">Asegurando la seguridad del estado</h1>
          
          <p className="text-lg leading-relaxed">
            Vigilante es un ecosistema desarrollado mediante la vigilancia de
            cámaras que estén conectadas al ecosistema y con ayuda de IA y servicios Cloud
            podemos mantener al usuario, sector salud y seguridad coordinados para evitar y asegurar
            la seguridad de sus ciudadanos.
          </p>

          <p className="text-lg font-medium">Inicia sesión para explorar nuestros servicios</p>

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