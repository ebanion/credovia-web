import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
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
  Users,
  AlertTriangle,
  Search,
  CreditCard,
  Home,
  Car,
  Wrench
} from "lucide-react"

export default function PrestamosPage() {
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
              <Link href="/hipotecas" className="text-gray-700 hover:text-gray-900">Hipotecas</Link>
              <Link href="/prestamos" className="text-blue-600 hover:text-blue-700 font-medium">Préstamos</Link>
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
            <span className="text-gray-900 font-medium">Préstamos</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Cómo conseguir un préstamo sin morir en el intento
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conseguir un préstamo no tiene por qué ser una pesadilla. Con la información correcta, 
            la documentación adecuada y conociendo las mejores estrategias, puedes obtener la financiación 
            que necesitas en condiciones justas. Te contamos todo lo que debes saber.
          </p>
        </div>

        {/* Loan Types Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
            Qué tipo de préstamo te conviene según tu perfil
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 p-4 rounded-lg mx-auto w-fit mb-4">
                  <CreditCard className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Préstamo Personal
                </h3>
                <p className="text-gray-600 mb-4">
                  Ideal para gastos imprevistos, vacaciones o pequeñas reformas. 
                  Sin garantías, hasta 60.000€.
                </p>
                <Badge className="bg-green-100 text-green-800">
                  TIN desde 4,95%
                </Badge>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 p-4 rounded-lg mx-auto w-fit mb-4">
                  <Car className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Préstamo Coche
                </h3>
                <p className="text-gray-600 mb-4">
                  Para comprar vehículo nuevo o usado. El coche queda como garantía, 
                  mejores condiciones.
                </p>
                <Badge className="bg-blue-100 text-blue-800">
                  TIN desde 3,99%
                </Badge>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-orange-100 p-4 rounded-lg mx-auto w-fit mb-4">
                  <Wrench className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Préstamo Reforma
                </h3>
                <p className="text-gray-600 mb-4">
                  Para obras y mejoras del hogar. Importes más altos y plazos 
                  más largos disponibles.
                </p>
                <Badge className="bg-orange-100 text-orange-800">
                  TIN desde 4,50%
                </Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            Consejos útiles para conseguir tu préstamo
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Cómo negociar con el banco
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      No aceptes la primera oferta. Negocia el tipo de interés, 
                      comisiones y seguros vinculados. Si tienes nómina domiciliada 
                      o productos contratados, úsalo como palanca.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Pide varias ofertas simultáneamente</li>
                      <li>• Negocia la comisión de apertura</li>
                      <li>• Revisa los seguros obligatorios</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Documentos que necesitas sí o sí
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      Prepara toda la documentación antes de solicitar. 
                      Un expediente completo acelera la aprobación y mejora las condiciones.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• DNI y justificante de ingresos</li>
                      <li>• 3 últimas nóminas o declaraciones</li>
                      <li>• Extractos bancarios (3-6 meses)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Qué evitar: trampas comunes
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      Huye de los préstamos rápidos con intereses abusivos, 
                      las cláusulas de vencimiento anticipado y los seguros innecesarios.
                    </p>
                    <ul className="text-sm text-red-600 space-y-1">
                      <li>• TAE superior al 20%</li>
                      <li>• Comisiones ocultas</li>
                      <li>• Presión para firmar rápido</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Search className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Comparadores útiles online
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      Usa comparadores independientes para encontrar las mejores ofertas. 
                      Compara TAE, no solo el tipo de interés nominal.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• HelpMyCash, Kelisto, Rastreator</li>
                      <li>• Compara TAE y condiciones</li>
                      <li>• Lee opiniones de otros usuarios</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Points Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 text-blue-600 mr-3" />
              Puntos clave antes de firmar
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">✅ Revisa siempre:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />TAE real (incluye todas las comisiones)</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />Cuota mensual y capacidad de pago</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />Posibilidad de amortización anticipada</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />Seguros vinculados (¿son obligatorios?)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">⚠️ Señales de alarma:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start"><AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />No te dan información por escrito</li>
                  <li className="flex items-start"><AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />Presión para firmar "hoy mismo"</li>
                  <li className="flex items-start"><AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />TAE muy superior a la competencia</li>
                  <li className="flex items-start"><AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />Comisiones excesivas o poco claras</li>
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
          
          <Card className="border-l-4 border-l-green-600 bg-green-50">
            <CardContent className="p-8">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-6">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Javier, freelance en Barcelona - Préstamo reforma
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>
                      <strong>Situación inicial:</strong> Javier necesitaba 15.000€ para reformar completamente 
                      su casa. Como freelance, sus ingresos variaban mes a mes, lo que complicaba conseguir financiación.
                    </p>
                    <p>
                      <strong>La estrategia:</strong> Recopiló 12 meses de facturas e ingresos para demostrar 
                      una media estable de 2.200€ mensuales. Su gestoría le ayudó a preparar un informe detallado 
                      de ingresos recurrentes y proyecciones futuras con contratos ya firmados.
                    </p>
                    <p>
                      <strong>El resultado:</strong> Logró un préstamo de 15.000€ al 6% TIN sin necesidad de aval 
                      en Sabadell. La cuota mensual es de 166€ a 10 años. La reforma aumentó el valor de su vivienda 
                      en 25.000€, una inversión muy rentable.
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
        <section className="text-center bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas un préstamo?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Calcula tu cuota mensual y compara las mejores ofertas del mercado
          </p>
          <Link href="/simulador">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Calculator className="w-5 h-5 mr-2" />
              Haz tu simulación de préstamo
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