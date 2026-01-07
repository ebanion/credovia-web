"use client"

import { CalculatorsGrid } from "./CalculatorsGrid"

export function CalculatorsSection() {
  return (
    <section className="py-16 bg-white border-t border-slate-100 scroll-mt-20" id="calculadoras">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Calculadoras</h2>
          <p className="text-lg text-slate-500">Herramientas rápidas para estimar tu hipoteca</p>
        </div>
        <CalculatorsGrid />
      </div>
    </section>
  )
}
