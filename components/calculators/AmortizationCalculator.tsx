"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function AmortizationCalculator() {
  const [amount, setAmount] = useState<string>("")
  const [interest, setInterest] = useState<string>("")
  const [years, setYears] = useState<string>("")
  const [table, setTable] = useState<any[]>([])

  const calculate = () => {
    const p = parseFloat(amount)
    const i = parseFloat(interest)
    const y = parseFloat(years)

    if (isNaN(p) || isNaN(i) || isNaN(y) || p <= 0) {
      setTable([])
      return
    }

    const r = i / 100 / 12
    const n = y * 12
    let quota = 0
    if (r === 0) {
      quota = p / n
    } else {
      quota = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    }

    let remaining = p
    const rows = []
    // Show first 12 months
    for (let m = 1; m <= 12; m++) {
      const interestPayment = remaining * r
      const principalPayment = quota - interestPayment
      remaining -= principalPayment
      
      rows.push({
        month: m,
        quota: quota,
        interest: interestPayment,
        principal: principalPayment,
        remaining: Math.max(0, remaining)
      })
    }
    setTable(rows)
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="space-y-4 p-0 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
             <Label htmlFor="amort-amount">Préstamo (€)</Label>
             <Input id="amort-amount" type="number" placeholder="200000" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="space-y-2">
             <Label htmlFor="amort-interest">Interés (%)</Label>
             <Input id="amort-interest" type="number" placeholder="3.5" value={interest} onChange={(e) => setInterest(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
           <Label htmlFor="amort-years">Plazo (años)</Label>
           <Input id="amort-years" type="number" placeholder="30" value={years} onChange={(e) => setYears(e.target.value)} />
        </div>

        <Button onClick={calculate} className="w-full bg-secondary hover:bg-emerald-600 text-white font-bold">
          Ver tabla (primer año)
        </Button>

        {table.length > 0 && (
          <div className="mt-4 border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[50px]">Mes</TableHead>
                  <TableHead>Cuota</TableHead>
                  <TableHead>Interés</TableHead>
                  <TableHead>Amort.</TableHead>
                  <TableHead className="text-right">Pendiente</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell>{row.quota.toFixed(0)}€</TableCell>
                    <TableCell className="text-slate-500">{row.interest.toFixed(0)}€</TableCell>
                    <TableCell className="text-emerald-600 font-medium">{row.principal.toFixed(0)}€</TableCell>
                    <TableCell className="text-right">{row.remaining.toFixed(0)}€</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-2 text-center bg-slate-50 text-xs text-slate-400">
               Mostrando primeros 12 meses
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
