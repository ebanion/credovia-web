import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Wallet, Percent, FileText, ArrowLeft } from "lucide-react"

const calculators = [
  {
    href: "/calculadoras/cuota",
    title: "Cuota Mensual",
    description: "Calcula cuánto pagarás cada mes según el importe y tipo de interés.",
    icon: Calculator,
    color: "text-blue-600",
    bg: "bg-blue-50",
    btnText: "Calcular cuota"
  },
  {
    href: "/calculadoras/gastos",
    title: "Gastos de Compra",
    description: "Estima los impuestos, notaría y registro de tu futura vivienda.",
    icon: Wallet,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    btnText: "Calcular gastos"
  },
  {
    href: "/calculadoras/comparador",
    title: "Fija vs Mixta",
    description: "Compara qué opción te interesa más según los tipos actuales.",
    icon: Percent,
    color: "text-purple-600",
    bg: "bg-purple-50",
    btnText: "Comparar hipotecas"
  },
  {
    href: "/calculadoras/amortizacion",
    title: "Tabla de Amortización",
    description: "Visualiza cómo evoluciona tu deuda mes a mes.",
    icon: FileText,
    color: "text-orange-600",
    bg: "bg-orange-50",
    btnText: "Ver tabla"
  }
]

export default function CalculatorsIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-slate-500 hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al inicio
          </Link>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Herramientas y Calculadoras</h1>
          <p className="text-xl text-slate-500 max-w-2xl">
            Toma mejores decisiones financieras con nuestras herramientas gratuitas. Sin registros ni letra pequeña.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {calculators.map((calc) => (
            <Card key={calc.href} className="border-2 border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${calc.bg}`}>
                  <calc.icon className={`w-6 h-6 ${calc.color}`} />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{calc.title}</CardTitle>
                  <CardDescription className="text-base">{calc.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Link href={calc.href}>
                  <Button className="w-full bg-slate-900 text-white hover:bg-primary" size="lg">
                    {calc.btnText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
