'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Step1SearchStatus } from './wizard-steps/Step1SearchStatus'
import { Step2MortgageDetails } from './wizard-steps/Step2MortgageDetails'
import { Step3Savings } from './wizard-steps/Step3Savings'
import { Step4ApplicantData } from './wizard-steps/Step4ApplicantData'
import { Step5ContactData } from './wizard-steps/Step5ContactData'

export interface FormData {
  // Step 1
  searchStatus: string
  propertyLocation: string
  
  // Step 2
  propertyPrice: number
  priceOver300k: boolean
  financeAmount: number
  finance100Plus: boolean
  
  // Step 3
  availableSavings: number
  savingsOver50k: boolean
  numberOfApplicants: number
  
  // Step 4
  applicants: Array<{
    workSituation: string
    monthlyIncome: number
  }>
  
  // Step 5
  fullName: string
  email: string
  phone: string
  acceptTerms: boolean
}

interface MortgageWizardModalProps {
  isOpen: boolean
  onClose: () => void
}

const TOTAL_STEPS = 5

export function MortgageWizardModal({ isOpen, onClose }: MortgageWizardModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    searchStatus: '',
    propertyLocation: '',
    propertyPrice: 300000,
    priceOver300k: false,
    financeAmount: 80,
    finance100Plus: false,
    availableSavings: 50000,
    savingsOver50k: false,
    numberOfApplicants: 1,
    applicants: [{ workSituation: '', monthlyIncome: 3000 }],
    fullName: '',
    email: '',
    phone: '',
    acceptTerms: false
  })

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    console.log('Form submitted with data:', formData)
    
    // Simulate API call
    try {
      // const response = await fetch('/api/mortgage-simulation', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      alert('¡Formulario enviado correctamente! Revisa la consola para ver los datos.')
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.searchStatus && formData.propertyLocation
      case 2:
        return formData.propertyPrice > 0
      case 3:
        return formData.availableSavings >= 0
      case 4:
        return formData.applicants.every(app => app.workSituation && app.monthlyIncome > 0)
      case 5:
        return formData.fullName && formData.email && formData.phone && formData.acceptTerms
      default:
        return false
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Estado de búsqueda'
      case 2: return 'Hipoteca deseada'
      case 3: return 'Ahorros disponibles'
      case 4: return 'Datos de solicitantes'
      case 5: return 'Datos de contacto'
      default: return ''
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1SearchStatus formData={formData} updateFormData={updateFormData} />
      case 2:
        return <Step2MortgageDetails formData={formData} updateFormData={updateFormData} />
      case 3:
        return <Step3Savings formData={formData} updateFormData={updateFormData} />
      case 4:
        return <Step4ApplicantData formData={formData} updateFormData={updateFormData} />
      case 5:
        return <Step5ContactData formData={formData} updateFormData={updateFormData} />
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Simulador de Hipoteca
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Paso {currentStep} de {TOTAL_STEPS}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <Progress value={(currentStep / TOTAL_STEPS) * 100} className="h-2" />
        </div>

        {/* Step Title */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{getStepTitle()}</h2>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          {currentStep === TOTAL_STEPS ? (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              Enviar solicitud
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}