"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { CheckCircle2, Home, Building, TrendingUp, RefreshCw, ArrowLeft } from "lucide-react"

export default function MortgageRequestForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    purpose: "",
    searchStatus: "",
    timing: "",
    propertyPrice: "",
    contractType: "",
    monthlyIncome: "",
    savings: 50000,
    contact: {
      name: "",
      email: "",
      phone: ""
    }
  })
  
  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(Math.max(1, step - 1))
  
  // Auto-advance helper for single choice selections
  const handleSelection = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    handleNext()
  }

  const steps = [
    { title: "Finalidad", description: "¿Para qué quieres la hipoteca?" },
    { title: "Búsqueda", description: "¿Cómo va tu búsqueda de vivienda?" },
    { title: "Plazos", description: "¿Cuándo tienes previsto comprar?" },
    { title: "Valor", description: "¿Cuál es el valor de la vivienda?" },
    { title: "Laboral", description: "¿Qué tipo de contrato tienes?" },
    { title: "Ingresos", description: "Ingresos totales mensuales" },
    { title: "Ahorros", description: "¿Cuántos ahorros aportas?" },
    { title: "Contacto", description: "Datos de contacto" },
  ]
  
  // Progress calculation
  const progress = (step / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2 text-sm font-medium text-slate-500">
           <span>Paso {step} de {steps.length}</span>
           <span>{Math.round(progress)}% completado</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{steps[step-1].description}</h2>
        </div>

        <Card className="border-0 shadow-lg p-6 bg-white rounded-2xl">
          <CardContent className="space-y-6 pt-2 px-0 pb-0">
            
            {/* Step 1: Purpose */}
            {step === 1 && (
              <div className="grid md:grid-cols-1 gap-4">
                <OptionButton 
                  label="Nueva hipoteca" 
                  selected={formData.purpose === "new"}
                  onClick={() => handleSelection("purpose", "new")}
                />
              </div>
            )}

            {/* Step 2: Search Status */}
            {step === 2 && (
              <div className="grid gap-3">
                {["Sigo buscando", "Tengo la casa elegida", "Negociando precio", "He reservado la vivienda"].map((option) => (
                  <OptionButton 
                    key={option}
                    label={option} 
                    selected={formData.searchStatus === option}
                    onClick={() => handleSelection("searchStatus", option)}
                  />
                ))}
              </div>
            )}

            {/* Step 3: Timing */}
            {step === 3 && (
              <div className="grid gap-3">
                 {["Lo antes posible", "En 3 meses", "En 6 meses", "En 1 año", "Más de 1 año"].map((option) => (
                  <OptionButton 
                    key={option}
                    label={option} 
                    selected={formData.timing === option}
                    onClick={() => handleSelection("timing", option)}
                  />
                ))}
              </div>
            )}

            {/* Step 4: Property Value */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {["Menos de 100.000 €", "100.000 - 150.000 €", "150.000 - 250.000 €", "250.000 - 400.000 €", "Más de 400.000 €"].map((option) => (
                    <OptionButton 
                      key={option}
                      label={option} 
                      selected={formData.propertyPrice === option}
                      onClick={() => handleSelection("propertyPrice", option)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Contract Type */}
            {step === 5 && (
              <div className="grid gap-3">
                {["Indefinido", "Temporal", "Funcionario", "Autónomo", "Pensionista", "Desempleado"].map((option) => (
                  <OptionButton 
                    key={option}
                    label={option} 
                    selected={formData.contractType === option}
                    onClick={() => handleSelection("contractType", option)}
                  />
                ))}
              </div>
            )}

            {/* Step 6: Monthly Income */}
            {step === 6 && (
              <div className="grid grid-cols-2 gap-3">
                {["Menos de 1.500 €", "1.500 - 2.000 €", "2.000 - 3.000 €", "3.000 - 5.000 €", "Más de 5.000 €"].map((option) => (
                  <OptionButton 
                    key={option}
                    label={option} 
                    selected={formData.monthlyIncome === option}
                    onClick={() => handleSelection("monthlyIncome", option)}
                  />
                ))}
              </div>
            )}

            {/* Step 7: Savings */}
            {step === 7 && (
              <div className="space-y-8 py-4">
                 <div className="text-center">
                    <span className="text-4xl font-bold text-primary">{formData.savings.toLocaleString('es-ES')} €</span>
                 </div>
                 <Slider 
                    value={[formData.savings]} 
                    min={0} 
                    max={200000} 
                    step={1000} 
                    onValueChange={(val) => setFormData(prev => ({ ...prev, savings: val[0] }))}
                    className="py-4"
                 />
                 <div className="flex justify-between text-xs text-slate-400">
                    <span>0 €</span>
                    <span>200.000 € +</span>
                 </div>
                 <Button onClick={handleNext} className="w-full h-14 text-lg bg-secondary hover:bg-emerald-600 text-white font-bold rounded-lg shadow-lg">
                    Continuar
                 </Button>
              </div>
            )}

            {/* Step 8: Contact */}
            {step === 8 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nombre completo</Label>
                  <Input 
                    placeholder="Tu nombre y apellidos" 
                    className="h-12 bg-slate-50 border-slate-200"
                    onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, name: e.target.value } }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input 
                    type="tel" 
                    placeholder="600 000 000" 
                    className="h-12 bg-slate-50 border-slate-200"
                    onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, phone: e.target.value } }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    placeholder="tu@email.com" 
                    className="h-12 bg-slate-50 border-slate-200"
                    onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))}
                  />
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-secondary focus:ring-secondary" id="privacy" />
                  <Label htmlFor="privacy" className="text-xs text-slate-500 font-normal leading-relaxed cursor-pointer">
                    Acepto la <span className="underline">política de privacidad</span> y las condiciones legales.
                  </Label>
                </div>

                 <Button className="w-full h-14 text-lg bg-secondary hover:bg-emerald-600 text-white font-bold rounded-lg shadow-lg mt-4">
                    Ver ofertas personalizadas
                 </Button>
              </div>
            )}

          </CardContent>
          
          {step > 1 && (
            <div className="px-0 pt-6 flex justify-start">
              <Button variant="ghost" onClick={handleBack} className="text-slate-400 hover:text-slate-600 pl-0 hover:bg-transparent">
                <ArrowLeft className="mr-2 w-4 h-4" /> Anterior
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function OptionButton({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 font-medium text-lg
        ${selected 
          ? "border-secondary bg-emerald-50 text-secondary shadow-sm" 
          : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-slate-50"
        }`}
    >
      {label}
    </button>
  )
}
