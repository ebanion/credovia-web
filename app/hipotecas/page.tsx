import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Calculator,
  FileText,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Users,
  ArrowLeft,
  Phone,
  Mail
} from "lucide-react"

export default function HipotecasPage() {
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
              <Link href="/hipotecas" className="text-blue-600 font-medium">Hipotecas</Link>
              <Link href="/prestamos" className="text-gray-700 hover:text-gray-900">Préstamos</Link>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900">Blog</Link>
              <Link href="/#contacto" className="text-gray-700 hover:text-gray-900">Contacto</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hipotecas a tu medida
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Encuentra la hipoteca perfecta para tu nueva vivienda. Comparamos las mejores ofertas del mercado para conseguirte las condiciones más ventajosas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Calculator className="mr-2 h-5 w-5" />
                Simular hipoteca
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="mr-2 h-5 w-5" />
                Hablar con experto
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Hipotecas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tipos de Hipotecas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos diferentes tipos de hipotecas adaptadas a tus necesidades y perfil financiero
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Hipoteca Fija</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Tipo de interés fijo durante toda la vida del préstamo. Cuotas estables y predecibles.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Desde 1,45% TIN
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Sin sorpresas en las cuotas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Ideal para planificación a largo plazo
                  </li>
                </ul>
                <Badge className="mt-4 bg-blue-100 text-blue-800">Más popular</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Hipoteca Variable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Tipo de interés que varía según el índice de referencia (Euríbor). Cuotas que se adaptan al mercado.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Euríbor + diferencial desde 0,85%
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Puede beneficiarte si bajan los tipos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Mayor flexibilidad
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Hipoteca Mixta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Combina un período inicial a tipo fijo con un período posterior a tipo variable.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Primeros años a tipo fijo
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Después variable con Euríbor
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Lo mejor de ambos mundos
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
                Requisitos para obtener una hipoteca
              </h2>
              <p className="text-gray-600 mb-8">
                Te ayudamos a cumplir todos los requisitos necesarios para conseguir la aprobación de tu hipoteca.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Ingresos demostrables</h3>
                    <p className="text-gray-600">Nóminas, declaración de la renta o ingresos como autónomo de los últimos 2 años.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Home className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Entrada del 20%</h3>
                    <p className="text-gray-600">Generalmente necesitas aportar al menos el 20% del valor de la vivienda como entrada.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Documentación completa</h3>
                    <p className="text-gray-600">DNI, escrituras de la vivienda, tasación oficial y documentos bancarios.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Solvencia financiera</h3>
                    <p className="text-gray-600">Historial crediticio limpio y capacidad de pago demostrable.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">¿Necesitas ayuda?</h3>
              <p className="text-gray-600 mb-6">
                Nuestros expertos te guiarán en todo el proceso y te ayudarán a preparar toda la documentación necesaria.
              </p>
              <div className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Phone className="mr-2 h-4 w-4" />
                  Contactar con experto
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Solicitar información
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir Credovia?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Más de 10 años de experiencia nos avalan como especialistas en hipotecas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sin comisiones</h3>
              <p className="text-gray-600 text-sm">0% comisiones de apertura, estudio y cancelación anticipada</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mejores tipos</h3>
              <p className="text-gray-600 text-sm">Conseguimos los tipos de interés más competitivos del mercado</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Proceso rápido</h3>
              <p className="text-gray-600 text-sm">Aprobación en 48-72 horas con toda la documentación</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Asesoramiento</h3>
              <p className="text-gray-600 text-sm">Equipo de expertos que te acompañan durante todo el proceso</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para conseguir tu hipoteca?</h2>
          <p className="text-xl mb-8 opacity-90">
            Simula tu hipoteca en menos de 5 minutos y descubre cuánto puedes ahorrar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Calculator className="mr-2 h-5 w-5" />
              Simular hipoteca gratis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Phone className="mr-2 h-5 w-5" />
              Llamar ahora: +34 653446692
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}