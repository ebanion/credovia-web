import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowLeft,
  Calculator,
  FileText,
  TrendingUp,
  Shield,
  Users
} from "lucide-react"

export default function HipotecasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 font-sans px-0 shadow-none">
                Credovia
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/hipotecas" className="text-blue-600 hover:text-blue-700 font-medium">Hipotecas</Link>
              <Link href="/prestamos" className="text-gray-700 hover:text-gray-900">Préstamos</Link>
              <Link href="/#contacto" className="text-gray-700 hover:text-gray-900">Contacto</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Hipotecas</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Guía real para conseguir tu hipoteca con pocos recursos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sabemos que conseguir una hipoteca puede parecer imposible cuando tienes pocos ahorros o eres joven. 
            Pero no te desanimes: con la estrategia correcta y los consejos adecuados, es posible. 
            Aquí te contamos todo lo que necesitas saber, sin rodeos ni promesas vacías.
          </p>
        </div>

        {/* Tips Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            Tips reales y prácticos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Aprovecha programas de ayuda autonómicos
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Cada comunidad autónoma tiene programas específicos para jóvenes y familias. 
                      En Madrid existe el Plan Vive, en Cataluña el Plan de Vivienda Joven. 
                      Investiga qué ayudas hay en tu región: pueden cubrir hasta el 20% del precio.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <Calculator className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Bancos que financian 90%-100%
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      ING, Openbank y algunas cajas rurales ofrecen financiación del 95-100% 
                      para perfiles solventes. Eso sí, exigen nóminas altas, contratos indefinidos 
                      y un scoring impecable. También considera la banca ética como Triodos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Mejora tu scoring financiero
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      6 meses antes de pedir la hipoteca: paga todas las deudas pendientes, 
                      no uses más del 30% del límite de tu tarjeta de crédito, 
                      mantén cuentas estables y evita cambiar de banco. Tu historial crediticio es clave.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Estabilidad laboral y justificación de ingresos
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Los bancos valoran contratos indefinidos de al menos 1 año. 
                      Si eres autónomo, presenta 2 años de declaraciones consecutivas con ingresos crecientes. 
                      Incluye ingresos extra demostrables: alquileres, freelance, etc.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documentation Section */}
          <div className="mt-12 bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              Documentación ideal a presentar
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Documentos básicos:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />DNI y último empadronamiento</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />3 últimas nóminas y contrato laboral</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Declaración de la renta (2 años)</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Extractos bancarios (6 meses)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Documentos extra que suman:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Certificado de vida laboral</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Justificantes de ingresos adicionales</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Informe de solvencia de ASNEF</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Aval familiar (si es posible)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Success Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <MessageCircle className="w-8 h-8 text-blue-600 mr-3" />
            Historia real de éxito
          </h2>
          
          <Card className="border-l-4 border-l-blue-600 bg-blue-50">
            <CardContent className="p-8">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    María, 29 años - Administrativa en Madrid
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>
                      <strong>Situación inicial:</strong> María tenía solo 15.000€ ahorrados para una vivienda de 180.000€. 
                      Trabajaba como administrativa con un sueldo de 1.800€ netos mensuales y un contrato indefinido de 2 años.
                    </p>
                    <p>
                      <strong>La estrategia:</strong> Logró una hipoteca del 95% (171.000€) gracias a tres factores clave: 
                      demostró ingresos estables durante 24 meses consecutivos, sus padres aportaron una vivienda como aval adicional, 
                      y presentó un informe de solvencia impecable sin deudas pendientes.
                    </p>
                    <p>
                      <strong>El resultado:</strong> Consiguió financiación con Openbank al 3,2% TIN a 30 años. 
                      Su cuota mensual es de 740€ (41% de sus ingresos netos). Compró su piso en Getafe y ahora paga menos que un alquiler equivalente.
                    </p>
                  </div>
                  <Badge className="mt-4 bg-green-100 text-green-800 hover:bg-green-100">
                    ✅ Caso real verificado
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para conseguir tu hipoteca?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Usa nuestro simulador gratuito y descubre qué opciones tienes disponibles
          </p>
          <Link href="/simulador">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Calculator className="w-5 h-5 mr-2" />
              Simula tu hipoteca ahora
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Credovia</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +34 653446692</div>
                <div className="flex items-center"><Mail className="w-4 h-4 mr-2" /> info@credovia.com</div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Madrid, España</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex justify-between items-center">
            <p className="text-sm text-gray-400">© 2024 Credovia. Todos los derechos reservados.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="text-gray-400 hover:text-white"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="text-gray-400 hover:text-white"><Linkedin className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}