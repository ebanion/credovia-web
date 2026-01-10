"use client"

import { useState, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PROVINCES, PROVINCES_LIST } from "@/data/taxes/es"
import { calculateMortgage } from "@/lib/mortgage-utils"
import { Calculator, HelpCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// --- CONSTANTS & DEFAULTS ---
const DEFAULT_TIN_FIXED = 2.25 // 2.25%
const DEFAULT_TIN_VAR_INITIAL = 2.25 // 2.25%
const DEFAULT_EURIBOR = 2.6 // 2.6% (Consistent with other simulator)
const DEFAULT_DIFFERENTIAL = 0.5 // 0.5%

export function QuotaCalculator() {
  // --- STATE ---
  const [price, setPrice] = useState<number>(300000)
  const [savings, setSavings] = useState<number>(80000)
  const [years, setYears] = useState<number>(25)
  const [propertyType, setPropertyType] = useState<"used" | "new">("used")
  const [province, setProvince] = useState<string>("Madrid")
  
  // Market Rates (Configurable in a real app, hardcoded defaults here)
  const [tinFixed, setTinFixed] = useState<number>(DEFAULT_TIN_FIXED)
  const [tinVarInitial, setTinVarInitial] = useState<number>(DEFAULT_TIN_VAR_INITIAL)
  const [euribor, setEuribor] = useState<number>(DEFAULT_EURIBOR)
  const [differential, setDifferential] = useState<number>(DEFAULT_DIFFERENTIAL)

  // --- CALCULATIONS ---
  const calculation = useMemo(() => {
    // Fixed Calculation
    const fixedCalc = calculateMortgage({
      propertyPrice: price,
      savings,
      years,
      interestRate: tinFixed,
      province,
      propertyType,
      isVariable: false
    })

    // Variable Calculation
    const varCalc = calculateMortgage({
      propertyPrice: price,
      savings,
      years,
      interestRate: tinVarInitial, // For first year
      province,
      propertyType,
      isVariable: true
    })

    // Recalculate Rest of Variable (Approx)
    // We reuse the logic from previous implementation for "Rest" quota
    // but basing it on the new 'amountToFinance' from util
    const amountToFinance = fixedCalc.loanAmount
    const r1 = tinVarInitial / 100 / 12
    let capitalPending = amountToFinance
    
    // Amortize first year
    const quotaVarYear1 = varCalc.monthlyQuota
    if (r1 > 0) {
        for(let i=0; i<12; i++) {
            const interest = capitalPending * r1
            const principal = quotaVarYear1 - interest
            capitalPending -= principal
        }
    } else {
        capitalPending = amountToFinance - (quotaVarYear1 * 12)
    }

    const tinVarRest = euribor + differential
    const rRest = tinVarRest / 100 / 12
    const nRest = (years - 1) * 12
    let quotaVarRest = 0
    if (rRest === 0) {
       quotaVarRest = capitalPending / nRest
    } else {
       quotaVarRest = (capitalPending * rRest * Math.pow(1 + rRest, nRest)) / (Math.pow(1 + rRest, nRest) - 1)
    }

    // Total Interests Variable (Approx)
    const interestsYear1 = (quotaVarYear1 * 12) - (amountToFinance - capitalPending)
    const interestsRest = (quotaVarRest * nRest) - capitalPending
    const totalInterestsVar = interestsYear1 + interestsRest

    return {
      expenses: fixedCalc.expenses,
      taxes: fixedCalc.expenses.taxes,
      fixedFeesTotal: fixedCalc.expenses.total - fixedCalc.expenses.taxes, // Notary+Reg+Agency+Appraisal
      downPayment: fixedCalc.netDownPayment > 0 ? fixedCalc.netDownPayment : 0, // "Entrada (tras gastos)" usually means what you pay to seller + expenses paid. Wait.
      // In the previous logic: "Entrada" was displayed as savings - totalExpenses.
      // In util: netDownPayment = savings - totalExpenses.
      // Correct.
      amountToFinance: fixedCalc.loanAmount,
      quotaFixed: fixedCalc.monthlyQuota,
      totalInterestsFixed: fixedCalc.totalInterests,
      quotaVarYear1,
      quotaVarRest,
      totalInterestsVar,
      tinVarRest,
      taxesRate: fixedCalc.taxesRate
    }
  }, [price, savings, years, propertyType, province, tinFixed, tinVarInitial, euribor, differential])


  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* --- LEFT COLUMN: INPUTS --- */}
      <div className="lg:col-span-5 space-y-8">
        
        {/* Price */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold text-slate-700">¿Cuánto cuesta la casa?</Label>
            <div className="relative w-32">
              <Input 
                type="text" 
                value={price.toLocaleString("es-ES")} 
                onChange={(e) => {
                  const val = parseInt(e.target.value.replace(/\./g, "")) || 0
                  setPrice(val)
                }}
                className="text-right pr-8 font-bold" 
              />
              <span className="absolute right-3 top-2.5 text-slate-400">€</span>
            </div>
          </div>
          <Slider 
            value={[price]} 
            min={50000} 
            max={1500000} 
            step={1000}
            onValueChange={(val) => setPrice(val[0])}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>50.000 €</span>
            <span>1.500.000 €</span>
          </div>
        </div>

        {/* Savings */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold text-slate-700">¿Cuántos ahorros aportas?</Label>
            <div className="relative w-32">
              <Input 
                type="text" 
                value={savings.toLocaleString("es-ES")} 
                onChange={(e) => {
                  const val = parseInt(e.target.value.replace(/\./g, "")) || 0
                  setSavings(val)
                }}
                className="text-right pr-8 font-bold" 
              />
              <span className="absolute right-3 top-2.5 text-slate-400">€</span>
            </div>
          </div>
          <Slider 
            value={[savings]} 
            min={0} 
            max={price} 
            step={1000}
            onValueChange={(val) => setSavings(val[0])}
            className="py-2"
          />
        </div>

        {/* Term */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold text-slate-700">Plazo (años)</Label>
            <div className="relative w-20">
              <Input 
                type="number" 
                value={years} 
                onChange={(e) => setYears(Number(e.target.value))}
                className="text-right font-bold" 
              />
            </div>
          </div>
          <Slider 
            value={[years]} 
            min={5} 
            max={30} 
            step={1}
            onValueChange={(val) => setYears(val[0])}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>5 años</span>
            <span>30 años</span>
          </div>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label className="text-base font-semibold text-slate-700">Tipo de vivienda</Label>
          <ToggleGroup type="single" value={propertyType} onValueChange={(val) => val && setPropertyType(val as "used" | "new")} className="justify-start w-full">
            <ToggleGroupItem value="new" className="flex-1 border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/5 data-[state=on]:text-primary">Obra Nueva</ToggleGroupItem>
            <ToggleGroupItem value="used" className="flex-1 border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/5 data-[state=on]:text-primary">Segunda Mano</ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="text-base font-semibold text-slate-700">¿Dónde está la casa?</Label>
          <Select value={province} onValueChange={setProvince}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Selecciona provincia" />
            </SelectTrigger>
            <SelectContent>
              {PROVINCES.map(p => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>

      {/* --- RIGHT COLUMN: RESULTS --- */}
      <div className="lg:col-span-7">
        <Card className="border-0 shadow-lg bg-white overflow-hidden h-full">
          <CardContent className="p-0 h-full">
            <Tabs defaultValue="fixed" className="w-full h-full flex flex-col">
              <TabsList className="w-full grid grid-cols-2 rounded-none h-14 bg-slate-100 p-0">
                <TabsTrigger value="fixed" className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:border-t-2 data-[state=active]:border-t-primary text-base">Hipoteca Fija</TabsTrigger>
                <TabsTrigger value="variable" className="h-full rounded-none data-[state=active]:bg-white data-[state=active]:border-t-2 data-[state=active]:border-t-primary text-base">Hipoteca Variable</TabsTrigger>
              </TabsList>

              <div className="p-6 md:p-8 flex-1 flex flex-col">
                
                {/* FIXED TAB CONTENT */}
                <TabsContent value="fixed" className="space-y-8 flex-1 mt-0">
                  <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-100 pb-6">
                    <div>
                      <p className="text-slate-500 mb-1">Cuota mensual estimada</p>
                      <p className="text-4xl md:text-5xl font-extrabold text-primary">
                        {calculation.quotaFixed.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €/mes
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-400 uppercase">TIN Fijo</p>
                      <p className="text-2xl font-bold text-slate-700">{tinFixed.toLocaleString("es-ES")}%</p>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-[150px] leading-tight ml-auto">
                        TIN estimado orientativo. Condiciones sujetas a perfil y banco.
                      </p>
                    </div>
                  </div>

                  <BreakdownList 
                    items={[
                      { label: "Ahorro aportado", amount: savings, color: "bg-blue-200" },
                      { label: "Entrada (tras gastos)", amount: calculation.downPayment, color: "bg-emerald-200" },
                      { 
                        label: "Impuestos y gastos", 
                        amount: calculation.expenses.total, 
                        color: "bg-orange-200",
                        tooltip: {
                          taxes: calculation.expenses.taxes,
                          taxesRate: calculation.taxesRate,
                          notary: calculation.expenses.notary,
                          registry: calculation.expenses.registry,
                          agency: calculation.expenses.agency,
                          appraisal: calculation.expenses.appraisal,
                          total: calculation.expenses.total
                        }
                      },
                      { label: "Importe a financiar", amount: calculation.amountToFinance, color: "bg-slate-200", bold: true },
                      { label: "Intereses totales", amount: calculation.totalInterestsFixed, color: "bg-red-100" },
                    ]}
                  />

                  <div className="mt-auto pt-4">
                    <AmortizationModal 
                      amount={calculation.amountToFinance} 
                      rate={tinFixed} 
                      years={years} 
                      title="Cuadro de Amortización (Fija)"
                    />
                  </div>
                </TabsContent>

                {/* VARIABLE TAB CONTENT */}
                <TabsContent value="variable" className="space-y-8 flex-1 mt-0">
                  <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-6">
                    <div>
                      <p className="text-slate-500 text-sm mb-1">Primer año</p>
                      <p className="text-3xl font-extrabold text-primary">
                        {calculation.quotaVarYear1.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €/mes
                      </p>
                      <p className="text-xs text-slate-400 mt-1">TIN {tinVarInitial}%</p>
                      <p className="text-[10px] text-slate-400 mt-1 leading-tight max-w-[120px]">
                        TIN estimado orientativo.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-500 text-sm mb-1">Resto años</p>
                      <p className="text-3xl font-extrabold text-primary">
                        {calculation.quotaVarRest.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €/mes
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Euríbor + {differential}%</p>
                      <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                         Condiciones finales según perfil.
                      </p>
                    </div>
                  </div>

                  <BreakdownList 
                    items={[
                      { label: "Ahorro aportado", amount: savings, color: "bg-blue-200" },
                      { label: "Entrada (tras gastos)", amount: calculation.downPayment, color: "bg-emerald-200" },
                      { 
                        label: "Impuestos y gastos", 
                        amount: calculation.expenses.total, 
                        color: "bg-orange-200",
                        tooltip: {
                          taxes: calculation.expenses.taxes,
                          taxesRate: calculation.taxesRate,
                          notary: calculation.expenses.notary,
                          registry: calculation.expenses.registry,
                          agency: calculation.expenses.agency,
                          appraisal: calculation.expenses.appraisal,
                          total: calculation.expenses.total
                        }
                      },
                      { label: "Importe a financiar", amount: calculation.amountToFinance, color: "bg-slate-200", bold: true },
                      { label: "Intereses totales (est.)", amount: calculation.totalInterestsVar, color: "bg-red-100" },
                    ]}
                  />

                  <div className="mt-auto pt-4">
                     <AmortizationModal 
                      amount={calculation.amountToFinance} 
                      rate={calculation.tinVarRest} 
                      years={years} 
                      title="Cuadro de Amortización (Variable - Estimado)"
                      note="*El cuadro muestra la proyección con el tipo actual (Euríbor + Diferencial)"
                    />
                  </div>
                </TabsContent>

              </div>
              
              <div className="bg-emerald-50 p-6 text-center space-y-4">
                <p className="text-xs text-slate-500 leading-tight px-2">
                   La cuota mostrada es una estimación basada en condiciones competitivas de mercado. Al continuar podremos calcularte ofertas reales adaptadas a tu perfil.
                </p>
                <h3 className="font-bold text-slate-800 text-lg">
                  Continúa la simulación y consigue ofertas de hipoteca de distintos bancos
                </h3>
                <Button className="w-full h-12 text-lg bg-secondary hover:bg-emerald-600 font-bold shadow-md">
                  Consígueme esta hipoteca
                </Button>
                <p className="text-xs text-slate-500">Te ayudamos - Gratis y sin compromiso</p>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BreakdownList({ items }: { items: { label: string, amount: number, color?: string, bold?: boolean, tooltip?: any }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-3">
            {item.color && <div className={`w-3 h-3 rounded-full ${item.color}`} />}
            <span className="text-slate-600">{item.label}</span>
            {item.tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-3 h-3 text-slate-400" />
                  </TooltipTrigger>
                  <TooltipContent className="p-4 max-w-xs bg-white text-slate-800 border shadow-xl z-50">
                    <p className="font-bold mb-2">Desglose de gastos:</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between gap-4">
                        <span>Impuestos ({item.tooltip.taxesRate}%):</span>
                        <span>{item.tooltip.taxes.toLocaleString("es-ES", { maximumFractionDigits: 0 })} €</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Notaría:</span>
                        <span>{item.tooltip.notary.toLocaleString("es-ES", { maximumFractionDigits: 0 })} €</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Registro:</span>
                        <span>{item.tooltip.registry.toLocaleString("es-ES", { maximumFractionDigits: 0 })} €</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Gestoría:</span>
                        <span>{item.tooltip.agency.toLocaleString("es-ES", { maximumFractionDigits: 0 })} €</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Tasación:</span>
                        <span>{item.tooltip.appraisal.toLocaleString("es-ES", { maximumFractionDigits: 0 })} €</span>
                      </div>
                      <div className="border-t pt-1 mt-1 font-bold flex justify-between gap-4">
                        <span>Total:</span>
                        <span>{item.tooltip.total.toLocaleString("es-ES", { maximumFractionDigits: 0 })} €</span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <span className={`font-medium ${item.bold ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
            {item.amount.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
          </span>
        </div>
      ))}
    </div>
  )
}

function AmortizationModal({ amount, rate, years, title, note }: { amount: number, rate: number, years: number, title: string, note?: string }) {
  // Generate simplified table (yearly)
  const rows = useMemo(() => {
    const r = rate / 100 / 12
    const n = years * 12
    const quota = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    
    let balance = amount
    const yearlyData = []
    
    for (let y = 1; y <= years; y++) {
      let interestYear = 0
      let principalYear = 0
      
      for (let m = 0; m < 12; m++) {
        const interest = balance * r
        const principal = quota - interest
        balance -= principal
        interestYear += interest
        principalYear += principal
      }
      
      yearlyData.push({
        year: y,
        quota: quota * 12,
        interest: interestYear,
        principal: principalYear,
        balance: Math.max(0, balance)
      })
    }
    return yearlyData
  }, [amount, rate, years])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-semibold">
          Amortización de la hipoteca
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto pr-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Año</TableHead>
                <TableHead>Cuota Anual</TableHead>
                <TableHead>Intereses</TableHead>
                <TableHead>Amortizado</TableHead>
                <TableHead className="text-right">Pendiente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.year}>
                  <TableCell className="font-bold">{row.year}</TableCell>
                  <TableCell>{row.quota.toLocaleString("es-ES", { maximumFractionDigits: 0 })} €</TableCell>
                  <TableCell>{row.interest.toLocaleString("es-ES", { maximumFractionDigits: 0 })} €</TableCell>
                  <TableCell className="text-emerald-600">{row.principal.toLocaleString("es-ES", { maximumFractionDigits: 0 })} €</TableCell>
                  <TableCell className="text-right font-medium">{row.balance.toLocaleString("es-ES", { maximumFractionDigits: 0 })} €</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {note && <p className="text-xs text-slate-400 mt-2">{note}</p>}
      </DialogContent>
    </Dialog>
  )
}
