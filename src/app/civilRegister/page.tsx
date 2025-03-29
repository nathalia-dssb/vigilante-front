'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, Shield, Bus, User, PointOnMap, BillList, CheckCircle } from "@solar-icons/react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCivilCorps } from "@/hooks/useCivilCorps"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CivilProtectionRegister() {
  const { createCivilCorps, loading, error } = useCivilCorps()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    matricula: '',
    tipo_vehiculo: '',
    encargado: '',
    zona: '',
    user: '',
    contrasena: '',
    confirmPassword: ''
  })

  const [passwordMatch, setPasswordMatch] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar que las contraseñas coincidan
    if (formData.contrasena !== formData.confirmPassword) {
      setPasswordMatch(false)
      toast.error('Las contraseñas no coinciden')
      return
    }
    setPasswordMatch(true)

    // Validar fortaleza de contraseña
    if (!isPasswordStrong(formData.contrasena)) {
      setPasswordValid(false)
      toast.error('La contraseña no cumple con los requisitos de seguridad')
      return
    }
    setPasswordValid(true)

    try {
      // Crear el objeto para la API
      const memberData = {
        matricula: formData.matricula.toUpperCase(),
        tipo_vehiculo: formData.tipo_vehiculo,
        encargado: formData.encargado,
        zona: formData.zona,
        user: formData.user.toUpperCase(),
        contrasena: formData.contrasena
      }

      const result = await createCivilCorps(memberData)
      
      if (result) {
        toast.success('Unidad registrada con éxito!')
        router.push('/dashboard')
      }
    } catch (err) {
      toast.error('Error al registrar la unidad. Por favor intenta nuevamente')
      console.error('Registration error:', err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isPasswordStrong = (password: string) => {
    // Mínimo 12 caracteres, al menos 1 mayúscula, 1 número y 1 símbolo
    const strongRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/
    return strongRegex.test(password)
  }

  return (
    <div className="min-h-screen flex pt-20">
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

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Sección de Información de la Unidad */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2 flex items-center gap-2">
                <Bus className="h-5 w-5" />
                Datos de la Unidad
              </h2>
              
              <div>
                <Label htmlFor="matricula" className="flex items-center gap-2">
                  <BillList className="h-4 w-4 mb-1" />
                  Matrícula Vehicular*
                </Label>
                <Input
                  id="matricula"
                  name="matricula"
                  type="text"
                  placeholder="Ej. ABC-1234"
                  value={formData.matricula}
                  onChange={handleChange}
                  required
                  pattern="[A-Z]{3}-[0-9]{4}"
                  title="Formato: Tres letras mayúsculas, guión y cuatro números"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zona" className="flex items-center gap-2">
                    <PointOnMap className="h-4 w-4 mb-1" />
                    Zona de Operación*
                  </Label>
                  <Select 
                    required
                    onValueChange={(value) => handleSelectChange('zona', value)}
                    value={formData.zona}
                  >
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
                  <Label htmlFor="tipo_vehiculo" className="flex items-center gap-2">
                    <Shield className="h-4 w-4 mb-1" />
                    Tipo de Unidad*
                  </Label>
                  <Select 
                    required
                    onValueChange={(value) => handleSelectChange('tipo_vehiculo', value)}
                    value={formData.tipo_vehiculo}
                  >
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
                <Label htmlFor="encargado" className="flex items-center gap-2">
                  <User className="h-4 w-4 mb-1" />
                  Encargado de Unidad*
                </Label>
                <Input
                  id="encargado"
                  name="encargado"
                  type="text"
                  placeholder="Nombre del responsable"
                  value={formData.encargado}
                  onChange={handleChange}
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
                <Label htmlFor="user">Usuario Institucional*</Label>
                <Input
                  id="user"
                  name="user"
                  type="text"
                  placeholder="Ej. PC-QUERETARO-001"
                  value={formData.user}
                  onChange={handleChange}
                  required
                  pattern="PC-[A-Z]+-[0-9]{3}"
                  title="Formato: PC-CIUDAD-NÚMERO (ej. PC-QUERETARO-001)"
                />
              </div>
              
              <div>
                <Label htmlFor="contrasena">Contraseña*</Label>
                <Input 
                  id="contrasena"
                  name="contrasena"
                  type="password" 
                  placeholder="Crea tu contraseña institucional" 
                  icon={Eye} 
                  iconPosition="right" 
                  value={formData.contrasena}
                  onChange={handleChange}
                  required
                  className={!passwordValid ? 'border-red-500' : ''}
                />
                <div className="mt-2 space-y-2">
                  <div className={`flex items-center text-sm ${passwordValid ? 'text-gray-600 dark:text-gray-400' : 'text-red-500'}`}>
                    <CheckCircle className={`h-4 w-4 ${passwordValid ? 'text-green-500' : 'text-red-500'} mr-2`} />
                    <span>Mínimo 12 caracteres</span>
                  </div>
                  <div className={`flex items-center text-sm ${passwordValid ? 'text-gray-600 dark:text-gray-400' : 'text-red-500'}`}>
                    <CheckCircle className={`h-4 w-4 ${passwordValid ? 'text-green-500' : 'text-red-500'} mr-2`} />
                    <span>Requerido: Mayúsculas, números y símbolos</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar contraseña*</Label>
                <Input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password" 
                  placeholder="Repite tu contraseña" 
                  icon={Eye} 
                  iconPosition="right" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={!passwordMatch ? 'border-red-500' : ''}
                />
                {!passwordMatch && (
                  <p className="mt-1 text-sm text-red-600">Las contraseñas no coinciden</p>
                )}
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

            <Button 
              type="submit" 
              className="w-full bg-vtblue hover:bg-vtblue/90 mt-6 py-6 text-lg"
              disabled={loading}
            >
              {loading ? 'Registrando Unidad...' : 'Registrar Unidad'}
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