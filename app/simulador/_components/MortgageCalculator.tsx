"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PROVINCES_LIST } from "@/data/taxes/es"
import { calculateMortgage } from "@/lib/mortgage-utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useRouter } from "next/navigation"

export default function MortgageCalculator() {
  const router = useRouter()
  // State for inputs
  const [propertyPrice, setPropertyPrice] = useState(300000)
  const [savings, setSavings] = useState(80000)
  const [termYears, setTermYears] = useState(25)
  const [propertyType, setPropertyType] = useState<"new" | "used">("new") // 'new' or 'used'
  const [region, setRegion] = useState("Madrid")

  // State for results
  const [results, setResults] = useState({
    monthlyQuota: 0,
    loanAmount: 0,
    expenses: { taxes: 0, notary: 0, registry: 0, agency: 0, appraisal: 0, total: 0 },
    downPayment: 0,
    netDownPayment: 0,
    totalInterests: 0,
    tin: 0,
    isVariable: false,
    taxesRate: 0
  })

  // Constants
  const MIN_PRICE = 50000
  const MAX_PRICE = 1500000
  const MIN_TERM = 5
  const MAX_TERM = 30
  
  // Interest rates (mock data - constants)
  const FIXED_RATE = 2.25 // 2.25% TIN (Updated for commercial/simulator)
  const VARIABLE_RATE_FIRST_YEAR = 2.25 // 2.25% Initial TIN
  const EURIBOR = 2.6 // Example Euribor
  const SPREAD = 0.50 // Differential 0.5%

  useEffect(() => {
    updateMortgage()
  }, [propertyPrice, savings, termYears, propertyType, region])

  const updateMortgage = () => {
    const calc = calculateMortgage({
      propertyPrice,
      savings,
      years: termYears,
      interestRate: FIXED_RATE, // For fixed tab logic base
      province: region,
      propertyType,
      isVariable: false
    });

    setResults({
      ...calc,
      tin: FIXED_RATE,
      isVariable: false
    })
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val)
  }
  
  // Re-adjust for bar view (Expenses, Loan Amount, Total Interests)
  const barTotal = results.expenses.total + results.loanAmount + results.totalInterests;
  const pExpenses = barTotal > 0 ? (results.expenses.total / barTotal) * 100 : 0;
  const pLoan = barTotal > 0 ? (results.loanAmount / barTotal) * 100 : 0;
  const pInterest = barTotal > 0 ? (results.totalInterests / barTotal) * 100 : 0;

  return (
    <div className="bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-8 h-8 text-emerald-600" />
          <h2 className="text-3xl font-bold text-slate-900">Calcula la cuota de tu hipoteca</h2>
        </div>
        <p className="text-slate-600 mb-8">Descubre en pocos segundos cuánto pagarás de cuota al mes para tu hipoteca fija o variable.</p>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Property Price */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <Label className="text-lg font-semibold text-slate-800">¿Cuánto cuesta la casa que quieres comprar?</Label>
              </div>
              <div className="flex gap-4 items-center mb-6">
                <div className="relative w-full">
                  <Input 
                    type="number" 
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="text-xl font-bold py-6 pl-4 pr-8"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">€</span>
                </div>
              </div>
              <Slider 
                value={[propertyPrice]} 
                min={MIN_PRICE} 
                max={MAX_PRICE} 
                step={1000} 
                onValueChange={(vals) => setPropertyPrice(vals[0])}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>{formatCurrency(MIN_PRICE)}</span>
                <span>{formatCurrency(MAX_PRICE)}</span>
              </div>
            </div>

            {/* Savings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <Label className="text-lg font-semibold text-slate-800">
                  ¿Cuántos ahorros puedes aportar?
                  <Info className="w-4 h-4 inline-block ml-2 text-slate-400" />
                </Label>
              </div>
              <div className="flex gap-4 items-center mb-6">
                <div className="relative w-full">
                  <Input 
                    type="number" 
                    value={savings}
                    onChange={(e) => setSavings(Number(e.target.value))}
                    className="text-xl font-bold py-6 pl-4 pr-8"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">€</span>
                </div>
              </div>
              <Slider 
                value={[savings]} 
                min={0} 
                max={propertyPrice} 
                step={1000} 
                onValueChange={(vals) => setSavings(vals[0])}
                className="mb-2"
              />
            </div>

            {/* Term */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <Label className="text-lg font-semibold text-slate-800">¿A cuántos años quieres pedir la hipoteca?</Label>
              </div>
              <div className="flex gap-4 items-center mb-6">
                <div className="relative w-full">
                  <Input 
                    type="number" 
                    value={termYears}
                    onChange={(e) => setTermYears(Number(e.target.value))}
                    className="text-xl font-bold py-6 pl-4 pr-16"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">años</span>
                </div>
              </div>
              <Slider 
                value={[termYears]} 
                min={MIN_TERM} 
                max={MAX_TERM} 
                step={1} 
                onValueChange={(vals) => setTermYears(vals[0])}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>{MIN_TERM}</span>
                <span>{MAX_TERM}</span>
              </div>
            </div>

            {/* Other Inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-800">¿Qué tipo de casa quieres comprar?</Label>
                <ToggleGroup type="single" value={propertyType} onValueChange={(val) => val && setPropertyType(val)} className="justify-start w-full">
                  <ToggleGroupItem value="new" className="flex-1 border border-slate-200 data-[state=on]:bg-slate-900 data-[state=on]:text-white rounded-l-lg py-3">Nueva</ToggleGroupItem>
                  <ToggleGroupItem value="used" className="flex-1 border border-slate-200 data-[state=on]:bg-slate-900 data-[state=on]:text-white rounded-r-lg py-3">Segunda mano</ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-800">¿Dónde está la casa?</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="w-full py-6">
                    <SelectValue placeholder="Selecciona una provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVINCES_LIST.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <Tabs defaultValue="fija" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 h-12 bg-slate-100 p-1 rounded-xl">
                  <TabsTrigger value="fija" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-600 font-bold">Hipoteca fija</TabsTrigger>
                  <TabsTrigger value="variable" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-600 font-bold">Hipoteca variable</TabsTrigger>
                </TabsList>
                
                <Card className="border-0 shadow-lg bg-emerald-50/50 overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    <TabsContent value="fija" className="mt-0 space-y-6">
                      <div className="text-center pb-6 border-b border-emerald-100">
                        <p className="text-slate-600 font-medium mb-1">Cuota mensual estimada</p>
                        <div className="text-5xl font-bold text-slate-900 tracking-tight">
                          {formatCurrency(results.monthlyQuota)}
                          <span className="text-xl text-slate-500 font-normal ml-1">/mes</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-slate-700">TIN fijo</span>
                        <div className="text-right">
                          <span className="font-bold text-emerald-600 text-lg block">{results.tin.toFixed(2)}%</span>
                          <span className="text-[10px] text-slate-400 font-normal leading-tight block max-w-[150px]">
                            TIN estimado orientativo. Condiciones sujetas a perfil y banco.
                          </span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="variable" className="mt-0 space-y-6">
                      <div className="text-center pb-6 border-b border-emerald-100">
                        <p className="text-slate-600 font-medium mb-1">Cuota mensual estimada</p>
                        <div className="text-5xl font-bold text-slate-900 tracking-tight">
                          {formatCurrency(results.monthlyQuota)} {/* Simple variable estimate */}
                          <span className="text-xl text-slate-500 font-normal ml-1">/mes</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">* Estimación primer año</p>
                      </div>

                       <div className="space-y-4">
                        <div className="flex justify-between items-start text-sm">
                          <span className="font-bold text-slate-700 mt-1">TIN 1º año</span>
                          <div className="text-right">
                             <span className="font-bold text-emerald-600 text-lg block">{VARIABLE_RATE_FIRST_YEAR}%</span>
                             <span className="text-[10px] text-slate-400 font-normal leading-tight block max-w-[150px]">
                                TIN estimado orientativo.
                             </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-slate-700">TIN resto años</span>
                          <span className="font-bold text-emerald-600">Euribor + {SPREAD}%</span>
                        </div>
                        <p className="text-[10px] text-slate-400 text-right w-full">
                           Condiciones finales dependen de perfil y banco.
                        </p>
                      </div>
                    </TabsContent>

                    {/* Breakdown */}
                    <div className="space-y-3 mt-6 pt-6 border-t border-emerald-100">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                          <span className="text-slate-600">Ahorro aportado</span>
                        </div>
                        <span className="font-medium text-slate-900">{formatCurrency(savings)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                          <span className="text-slate-600">Entrada</span>
                        </div>
                          <span className="font-medium text-slate-900">{formatCurrency(results.netDownPayment > 0 ? results.netDownPayment : 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-200"></div>
                          <span className="text-slate-600">Impuestos y gastos</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="w-3 h-3 text-slate-400" />
                              </TooltipTrigger>
                              <TooltipContent className="p-4 max-w-xs">
                                <p className="font-bold mb-2">Desglose de gastos:</p>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between gap-4">
                                    <span>Impuestos ({results.taxesRate}%):</span>
                                    <span>{formatCurrency(results.expenses.taxes)}</span>
                                  </div>
                                  <div className="flex justify-between gap-4">
                                    <span>Notaría:</span>
                                    <span>{formatCurrency(results.expenses.notary)}</span>
                                  </div>
                                  <div className="flex justify-between gap-4">
                                    <span>Registro:</span>
                                    <span>{formatCurrency(results.expenses.registry)}</span>
                                  </div>
                                  <div className="flex justify-between gap-4">
                                    <span>Gestoría:</span>
                                    <span>{formatCurrency(results.expenses.agency)}</span>
                                  </div>
                                  <div className="flex justify-between gap-4">
                                    <span>Tasación:</span>
                                    <span>{formatCurrency(results.expenses.appraisal)}</span>
                                  </div>
                                  <div className="border-t pt-1 mt-1 font-bold flex justify-between gap-4">
                                    <span>Total:</span>
                                    <span>{formatCurrency(results.expenses.total)}</span>
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span className="font-medium text-slate-900">{formatCurrency(results.expenses.total)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                          <span className="text-slate-600">Importe a financiar</span>
                        </div>
                        <span className="font-medium text-slate-900">{formatCurrency(results.loanAmount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <span className="text-slate-600">Intereses totales</span>
                        </div>
                        <span className="font-medium text-slate-900">{formatCurrency(results.totalInterests)}</span>
                      </div>
                    </div>

                    {/* Progress Bar Visual */}
                    <div className="mt-6 flex h-4 rounded-full overflow-hidden w-full">
                       <div className="bg-blue-300 h-full" style={{ width: `${pExpenses}%` }} title="Gastos"></div>
                       <div className="bg-amber-400 h-full" style={{ width: `${pLoan}%` }} title="Préstamo"></div>
                       <div className="bg-red-400 h-full" style={{ width: `${pInterest}%` }} title="Intereses"></div>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-white mt-[-1rem] px-2 relative z-10 pointer-events-none">
                      <span className="drop-shadow-md">{Math.round(pExpenses)}%</span>
                      <span className="drop-shadow-md">{Math.round(pLoan)}%</span>
                      <span className="drop-shadow-md">{Math.round(pInterest)}%</span>
                    </div>

                    <div className="mt-8">
                      <p className="text-center text-xs text-slate-500 mb-3 leading-tight px-4">
                        La cuota mostrada es una estimación basada en condiciones competitivas de mercado. Al continuar podremos calcularte ofertas reales adaptadas a tu perfil.
                      </p>
                      <Button 
                        onClick={() => {
                          // If we are in the simulator page (which this component is part of), 
                          // we want to switch to the request tab.
                          // Since we implemented URL param logic in page.tsx, we can just navigate or switch tab.
                          // But the parent is controlling the tabs. 
                          // A simple router push to /simulador?tab=request is the safest way to reset to that tab
                          // or just /simulador (defaults to request).
                          router.push("/simulador?tab=request")
                        }}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-6 text-lg shadow-lg shadow-emerald-200 rounded-xl"
                      >
                        Consígueme esta hipoteca
                      </Button>
                      <p className="text-center text-xs text-slate-500 mt-3">
                        Te ayudamos - <span className="font-bold">Gratis</span> y sin compromiso
                      </p>
                    </div>

                  </CardContent>
                </Card>
              </Tabs>
              
              <div className="mt-4 text-xs text-slate-400 leading-relaxed text-center">
                *El resultado del cálculo es una simulación basada en los datos que has introducido y en los tipos de interés actuales. No constituye una oferta vinculante.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
