"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, ArrowRight } from "lucide-react"

export default function MortgageRequestForm() {
  const [step, setStep] = useState(1)
  
  const handleNext = () => setStep(step + 1)

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Solicita tu nueva hipoteca</h2>
        <p className="text-slate-600">Completa los pasos para recibir las mejores ofertas personalizadas.</p>
      </div>

      <div className="flex justify-between items-center mb-8 px-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= i ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"
            }`}>
              {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
            </div>
            {i < 3 && (
              <div className={`h-1 w-24 mx-2 ${
                step > i ? "bg-emerald-600" : "bg-slate-200"
              }`} />
            )}
          </div>
        ))}
      </div>

      <Card className="shadow-lg border-slate-100">
        <CardHeader>
          <CardTitle>
            {step === 1 && "Finalidad de la hipoteca"}
            {step === 2 && "Datos económicos"}
            {step === 3 && "Datos de contacto"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "¿Para qué necesitas el préstamo?"}
            {step === 2 && "Cuéntanos sobre la vivienda"}
            {step === 3 && "Para enviarte las ofertas"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <RadioGroup defaultValue="main-home">
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="main-home" id="r1" />
                  <Label htmlFor="r1" className="cursor-pointer flex-1">Comprar vivienda habitual</Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="second-home" id="r2" />
                  <Label htmlFor="r2" className="cursor-pointer flex-1">Segunda residencia</Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="investment" id="r3" />
                  <Label htmlFor="r3" className="cursor-pointer flex-1">Inversión</Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="improvement" id="r4" />
                  <Label htmlFor="r4" className="cursor-pointer flex-1">Mejorar mi hipoteca actual</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Precio de la vivienda</Label>
                <div className="relative">
                  <Input type="number" placeholder="Ej: 250000" className="pl-8" />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">€</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Ahorros aportados</Label>
                <div className="relative">
                  <Input type="number" placeholder="Ej: 50000" className="pl-8" />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">€</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Provincia</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="madrid">Madrid</SelectItem>
                    <SelectItem value="barcelona">Barcelona</SelectItem>
                    <SelectItem value="valencia">Valencia</SelectItem>
                    <SelectItem value="sevilla">Sevilla</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label>Apellidos</Label>
                  <Input placeholder="Tus apellidos" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="ejemplo@email.com" />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input type="tel" placeholder="600 000 000" />
              </div>
              <div className="flex items-start space-x-2 mt-4">
                <input type="checkbox" className="mt-1" id="privacy" />
                <Label htmlFor="privacy" className="text-sm text-slate-500 font-normal">
                  Acepto la política de privacidad y autorizo a Credovia a contactarme para informarme sobre ofertas hipotecarias.
                </Label>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end">
            {step < 3 ? (
              <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
                Siguiente <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            ) : (
              <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
                Solicitar Estudio Gratuito
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
