"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function QuotaCalculator() {
  const [amount, setAmount] = useState<string>("")
  const [interest, setInterest] = useState<string>("")
  const [years, setYears] = useState<string>("")
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const p = parseFloat(amount)
    const i = parseFloat(interest)
    const y = parseFloat(years)

    if (isNaN(p) || isNaN(i) || isNaN(y) || p <= 0 || y <= 0) {
      setResult(null)
      return
    }

    const r = i / 100 / 12
    const n = y * 12

    if (r === 0) {
      setResult(p / n)
    } else {
      const quota = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      setResult(quota)
    }
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="space-y-4 p-0 pt-4">
        <div className="grid gap-2">
          <Label htmlFor="quota-amount">Importe del préstamo (€)</Label>
          <Input
            id="quota-amount"
            type="number"
            placeholder="Ej: 200000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="quota-interest">Interés anual (%)</Label>
            <Input
              id="quota-interest"
              type="number"
              placeholder="Ej: 3.5"
              step="0.01"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quota-years">Plazo (años)</Label>
            <Input
              id="quota-years"
              type="number"
              placeholder="Ej: 30"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={calculate} className="w-full bg-secondary hover:bg-emerald-600 text-white font-bold">
          Calcular cuota
        </Button>
        {result !== null && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg text-center">
            <p className="text-sm text-slate-500">Cuota mensual estimada</p>
            <p className="text-3xl font-bold text-primary">
              {result.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
