"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function FixedMixedCalculator() {
  const [amount, setAmount] = useState<string>("")
  const [years, setYears] = useState<string>("")
  const [fixedRate, setFixedRate] = useState<string>("")
  const [mixedInitialRate, setMixedInitialRate] = useState<string>("")
  const [mixedVariableRate, setMixedVariableRate] = useState<string>("")
  
  const [result, setResult] = useState<{ fixed: number; mixedInitial: number; mixedVariable: number } | null>(null)

  const calculateQuota = (p: number, rAnn: number, y: number) => {
    const r = rAnn / 100 / 12
    const n = y * 12
    if (r === 0) return p / n
    return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  }

  const calculate = () => {
    const p = parseFloat(amount)
    const y = parseFloat(years)
    const fR = parseFloat(fixedRate)
    const mIR = parseFloat(mixedInitialRate)
    const mVR = parseFloat(mixedVariableRate)

    if (isNaN(p) || isNaN(y) || isNaN(fR) || isNaN(mIR) || isNaN(mVR) || p <= 0) {
      setResult(null)
      return
    }

    const fixed = calculateQuota(p, fR, y)
    const mixedInitial = calculateQuota(p, mIR, y)
    // Simplified: Assuming variable part applies to the same principal for comparison
    // In reality, principal would be lower after initial term, but for "Monthly Quote Comparison" using full principal gives a fair "what if" for the rates.
    // Or better: calculate quote for the same term but different rate.
    const mixedVariable = calculateQuota(p, mVR, y)

    setResult({ fixed, mixedInitial, mixedVariable })
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="space-y-4 p-0 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="comp-amount">Préstamo (€)</Label>
            <Input id="comp-amount" type="number" placeholder="200000" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comp-years">Plazo (años)</Label>
            <Input id="comp-years" type="number" placeholder="30" value={years} onChange={(e) => setYears(e.target.value)} />
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg space-y-3">
          <p className="font-semibold text-sm text-slate-700">Hipoteca Fija</p>
          <div className="space-y-2">
            <Label htmlFor="comp-fixed">Interés (%)</Label>
            <Input id="comp-fixed" type="number" placeholder="3.5" value={fixedRate} onChange={(e) => setFixedRate(e.target.value)} />
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg space-y-3">
          <p className="font-semibold text-sm text-slate-700">Hipoteca Mixta</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="comp-mixed-init">Inicial (%)</Label>
              <Input id="comp-mixed-init" type="number" placeholder="2.5" value={mixedInitialRate} onChange={(e) => setMixedInitialRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comp-mixed-var">Variable (%)</Label>
              <Input id="comp-mixed-var" type="number" placeholder="4.0" value={mixedVariableRate} onChange={(e) => setMixedVariableRate(e.target.value)} />
            </div>
          </div>
        </div>

        <Button onClick={calculate} className="w-full bg-secondary hover:bg-emerald-600 text-white font-bold">
          Comparar
        </Button>

        {result && (
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
             <div className="p-3 bg-blue-50 rounded border border-blue-100">
               <p className="text-xs text-blue-600 font-bold uppercase mb-1">Fija</p>
               <p className="text-xl font-bold text-slate-800">{result.fixed.toFixed(0)} €</p>
             </div>
             <div className="p-3 bg-emerald-50 rounded border border-emerald-100">
               <p className="text-xs text-emerald-600 font-bold uppercase mb-1">Mixta</p>
               <div className="space-y-1">
                 <p className="text-sm font-medium text-slate-600">Inicio: <span className="text-slate-900 font-bold">{result.mixedInitial.toFixed(0)} €</span></p>
                 <p className="text-sm font-medium text-slate-600">Después: <span className="text-slate-900 font-bold">{result.mixedVariable.toFixed(0)} €</span></p>
               </div>
             </div>
             <p className="col-span-2 text-xs text-slate-400 italic">
               *Cálculo orientativo sobre el capital total.
             </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
