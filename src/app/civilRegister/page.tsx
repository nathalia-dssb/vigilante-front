'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, Shield, Bus, User, PointOnMap, BillList, CheckCircle } from "@solar-icons/react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CivilProtectionRegister() {
  return (
    <div className="min-h-screen flex">
      {/* Sección izquierda - Formulario */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center p-8 overflow-y-auto">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-vtblue" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Registro de Unidades</h1>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Registra tu unidad de Protección Civil en el sistema Vigilante</p>
          </div>

          <form className="mt-8 space-y-6">
            {/* Sección de Información de la Unidad */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2 flex items-center gap-2">
                <Bus className="h-5 w-5" />
                Datos de la Unidad
              </h2>
              
              <div>
                <Label htmlFor="plate" className="flex items-center gap-2">
                  <BillList className="h-4 w-4 mb-1" />
                  Matrícula Vehicular*
                </Label>
                <Input
                  id="plate"
                  type="text"
                  placeholder="Ej. ABC-1234"
                  required
                  pattern="[A-Z]{3}-[0-9]{4}"
                  title="Formato: Tres letras mayúsculas, guión y cuatro números"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zone" className="flex items-center gap-2">
                    <PointOnMap className="h-4 w-4 mb-1" />
                    Zona de Operación*
                  </Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona zona" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Zona Metropolitana */}
                        <SelectItem value="queretaro">Querétaro</SelectItem>
                        <SelectItem value="corregidora">Corregidora</SelectItem>
                        <SelectItem value="el-marques">El Marqués</SelectItem>
                        <SelectItem value="huimilpan">Huimilpan</SelectItem>
                        
                        {/* Valles */}
                        <SelectItem value="san-juan-del-rio">San Juan del Río</SelectItem>
                        <SelectItem value="pedro-escobedo">Pedro Escobedo</SelectItem>
                        <SelectItem value="tequisquiapan">Tequisquiapan</SelectItem>
                        <SelectItem value="ezequiel-montes">Ezequiel Montes</SelectItem>
                        <SelectItem value="colon">Colón</SelectItem>
                        
                        {/* Sierra Gorda */}
                        <SelectItem value="jalpan">Jalpan de Serra</SelectItem>
                        <SelectItem value="landa">Landa de Matamoros</SelectItem>
                        <SelectItem value="arroyo-seco">Arroyo Seco</SelectItem>
                        <SelectItem value="pinal">Pinal de Amoles</SelectItem>
                        <SelectItem value="san-joaquin">San Joaquín</SelectItem>
                        <SelectItem value="penamiller">Peñamiller</SelectItem>
                        
                        {/* Sur */}
                        <SelectItem value="amealco">Amealco de Bonfil</SelectItem>
                        <SelectItem value="toliman">Tolimán</SelectItem>
                        <SelectItem value="cadereyta">Cadereyta de Montes</SelectItem>
                        </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="unitType" className="flex items-center gap-2">
                    <Shield className="h-4 w-4 mb-1" />
                    Tipo de Unidad*
                  </Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ambulancia">Ambulancia</SelectItem>
                      <SelectItem value="bomberos">Bomberos</SelectItem>
                      <SelectItem value="patrulla">Patrulla</SelectItem>
                      <SelectItem value="rescate">Rescate</SelectItem>
                      <SelectItem value="comando">Unidad de Comando</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="leader" className="flex items-center gap-2">
                  <User className="h-4 w-4 mb-1" />
                  Encargado de Unidad*
                </Label>
                <Input
                  id="leader"
                  type="text"
                  placeholder="Nombre del responsable"
                  required
                />
              </div>
            </div>

            {/* Sección de Credenciales */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                Credenciales de Acceso
              </h2>
              
              <div>
                <Label htmlFor="username">Usuario Institucional*</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Ej. PC-QUERETARO-001"
                  required
                  pattern="PC-[A-Z]+-[0-9]{3}"
                  title="Formato: PC-CIUDAD-NÚMERO (ej. PC-QUERETARO-001)"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Contraseña*</Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Crea tu contraseña institucional" 
                  icon={Eye} 
                  iconPosition="right" 
                  required
                />
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Mínimo 12 caracteres</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Requerido: Mayúsculas, números y símbolos</span>
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
                Certifico que toda la información proporcionada es correcta y autorizo el uso de este sistema conforme a los <Link href="/terms" className="text-primary hover:underline">protocolos institucionales</Link>.
              </label>
            </div>

            <Button type="submit" className="w-full bg-vtblue hover:bg-vtblue/90 mt-6 py-6 text-lg">
              Registrar Unidad
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-4">
            ¿Ya tienes una cuenta institucional?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Acceso para personal autorizado
            </Link>
          </div>
        </div>
      </div>

      {/* Sección derecha - Información */}
      <div className="hidden md:flex md:w-1/2 bg-vtdarkblue flex-col items-center justify-center p-12 text-white">
        <div className="max-w-2xl space-y-8">
          <h1 className="text-4xl font-bold">Coordinación Operativa</h1>
          
          <p className="text-lg leading-relaxed">
            El registro de unidades en Vigilante permite una coordinación en tiempo real entre
            Protección Civil, servicios médicos y cuerpos de seguridad para una respuesta
            más efectiva en situaciones de emergencia.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { 
                icon: Bus, 
                title: "Movilidad", 
                desc: "Geolocalización de unidades en tiempo real" 
              },
              { 
                icon: Shield, 
                title: "Seguridad", 
                desc: "Comunicación cifrada punto a punto" 
              },
              { 
                icon: User, 
                title: "Control", 
                desc: "Gestión centralizada de recursos" 
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <item.icon className="h-6 w-6" />
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