"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Home, Building, TrendingUp, RefreshCw, ArrowLeft } from "lucide-react"

export default function MortgageRequestForm() {
  const [step, setStep] = useState(1)
  const [purpose, setPurpose] = useState("")
  
  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(Math.max(1, step - 1))
  
  const handlePurposeSelect = (value: string) => {
    setPurpose(value)
    handleNext()
  }

  const steps = [
    { title: "Finalidad", description: "¿Para qué quieres la hipoteca?" },
    { title: "Vivienda", description: "Datos del inmueble" },
    { title: "Económico", description: "Situación financiera" },
    { title: "Contacto", description: "Tus datos" },
  ]
  
  // Progress calculation
  const progress = (step / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Step Indicator */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4 text-sm font-medium text-slate-500">
           <span>Paso {step} de {steps.length}</span>
           <span>{Math.round(progress)}% completado</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{steps[step-1].description}</h2>
          <p className="text-slate-500">Te ayudamos a encontrar la mejor opción del mercado.</p>
        </div>

        {/* Step 1: Purpose */}
        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-4">
            <PurposeCard 
              icon={<Home className="w-8 h-8 text-emerald-600" />}
              title="Comprar vivienda habitual"
              onClick={() => handlePurposeSelect("first_home")}
            />
            <PurposeCard 
              icon={<Building className="w-8 h-8 text-blue-600" />}
              title="Segunda residencia"
              onClick={() => handlePurposeSelect("second_home")}
            />
            <PurposeCard 
              icon={<TrendingUp className="w-8 h-8 text-amber-500" />}
              title="Inversión"
              onClick={() => handlePurposeSelect("investment")}
            />
            <PurposeCard 
              icon={<RefreshCw className="w-8 h-8 text-purple-600" />}
              title="Mejorar mi hipoteca"
              onClick={() => handlePurposeSelect("improvement")}
            />
          </div>
        )}

        {/* Step 2: Property Details */}
        {step === 2 && (
          <Card className="border-0 shadow-lg p-6">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold">¿Has encontrado ya la casa?</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-14 text-lg hover:border-emerald-500 hover:text-emerald-600">Sí</Button>
                  <Button variant="outline" className="h-14 text-lg hover:border-emerald-500 hover:text-emerald-600">No, aún busco</Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Precio de la vivienda (€)</Label>
                <Input type="number" placeholder="Ej: 250000" className="h-14 text-lg px-4" />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Ubicación</Label>
                <Select>
                  <SelectTrigger className="h-14 text-lg px-4">
                    <SelectValue placeholder="Selecciona provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="madrid">Madrid</SelectItem>
                    <SelectItem value="barcelona">Barcelona</SelectItem>
                    <SelectItem value="valencia">Valencia</SelectItem>
                    <SelectItem value="sevilla">Sevilla</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <div className="p-6 pt-0 flex justify-between">
              <Button variant="ghost" onClick={handleBack} className="text-slate-500">
                <ArrowLeft className="mr-2 w-4 h-4" /> Atrás
              </Button>
              <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700 h-12 px-8 text-lg">
                Continuar
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Financials */}
        {step === 3 && (
          <Card className="border-0 shadow-lg p-6">
            <CardContent className="space-y-6 pt-6">
               <div className="space-y-3">
                <Label className="text-base font-semibold">Ingresos mensuales netos (Hogar)</Label>
                <Input type="number" placeholder="Ej: 3000" className="h-14 text-lg px-4" />
                <p className="text-sm text-slate-500">Suma de las nóminas de todos los titulares</p>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Ahorros disponibles</Label>
                <Input type="number" placeholder="Ej: 60000" className="h-14 text-lg px-4" />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Situación laboral principal</Label>
                <Select>
                  <SelectTrigger className="h-14 text-lg px-4">
                    <SelectValue placeholder="Selecciona..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indefinido">Indefinido</SelectItem>
                    <SelectItem value="temporal">Temporal</SelectItem>
                    <SelectItem value="autonomo">Autónomo</SelectItem>
                    <SelectItem value="funcionario">Funcionario</SelectItem>
                    <SelectItem value="pensionista">Pensionista</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <div className="p-6 pt-0 flex justify-between">
              <Button variant="ghost" onClick={handleBack} className="text-slate-500">
                <ArrowLeft className="mr-2 w-4 h-4" /> Atrás
              </Button>
              <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700 h-12 px-8 text-lg">
                Continuar
              </Button>
            </div>
          </Card>
        )}

        {/* Step 4: Contact */}
        {step === 4 && (
          <Card className="border-0 shadow-lg p-6">
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Nombre</Label>
                  <Input placeholder="Tu nombre" className="h-14 text-lg px-4" />
                </div>
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Apellidos</Label>
                  <Input placeholder="Tus apellidos" className="h-14 text-lg px-4" />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Email</Label>
                <Input type="email" placeholder="tu@email.com" className="h-14 text-lg px-4" />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Teléfono</Label>
                <Input type="tel" placeholder="600 123 456" className="h-14 text-lg px-4" />
              </div>

              <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
                <input type="checkbox" className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" id="privacy" />
                <Label htmlFor="privacy" className="text-sm text-slate-600 font-normal leading-relaxed cursor-pointer">
                  He leído y acepto la <span className="underline decoration-dotted">política de privacidad</span>. Autorizo a Credovia a contactarme para informarme sobre ofertas hipotecarias adaptadas a mi perfil.
                </Label>
              </div>
            </CardContent>
            <div className="p-6 pt-0 flex justify-between">
              <Button variant="ghost" onClick={handleBack} className="text-slate-500">
                <ArrowLeft className="mr-2 w-4 h-4" /> Atrás
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 h-12 px-8 text-lg w-full md:w-auto shadow-lg shadow-emerald-200">
                Ver Ofertas Gratis
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

function PurposeCard({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-8 rounded-xl shadow-md border border-slate-100 cursor-pointer transition-all hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 group text-center flex flex-col items-center justify-center gap-4 h-48"
    >
      <div className="p-4 bg-slate-50 rounded-full group-hover:bg-emerald-50 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-700 group-hover:text-emerald-700">{title}</h3>
    </div>
  )
}
