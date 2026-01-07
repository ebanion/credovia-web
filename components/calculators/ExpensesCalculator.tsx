"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ExpensesCalculator() {
  const [price, setPrice] = useState<string>("")
  const [percentage, setPercentage] = useState<string>("10")
  const [result, setResult] = useState<{ expenses: number; total: number } | null>(null)

  const calculate = () => {
    const p = parseFloat(price)
    const pct = parseFloat(percentage)

    if (isNaN(p) || isNaN(pct) || p <= 0) {
      setResult(null)
      return
    }

    const expenses = p * (pct / 100)
    const total = p + expenses
    setResult({ expenses, total })
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="space-y-4 p-0 pt-4">
        <div className="grid gap-2">
          <Label htmlFor="exp-price">Precio de la vivienda (€)</Label>
          <Input
            id="exp-price"
            type="number"
            placeholder="Ej: 300000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="exp-percent">Gastos estimados (%)</Label>
          <Input
            id="exp-percent"
            type="number"
            placeholder="Ej: 10"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
        </div>
        <Button onClick={calculate} className="w-full bg-secondary hover:bg-emerald-600 text-white font-bold">
          Calcular gastos
        </Button>
        {result && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg space-y-2 text-center">
            <div>
              <p className="text-sm text-slate-500">Gastos estimados</p>
              <p className="text-xl font-bold text-slate-700">
                {result.expenses.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <p className="text-sm text-slate-500">Coste total (Precio + Gastos)</p>
              <p className="text-2xl font-bold text-primary">
                {result.total.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
