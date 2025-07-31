import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  Calculator,
  FileText,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Users,
  ArrowLeft,
  Phone,
  Mail,
  Car,
  GraduationCap,
  Home,
  Briefcase
} from "lucide-react"

export default function PrestamosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mr-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Link>
              <span className="text-2xl font-bold text-gray-900 font-sans">Credovia</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/hipotecas" className="text-gray-700 hover:text-gray-900">Hipotecas</Link>
              <Link href="/prestamos" className="text-blue-600 font-medium">Préstamos</Link>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900">Blog</Link>
              <Link href="/#contacto" className="text-gray-700 hover:text-gray-900">Contacto</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Préstamos personales
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Financiación rápida y flexible para todos tus proyectos. Desde 3.000€ hasta 60.000€ con las mejores condiciones del mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Calculator className="mr-2 h-5 w-5" />
                Calcular préstamo
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                <Phone className="mr-2 h-5 w-5" />
                Hablar con experto
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Préstamos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tipos de Préstamos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos diferentes tipos de préstamos adaptados a tus necesidades específicas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Préstamo Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Para cualquier proyecto personal sin necesidad de justificar el destino.
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    Desde 3.000€ hasta 60.000€
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    TIN desde 4,95%
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    Hasta 8 años de plazo
                  </li>
                </ul>
                <Badge className="mt-3 bg-blue-100 text-blue-800">Más solicitado</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Car className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Préstamo Coche</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Financiación específica para la compra de vehículos nuevos y de segunda mano.
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    Hasta 100% del valor
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    TIN desde 3,95%
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    Hasta 10 años de plazo
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Home className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Préstamo Reforma</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Para reformas y mejoras en tu vivienda habitual o segunda residencia.
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    Hasta 75.000€
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    TIN desde 4,50%
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    Hasta 10 años de plazo
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Préstamo Estudios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Financiación para estudios universitarios, másters y formación profesional.
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    Hasta 50.000€
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    TIN desde 3,75%
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    Carencia opcional
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requisitos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Requisitos para obtener un préstamo
              </h2>
              <p className="text-gray-600 mb-8">
                Proceso simple y rápido. Te ayudamos a conseguir la aprobación de tu préstamo en el menor tiempo posible.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Ser mayor de edad</h3>
                    <p className="text-gray-600">Tener entre 18 y 75 años y residencia legal en España.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Briefcase className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Ingresos regulares</h3>
                    <p className="text-gray-600">Demostrar ingresos mínimos de 600€ mensuales netos.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Documentación básica</h3>
                    <p className="text-gray-600">DNI, últimas 3 nóminas y extractos bancarios de los últimos 3 meses.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Buen historial crediticio</h3>
                    <p className="text-gray-600">No aparecer en ficheros de morosidad (ASNEF, RAI, etc.).</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Solicita tu préstamo</h3>
              <p className="text-gray-600 mb-6">
                Respuesta inmediata y dinero en tu cuenta en 24-48 horas.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium">Importe</span>
                  <span className="text-sm text-gray-600">3.000€ - 60.000€</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium">Plazo</span>
                  <span className="text-sm text-gray-600">12 - 96 meses</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium">TIN desde</span>
                  <span className="text-sm text-gray-600">3,75%</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Calculator className="mr-2 h-4 w-4" />
                  Solicitar préstamo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Proceso simple en 4 pasos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Desde la solicitud hasta el dinero en tu cuenta en tiempo récord
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Solicita online</h3>
              <p className="text-gray-600 text-sm">Rellena el formulario en 2 minutos con tus datos básicos</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Respuesta inmediata</h3>
              <p className="text-gray-600 text-sm">Conoce tu aprobación provisional al instante</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Envía documentos</h3>
              <p className="text-gray-600 text-sm">Sube la documentación de forma segura desde tu móvil</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Recibe el dinero</h3>
              <p className="text-gray-600 text-sm">Transferencia inmediata a tu cuenta bancaria</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir nuestros préstamos?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Las mejores condiciones del mercado con la confianza de más de 10 años de experiencia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Respuesta rápida</h3>
              <p className="text-gray-600 text-sm">Aprobación en minutos y dinero en 24-48 horas</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mejores tipos</h3>
              <p className="text-gray-600 text-sm">TIN desde 3,75% con las condiciones más competitivas</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sin comisiones</h3>
              <p className="text-gray-600 text-sm">0% comisiones de apertura, estudio y cancelación</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Atención personalizada</h3>
              <p className="text-gray-600 text-sm">Equipo de especialistas a tu disposición</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas financiación?</h2>
          <p className="text-xl mb-8 opacity-90">
            Solicita tu préstamo en 2 minutos y recibe el dinero en 24-48 horas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Calculator className="mr-2 h-5 w-5" />
              Solicitar préstamo
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Phone className="mr-2 h-5 w-5" />
              Llamar ahora: +34 653446692
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}