"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Wallet, Percent, Table2, X } from "lucide-react"
import { QuotaCalculator } from "./QuotaCalculator"
import { ExpensesCalculator } from "./ExpensesCalculator"
import { FixedMixedCalculator } from "./FixedMixedCalculator"
import { AmortizationCalculator } from "./AmortizationCalculator"
import { cn } from "@/lib/utils"

export function CalculatorsSection() {
  const [activeCalc, setActiveCalc] = useState<string | null>(null)

  const calculators = [
    {
      id: "quota",
      title: "Cuota Mensual",
      description: "Calcula tu cuota mensual en segundos",
      icon: Calculator,
      component: QuotaCalculator,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      id: "expenses",
      title: "Gastos Compra",
      description: "Estima gastos de compra de forma orientativa",
      icon: Wallet,
      component: ExpensesCalculator,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      id: "compare",
      title: "Fija vs Mixta",
      description: "Compara fijo vs mixta de forma rápida",
      icon: Percent,
      component: FixedMixedCalculator,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      id: "amortization",
      title: "Amortización",
      description: "Consulta una tabla de amortización aproximada",
      icon: Table2,
      component: AmortizationCalculator,
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
  ]

  const ActiveComponent = activeCalc ? calculators.find(c => c.id === activeCalc)?.component : null
  const activeData = calculators.find(c => c.id === activeCalc)

  return (
    <section className="py-16 bg-white border-t border-slate-100 scroll-mt-20" id="calculadoras">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Calculadoras</h2>
          <p className="text-lg text-slate-500">Herramientas rápidas para estimar tu hipoteca</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {calculators.map((calc) => (
            <Card 
              key={calc.id} 
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
                activeCalc === calc.id ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-slate-200"
              )}
              onClick={() => setActiveCalc(activeCalc === calc.id ? null : calc.id)}
            >
              <CardHeader className="space-y-1">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-2", calc.bg)}>
                  <calc.icon className={cn("w-5 h-5", calc.color)} />
                </div>
                <CardTitle className="text-lg">{calc.title}</CardTitle>
                <CardDescription>{calc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant={activeCalc === calc.id ? "default" : "outline"} 
                  className="w-full"
                >
                  {activeCalc === calc.id ? "Cerrar" : "Abrir"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inline Expandable Panel */}
        {activeCalc && ActiveComponent && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="max-w-3xl mx-auto bg-white border-2 border-slate-100 rounded-2xl shadow-xl overflow-hidden relative">
               <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-md flex items-center justify-center", activeData?.bg)}>
                      {activeData?.icon && <activeData.icon className={cn("w-4 h-4", activeData?.color)} />}
                    </div>
                    <h3 className="font-bold text-xl text-slate-800">{activeData?.title}</h3>
                 </div>
                 <Button variant="ghost" size="icon" onClick={() => setActiveCalc(null)}>
                   <X className="w-5 h-5 text-slate-400" />
                 </Button>
               </div>
               <div className="p-6">
                 <ActiveComponent />
               </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
