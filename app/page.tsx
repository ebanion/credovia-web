import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Calculator,
  FileText,
  Star,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react"

export default function MejotecaLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900 font-sans px-0 shadow-none">Credovia</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#" className="text-gray-700 hover:text-gray-900 text-center">
                Hipotecas
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                Préstamos
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                Blog
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                Contacto
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-900">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Business professionals"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center bg-orange-400">
          <div className="text-center text-white max-w-3xl mx-auto font-sans">
            <h1 className="text-6xl md:text-8xl font-light mb-6">Your partner in life.</h1>
            <h2 className="text-2xl md:text-3xl mb-8 font-light">
              Mientras tu buscas casa, nosotros buscamos tu hipoteca
            </h2>
            <p className="mb-8 opacity-90 tracking-normal text-2xl font-light">
              Combinas la experiencia de más de 10 años con la Inteligencia artificial para encontrar la mejor opción.
            </p>
            <Button
              variant="destructive"
              size="lg"
              className="hover:bg-blue-700 px-8 py-3 text-black bg-white font-extrabold"
            >
              Simula tu hipoteca
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Hasta el 100% financiado</h3>
                <p className="text-gray-600 text-sm">Financiamos hasta el 100% del valor de tasación de tu vivienda</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Interés fijo desde 1,45% TIN</h3>
                <p className="text-gray-600 text-sm">Ofrecemos los mejores tipos de interés del mercado</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-800" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Hipotecas con 0% comisiones</h3>
                <p className="text-gray-600 text-sm">Sin comisiones de apertura, estudio o cancelación anticipada</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Qué piensan nuestros clientes?</h2>
            <p className="text-gray-600">Lee algunos de los testimonios de nuestros clientes satisfechos</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    Google
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  "Excelente servicio, me ayudaron a conseguir la mejor hipoteca del mercado"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    M
                  </div>
                  <span className="ml-2 text-sm font-medium">María García</span>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    Google
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  "Proceso muy rápido y transparente. Totalmente recomendable"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    J
                  </div>
                  <span className="ml-2 text-sm font-medium">Juan López</span>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    Google
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">"Me ahorraron mucho tiempo y dinero. Muy profesionales"</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    A
                  </div>
                  <span className="ml-2 text-sm font-medium">Ana Martín</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">Ver todas las reseñas</Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-orange-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-orange-400">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4 font-extrabold text-4xl">Visita nuestro Blog</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Happy family"
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <Badge className="mb-2">HIPOTECA</Badge>
                <h3 className="font-semibold text-sm mb-2">
                  HIPOTECA 100%: Qué es y cómo obtener la financiación completa
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  Te contamos todo lo que necesitas saber sobre las hipotecas al 100%
                </p>
                <p className="text-xs text-gray-500">Hace 2 días</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Young couple celebrating"
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <Badge className="mb-2">HIPOTECA</Badge>
                <h3 className="font-semibold text-sm mb-2">EURIBOR: Qué es y cómo afecta a tu hipoteca variable</h3>
                <p className="text-xs text-gray-600 mb-3">Descubre cómo el Euribor influye en tu cuota mensual</p>
                <p className="text-xs text-gray-500">Hace 5 días</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Family with house keys"
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <Badge className="mb-2">HIPOTECA</Badge>
                <h3 className="font-semibold text-sm mb-2">¿CÓMO AFECTA EL VALOR DE TASACIÓN A TU HIPOTECA?</h3>
                <p className="text-xs text-gray-600 mb-3">La importancia de la tasación en tu proceso hipotecario</p>
                <p className="text-xs text-gray-500">Hace 1 semana</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Young professionals with documents"
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <Badge className="mb-2">HIPOTECA</Badge>
                <h3 className="font-semibold text-sm mb-2">CÓMO Y CUÁNDO pedir una subrogación de hipoteca</h3>
                <p className="text-xs text-gray-600 mb-3">Todo sobre el cambio de banco en tu hipoteca</p>
                <p className="text-xs text-gray-500">Hace 2 semanas</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-white hover:bg-white hover:text-slate-700 bg-transparent text-black"
            >
              Ver más
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-black">¿Quieres contactar con nosotros?</h2>
            <p className="opacity-90 text-black">
              Estamos aquí para ayudarte con cualquier duda que tengas sobre hipotecas
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <Button className="hover:bg-gray-100 text-black bg-slate-400">
              <Phone className="w-4 h-4 mr-2" />
              +34 653446692
            </Button>
            <Button
              variant="outline"
              className="border-white hover:bg-white hover:text-blue-600 text-black bg-slate-400"
            >
              Escríbenos un WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Credovia</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +34 653446692
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@credovia.com
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Madrid, España
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Productos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Hipotecas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Préstamos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Seguros
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Términos y condiciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex justify-between items-center">
            <p className="text-sm text-gray-400">© 2024 Credovia. Todos los derechos reservados.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </Link>
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
