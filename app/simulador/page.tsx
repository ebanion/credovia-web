"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MortgageCalculator from "./_components/MortgageCalculator"
import MortgageRequestForm from "@/components/mortgage-request-form"
import { FileText, Calculator } from "lucide-react"

function SimuladorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState("request")

  useEffect(() => {
    if (tabParam === "calculator") {
      setActiveTab("calculator")
    } else {
      setActiveTab("request")
    }
  }, [tabParam])

  const handleTabChange = (val: string) => {
     setActiveTab(val)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="flex h-16 items-center justify-between">
              <h1 className="text-xl font-bold text-slate-900 mr-8 hidden sm:block">Credovia</h1>
              <TabsList className="bg-transparent h-16 p-0 w-full sm:w-auto flex justify-start space-x-8">
                <TabsTrigger 
                  value="request"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600 data-[state=active]:shadow-none px-1 font-medium text-slate-500 hover:text-slate-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Nueva Hipoteca
                </TabsTrigger>
                <TabsTrigger 
                  value="calculator"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600 data-[state=active]:shadow-none px-1 font-medium text-slate-500 hover:text-slate-700"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculadora
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="py-8">
              <TabsContent value="request" className="mt-0 focus-visible:outline-none">
                <MortgageRequestForm />
              </TabsContent>
              <TabsContent value="calculator" className="mt-0 focus-visible:outline-none">
                <MortgageCalculator />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default function SimuladorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Cargando...</div>}>
      <SimuladorContent />
    </Suspense>
  )
}
