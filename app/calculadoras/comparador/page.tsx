import { FixedMixedCalculator } from "@/components/calculators/FixedMixedCalculator"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/calculadoras" className="inline-flex items-center text-slate-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a herramientas
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-purple-50/50 p-8 border-b border-slate-100">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Comparador Fija vs Mixta</h1>
            <p className="text-slate-500">Analiza qué opción te conviene más a largo plazo.</p>
          </div>
          <div className="p-8">
            <FixedMixedCalculator />
          </div>
        </div>
      </div>
    </div>
  )
}
