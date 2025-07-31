// app/simulador/page.tsx
"use client"

import { useState } from "react"

export default function SimuladorPage() {
  const [cantidad, setCantidad] = useState("")
  const [plazo, setPlazo] = useState("")
  const [resultado, setResultado] = useState<number | null>(null)

  const calcularSimulacion = () => {
    const c = parseFloat(cantidad)
    const p = parseInt(plazo)
    if (isNaN(c) || isNaN(p) || c <= 0 || p <= 0) return
    const interes = 0.03
    const cuota = (c * interes * (1 + interes) ** p) / ((1 + interes) ** p - 1)
    setResultado(cuota)
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
        Simula tu Hipoteca
      </h1>

      <div className="mb-4">
        <label className="block font-medium mb-1">Cantidad solicitada (€):</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Ej: 150000"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Plazo (meses):</label>
        <input
          type="number"
          value={plazo}
          onChange={(e) => setPlazo(e.target.value)}
          placeholder="Ej: 300"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <button
        onClick={calcularSimulacion}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded"
      >
        Calcular cuota
      </button>

      {resultado !== null && (
        <div className="mt-6 text-lg text-center">
          Tu cuota mensual estimada sería de:<br />
          <span className="text-2xl font-bold text-green-600">
            {resultado.toFixed(2)} €
          </span>
        </div>
      )}
    </div>
  )
}
