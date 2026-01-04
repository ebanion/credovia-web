import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MortgageRequestForm from "@/components/mortgage-request-form"
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
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-3xl font-extrabold text-emerald-600 font-sans tracking-tight">Credovia</span>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
               <div className="flex items-center text-slate-600 font-medium">
                  <Phone className="w-5 h-5 mr-2 text-emerald-600" />
                  <span>Llámanos gratis: </span>
                  <span className="ml-1 text-slate-900 font-bold">900 123 456</span>
               </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Embedded Form */}
      <section className="relative bg-slate-50 pb-20 pt-10">
        <div className="absolute inset-0 z-0">
           {/* Background decorative elements */}
           <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-emerald-50 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              La mejor hipoteca <span className="text-emerald-600">para ti</span>
            </h1>
            <p className="text-xl text-slate-600">
              Comparamos todas las hipotecas del mercado y negociamos por ti para conseguirte las mejores condiciones. Gratis y sin compromiso.
            </p>
          </div>
          
          {/* Main Wizard Form - Directly embedded */}
          <div className="mt-8">
             <MortgageRequestForm />
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-80">
             <div>
                <p className="text-3xl font-bold text-emerald-700">+100</p>
                <p className="text-slate-600">Bancos asociados</p>
             </div>
             <div>
                <p className="text-3xl font-bold text-emerald-700">100%</p>
                <p className="text-slate-600">Gratuito</p>
             </div>
             <div>
                <p className="text-3xl font-bold text-emerald-700">24h</p>
                <p className="text-slate-600">Respuesta rápida</p>
             </div>
             <div>
                <p className="text-3xl font-bold text-emerald-700">4.9/5</p>
                <p className="text-slate-600">Valoración clientes</p>
             </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Por qué elegir Credovia?</h2>
             <p className="text-slate-600 max-w-2xl mx-auto">Nos encargamos de todo el proceso para que tú solo tengas que preocuparte de elegir la casa de tus sueños.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-xl hover:shadow-2xl transition-shadow bg-slate-50">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Home className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Hasta el 100% financiado</h3>
                <p className="text-slate-600">Conseguimos financiar hasta el 100% del valor de tasación de tu vivienda, incluyendo gastos.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-xl hover:shadow-2xl transition-shadow bg-slate-50">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Calculator className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">El interés más bajo</h3>
                <p className="text-slate-600">Negociamos con los bancos para ofrecerte tipos de interés preferentes que no encontrarás en sucursal.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-xl hover:shadow-2xl transition-shadow bg-slate-50">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <FileText className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Sin comisiones</h3>
                <p className="text-slate-600">Nuestro servicio es gratuito para ti. Sin comisiones de apertura, estudio o cancelación.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
            <div className="flex justify-center items-center gap-2 mb-4">
               <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-current" />
                  ))}
               </div>
               <span className="font-semibold text-lg">4.9/5 en Google Reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-8 bg-emerald-800 border-0 text-white shadow-none">
                <CardContent className="pt-0">
                  <p className="text-emerald-100 mb-6 italic text-lg leading-relaxed">
                    "Gracias a Credovia conseguí una hipoteca con unas condiciones increíbles que mi banco de toda la vida no me ofrecía. El proceso fue rápido y muy sencillo."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-emerald-500">
                      {["M", "J", "A"][i]}
                    </div>
                    <div className="ml-3">
                        <p className="font-bold">{["María González", "Juan Pérez", "Ana Martínez"][i]}</p>
                        <p className="text-emerald-300 text-sm">Hipoteca Fija</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-2xl font-bold text-white mb-6">Credovia</h3>
              <p className="text-sm leading-relaxed mb-6">
                 Expertos hipotecarios a tu servicio. Encontramos, negociamos y gestionamos tu hipoteca para que consigas la casa de tus sueños.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-emerald-400 transition-colors"><Facebook className="w-5 h-5" /></Link>
                <Link href="#" className="hover:text-emerald-400 transition-colors"><Instagram className="w-5 h-5" /></Link>
                <Link href="#" className="hover:text-emerald-400 transition-colors"><Linkedin className="w-5 h-5" /></Link>
              </div>
            </div>
            
            <div>
               <h4 className="text-white font-bold mb-6">Servicios</h4>
               <ul className="space-y-3 text-sm">
                  <li><Link href="#" className="hover:text-white">Hipoteca Fija</Link></li>
                  <li><Link href="#" className="hover:text-white">Hipoteca Variable</Link></li>
                  <li><Link href="#" className="hover:text-white">Hipoteca Mixta</Link></li>
                  <li><Link href="#" className="hover:text-white">Subrogación</Link></li>
               </ul>
            </div>

            <div>
               <h4 className="text-white font-bold mb-6">Empresa</h4>
               <ul className="space-y-3 text-sm">
                  <li><Link href="#" className="hover:text-white">Sobre Nosotros</Link></li>
                  <li><Link href="#" className="hover:text-white">Blog</Link></li>
                  <li><Link href="#" className="hover:text-white">Contacto</Link></li>
                  <li><Link href="#" className="hover:text-white">Aviso Legal</Link></li>
               </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contacto</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center"><Phone className="w-4 h-4 mr-3 text-emerald-500" /> 900 123 456</div>
                <div className="flex items-center"><Mail className="w-4 h-4 mr-3 text-emerald-500" /> info@credovia.com</div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-3 text-emerald-500" /> Madrid, España</div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>© 2026 Credovia. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="rounded-full w-14 h-14 bg-emerald-600 hover:bg-emerald-700 shadow-lg text-white">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
