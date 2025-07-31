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
              <Link href="/hipotecas" className="text-gray-700 hover:text-gray-900 text-center">Hipotecas</Link>
              <Link href="/prestamos" className="text-gray-700 hover:text-gray-900">Préstamos</Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">Blog</Link>
              <Link href="#contacto" className="text-gray-700 hover:text-gray-900">Contacto</Link>
            </nav>
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
            <Link href="/simulador" passHref>
              <Button
                variant="destructive"
                size="lg"
                className="hover:bg-blue-700 px-8 py-3 text-black bg-white font-extrabold"
              >
                Simula tu hipoteca
              </Button>
            </Link>
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

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Qué piensan nuestros clientes?</h2>
            <p className="text-gray-600">Lee algunos de los testimonios de nuestros clientes satisfechos</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Badge variant="secondary" className="ml-2">Google</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">"Opinión de cliente satisfecho número {i + 1}"</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {["M", "J", "A"][i]}
                    </div>
                    <span className="ml-2 text-sm font-medium">{["María", "Juan", "Ana"][i]}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">Ver todas las reseñas</Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 bg-white">
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
                <div className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +34 653446692</div>
                <div className="flex items-center"><Mail className="w-4 h-4 mr-2" /> info@credovia.com</div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Madrid, España</div>
              </div>
            </div>
            {/* Más secciones de footer... */}
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

