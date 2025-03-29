'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, Shield, User, HeartPulse, CheckCircle } from "@solar-icons/react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCitizens } from "@/hooks/useCitizens"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function UserRegister() {
  const { createCitizen, loading, error } = useCitizens()
  const router = useRouter()
  
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    curp: '',
    fecha_nacimiento: '',
    sexo: '',
    domicilio: {
      calle: '',
      codigo_postal: '',
      estado: '',
      municipio: '',
      colonia: ''
    },
    correo: '',
    telefono: '',
    contrasena: '',
    confirmPassword: ''
  })

  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      domicilio: {
        ...prev.domicilio,
        [name]: value
      }
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar que las contraseñas coincidan
    if (formData.contrasena !== formData.confirmPassword) {
      setPasswordMatch(false)
      toast.error('Las contraseñas no coinciden')
      return
    }
    setPasswordMatch(true)

    try {
      // Crear el objeto ciudadano para la API
      const citizenData = {
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        curp: formData.curp.toUpperCase(),
        fecha_nacimiento: new Date(formData.fecha_nacimiento),
        sexo: formData.sexo === 'male' ? 'H' : 'M', // Convertir a H/M
        domicilio: {
          calle: formData.domicilio.calle,
          codigo_postal: parseInt(formData.domicilio.codigo_postal),
          estado: formData.domicilio.estado,
          municipio: formData.domicilio.municipio,
          colonia: formData.domicilio.colonia
        },
        correo: formData.correo,
        telefono: formData.telefono,
        contrasena: formData.contrasena
      }

      const result = await createCitizen(citizenData)
      
      if (result) {
        toast.success('Registro exitoso! Bienvenido a Vigilante')
        router.push('/dashboard') // Redirigir al dashboard después del registro
      }
    } catch (err) {
      toast.error('Error al registrar. Por favor intenta nuevamente')
      console.error('Registration error:', err)
    }
  }

  return (
    <div className="min-h-screen flex pt-18">
      {/* Sección izquierda - Formulario */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center p-8 overflow-y-auto">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Completa tu registro</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Por favor proporciona la siguiente información para continuar</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Sección de Información Personal */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Información personal</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre(s)*</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Ej. Juan"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="apellidos">Apellidos*</Label>
                  <Input
                    id="apellidos"
                    name="apellidos"
                    type="text"
                    placeholder="Ej. Pérez López"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="curp">CURP*</Label>
                <Input
                  id="curp"
                  name="curp"
                  type="text"
                  placeholder="Ej. PELJ920313HDFLPN01"
                  pattern="[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9A-Z]{2}"
                  title="Formato: 4 letras, 6 números, 6 letras, 2 alfanuméricos"
                  value={formData.curp}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fecha_nacimiento">Fecha de nacimiento*</Label>
                  <Input
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    type="date"
                    value={formData.fecha_nacimiento}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sexo">Sexo*</Label>
                  <Select 
                    required
                    onValueChange={(value) => handleSelectChange('sexo', value)}
                    value={formData.sexo}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Sección de Domicilio */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Domicilio</h2>
              
              <div>
                <Label htmlFor="calle">Calle y número*</Label>
                <Input
                  id="calle"
                  name="calle"
                  type="text"
                  placeholder="Ej. Av. Principal #123"
                  value={formData.domicilio.calle}
                  onChange={handleAddressChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="codigo_postal">Código Postal*</Label>
                  <Input
                    id="codigo_postal"
                    name="codigo_postal"
                    type="text"
                    placeholder="Ej. 12345"
                    pattern="[0-9]{5}"
                    value={formData.domicilio.codigo_postal}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="estado">Estado*</Label>
                  <Select 
                    required
                    onValueChange={(value) => handleAddressChange({
                      target: { name: 'estado', value }
                    } as React.ChangeEvent<HTMLInputElement>)}
                    value={formData.domicilio.estado}
                  >
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
                  <Label htmlFor="municipio">Ciudad/Municipio*</Label>
                  <Input
                    id="municipio"
                    name="municipio"
                    type="text"
                    placeholder="Ej. Ciudad de México"
                    value={formData.domicilio.municipio}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="colonia">Colonia*</Label>
                  <Input
                    id="colonia"
                    name="colonia"
                    type="text"
                    placeholder="Ej. Centro"
                    value={formData.domicilio.colonia}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sección de Credenciales */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Credenciales de acceso</h2>
              
              <div>
                <Label htmlFor="correo">Correo electrónico*</Label>
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="telefono">Teléfono*</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ej. 5512345678"
                  pattern="[0-9]{10}"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contrasena">Contraseña*</Label>
                <Input 
                  id="contrasena"
                  name="contrasena"
                  type="password" 
                  placeholder="Crea tu contraseña" 
                  icon={Eye} 
                  iconPosition="right" 
                  value={formData.contrasena}
                  onChange={handleChange}
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
                Acepto los <Link href="/terms" className="text-primary hover:underline">Términos de servicio</Link>, la <Link href="/privacy" className="text-primary hover:underline">Política de privacidad</Link> y autorizo el uso de mis datos conforme a la <Link href="/legal" className="text-primary hover:underline">Ley de Protección de Datos</Link>.
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-vtdarkblue hover:bg-vtdarkblue/90 mt-6"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Completar registro'}
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