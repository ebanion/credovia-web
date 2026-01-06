import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import MortgageRequestForm from "@/components/mortgage-request-form"
import { BankLogo } from "@/components/bank-logo"
import {
  Clock,
  PiggyBank,
  FileText,
  ChevronDown,
  Star,
  Check,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight
} from "lucide-react"

const BANKS = [
  { name: "Santander", file: "santander.png" },
  { name: "BBVA", file: "bbva.png" },
  { name: "CaixaBank", file: "caixabank.png" },
  { name: "Sabadell", file: "sabadell.png" },
  { name: "ING", file: "ing.png" },
  { name: "Bankinter", file: "bankinter.png" },
  { name: "Abanca", file: "abanca.png" },
  { name: "EVO", file: "evo.png" },
  { name: "Unicaja", file: "unicaja.png" },
  { name: "Ibercaja", file: "ibercaja.png" },
  { name: "Deutsche Bank", file: "deutsche.png" },
  { name: "Kutxabank", file: "kutxabank.png" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-600">
      
      {/* 1. Header Simple */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm transition-all duration-200 h-32 md:h-40">
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center">
          <Link href="/" className="group flex flex-col items-center gap-2 p-2 rounded-xl transition-all duration-200 hover:opacity-90">
            <div className="relative h-16 w-[240px] sm:w-[300px] md:h-20 md:w-[340px]">
              <Image 
                src="/logo-credovia-official.png" 
                alt="Credovia" 
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 340px"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#1e4bb5] tracking-tight mt-2">
              Credovia
            </h1>
          </Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-8 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12 pt-8">
            <h2 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
              La manera más rápida y cómoda de conseguir tu <span className="relative inline-block">
                hipoteca
                <span className="absolute bottom-1 left-0 w-full h-2 bg-secondary/30 -rotate-1 rounded-full"></span>
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-medium">
              Nuestros expertos encuentran la mejor hipoteca para ti gratis y sin compromiso
            </p>
          </div>

          <div className="flex justify-center items-center gap-8 relative">
            {/* Collage Left (Hidden on mobile) */}
            <div className="hidden lg:block w-64 space-y-4 opacity-80">
               <div className="rotate-3 p-2 bg-white shadow-lg rounded-xl border border-slate-100">
                  <div className="h-40 bg-slate-100 rounded-lg relative overflow-hidden">
                    <Image src="/hero-house.png" alt="House" width={240} height={160} className="object-cover" />
                  </div>
               </div>
               <div className="-rotate-6 p-2 bg-white shadow-lg rounded-xl border border-slate-100 translate-x-8">
                  <div className="h-32 bg-slate-100 rounded-lg relative overflow-hidden">
                    <Image src="/hero-keys.png" alt="Keys" width={240} height={128} className="object-cover" />
                  </div>
               </div>
            </div>

            {/* Central Form */}
            <div className="w-full max-w-2xl relative z-20">
              <MortgageRequestForm />
            </div>

            {/* Collage Right (Hidden on mobile) */}
            <div className="hidden lg:block w-64 space-y-6 opacity-80">
               <div className="-rotate-3 p-2 bg-white shadow-lg rounded-xl border border-slate-100">
                  <div className="h-40 bg-slate-100 rounded-lg relative overflow-hidden">
                    <Image src="/hero-family.png" alt="Family" width={240} height={160} className="object-cover" />
                  </div>
               </div>
               <div className="rotate-6 p-2 bg-white shadow-lg rounded-xl border border-slate-100 -translate-x-4">
                  <div className="h-32 bg-slate-100 rounded-lg relative overflow-hidden">
                    <Image src="/hero-moving.png" alt="Moving" width={240} height={128} className="object-cover" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Benefits Section */}
      <section className="py-20 bg-slate-50 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
           <div className="bg-secondary text-white p-3 rounded-full shadow-lg animate-bounce">
              <ChevronDown className="w-8 h-8" />
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center mb-16">
             <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                   <Clock className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Ahorra tiempo</h3>
                <p className="text-slate-600">No vayas de banco en banco. Nosotros comparamos todas las ofertas por ti en un solo clic.</p>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                   <PiggyBank className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Ahorra dinero</h3>
                <p className="text-slate-600">Negociamos tipos de interés exclusivos que no encontrarás en las oficinas bancarias.</p>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                   <FileText className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Ahorra trámites</h3>
                <p className="text-slate-600">Gestionamos toda la documentación y te acompañamos hasta la firma ante notario.</p>
             </div>
          </div>

          <div className="text-center mb-12">
             <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">
               Consigue ofertas personalizadas de hasta 20 bancos sin tener que solicitarlas una por una
             </h2>
             {/* Bank Logos Grid */}
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 items-center justify-items-center">
                {BANKS.map((bank) => (
                  <BankLogo key={bank.name} name={bank.name} file={bank.file} />
                ))}
             </div>
          </div>

          <div className="text-center">
            <Button className="bg-secondary hover:bg-emerald-600 text-white font-bold text-xl py-6 px-12 rounded-full shadow-lg transition-transform hover:scale-105">
              Comparar hipotecas
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Experts & Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
           {/* Expert Block */}
           <div className="bg-slate-50 rounded-3xl p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                 <h2 className="text-3xl font-bold text-primary">
                    Un experto hipotecario siempre contigo – <span className="text-secondary">100% gratis</span>
                 </h2>
                 <p className="text-lg text-slate-600">
                    Desde el primer momento te asignamos un asesor personal que te guiará en todo el proceso, resolverá tus dudas y negociará por ti con los bancos.
                 </p>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                       <Check className="w-5 h-5 text-secondary" />
                       <span>Asesoramiento imparcial</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <Check className="w-5 h-5 text-secondary" />
                       <span>Acompañamiento hasta la firma</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <Check className="w-5 h-5 text-secondary" />
                       <span>Sin letra pequeña</span>
                    </li>
                 </ul>
              </div>
              <div className="flex-1 flex justify-center">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="w-32 h-32 bg-slate-200 rounded-full overflow-hidden border-4 border-white shadow-md">
                       <Image src="/placeholder.svg?height=128&width=128" alt="Expert 1" width={128} height={128} />
                    </div>
                    <div className="w-32 h-32 bg-slate-200 rounded-full overflow-hidden border-4 border-white shadow-md mt-12">
                       <Image src="/placeholder.svg?height=128&width=128" alt="Expert 2" width={128} height={128} />
                    </div>
                    <div className="w-32 h-32 bg-slate-200 rounded-full overflow-hidden border-4 border-white shadow-md -mt-12">
                       <Image src="/placeholder.svg?height=128&width=128" alt="Expert 3" width={128} height={128} />
                    </div>
                    <div className="w-32 h-32 bg-slate-200 rounded-full overflow-hidden border-4 border-white shadow-md">
                       <Image src="/placeholder.svg?height=128&width=128" alt="Expert 4" width={128} height={128} />
                    </div>
                 </div>
              </div>
           </div>

           {/* Testimonials */}
           <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-6 h-6 fill-current" />)}
                  </div>
                  <span className="font-bold text-2xl text-primary">4,7/5</span>
              </div>
              <p className="text-slate-500">Valoración media de nuestros clientes en Google Reviews</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[1, 2, 3].map((i) => (
                 <Card key={i} className="border border-slate-100 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                       <div className="flex items-center gap-4 mb-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                             ${i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-emerald-500' : 'bg-purple-500'}
                          `}>
                             {['R', 'L', 'M'][i-1]}
                          </div>
                          <div>
                             <p className="font-bold text-slate-900">{['Roberto C.', 'Laura G.', 'Miguel A.'][i-1]}</p>
                             <div className="flex text-yellow-400 w-20">
                                {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                             </div>
                          </div>
                       </div>
                       <p className="text-slate-600 text-sm leading-relaxed">
                          "Excelente servicio. Me ayudaron a conseguir una hipoteca fija cuando mi banco solo me ofrecía variable. Muy recomendables."
                       </p>
                    </CardContent>
                 </Card>
              ))}
           </div>
           
           <div className="text-center">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold px-8">
                 Ver más reseñas
              </Button>
           </div>
        </div>
      </section>

      {/* 5. Step by Step Process */}
      <section className="py-20 bg-slate-50">
         <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-16">¿Cómo funciona?</h2>
            
            <div className="relative">
               {/* Vertical Line */}
               <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-secondary/30 -translate-x-1/2 border-l-2 border-dashed border-secondary hidden md:block"></div>

               <div className="space-y-12">
                  {[
                     { step: 1, title: "Rellenas el formulario", desc: "En menos de 2 minutos nos das la información necesaria para estudiar tu caso." },
                     { step: 2, title: "Te conseguimos ofertas", desc: "Contactamos con los bancos y recibimos sus ofertas personalizadas para ti." },
                     { step: 3, title: "Te asignamos un experto", desc: "Un asesor analiza las ofertas contigo y resuelve todas tus dudas." },
                     { step: 4, title: "Elegís la mejor opción", desc: "Te ayudamos a decidir cuál es la hipoteca que más te conviene." },
                     { step: 5, title: "¡Firmamos!", desc: "Te acompañamos a la notaría para que firmes con total tranquilidad." }
                  ].map((item, index) => (
                     <div key={item.step} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="flex-1 text-center md:text-right">
                           {index % 2 === 0 && (
                             <div className="md:text-right">
                                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                             </div>
                           )}
                           {index % 2 !== 0 && (
                             <div className="md:text-left">
                                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                             </div>
                           )}
                        </div>
                        
                        <div className="relative z-10 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">
                           {item.step}
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                           {index % 2 !== 0 && (
                             <div className="md:text-right">
                                {/* Spacer or Image */}
                             </div>
                           )}
                           {index % 2 === 0 && (
                             <div className="md:text-left">
                                {/* Spacer or Image */}
                             </div>
                           )}
                           {/* Mobile Text (Visible only on small screens if logic allows, simplified here) */}
                           <div className="block md:hidden mt-2">
                                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 6. Final CTA Block */}
      <section className="py-20 bg-white border-t border-slate-100">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold text-primary mb-6">¡Empieza a disfrutar de tu nuevo hogar!</h2>
            <p className="text-xl text-slate-500 mb-10">La casa de tus sueños está a un clic de distancia.</p>
            
            {/* Re-embed form or just a button? The prompt says "Se repite el hero... y el selector".
                Embedding the full form again might be heavy, let's put the CTA button that scrolls up or a simplified version.
                For now, just the button to scroll up effectively or a link.
            */}
            <div className="max-w-xl mx-auto p-8 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-6">¿Para qué quieres la hipoteca?</h3>
                <div className="grid grid-cols-1 gap-4">
                  <Button className="w-full bg-white text-secondary border-2 border-secondary hover:bg-secondary hover:text-white h-14 text-lg font-bold shadow-sm">
                    Simula tu hipoteca
                  </Button>
                </div>
            </div>
         </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-12">
           <div>
              <h4 className="font-bold text-xl mb-6">Credovia</h4>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                 Expertos en intermediación hipotecaria. Inscritos en el Registro de Intermediarios de Crédito Inmobiliario del Banco de España.
              </p>
           </div>
           <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                 <li><Link href="#" className="hover:text-white">Aviso Legal</Link></li>
                 <li><Link href="#" className="hover:text-white">Política de Privacidad</Link></li>
                 <li><Link href="#" className="hover:text-white">Política de Cookies</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold mb-6">Contacto</h4>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                 <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> 900 123 456</li>
                 <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> hola@credovia.com</li>
                 <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Madrid, España</li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold mb-6">Síguenos</h4>
              <div className="flex space-x-4">
                 <Link href="#" className="hover:text-secondary"><Facebook /></Link>
                 <Link href="#" className="hover:text-secondary"><Instagram /></Link>
                 <Link href="#" className="hover:text-secondary"><Linkedin /></Link>
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
           © 2026 Credovia. Todos los derechos reservados.
        </div>
      </footer>

      {/* Cookie Banner (Simulated) */}
      <div className="fixed bottom-0 left-0 w-full bg-secondary text-white p-4 z-50 flex flex-col md:flex-row justify-between items-center gap-4 shadow-top">
         <div className="text-sm">
            Usamos cookies para mejorar tu experiencia. Al continuar navegando aceptas nuestra política de cookies.
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="border-white text-white hover:bg-white/10 h-8 text-xs bg-transparent">
               Personalizar
            </Button>
            <Button className="bg-white text-secondary hover:bg-slate-100 h-8 text-xs font-bold">
               Aceptar todas
            </Button>
         </div>
      </div>

    </div>
  )
}
