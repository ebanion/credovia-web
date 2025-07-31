import { FormData } from '../MortgageWizardModal'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

interface Step3Props {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

export function Step3Savings({ formData, updateFormData }: Step3Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleApplicantsChange = (numberOfApplicants: number) => {
    const currentApplicants = formData.applicants
    let newApplicants = [...currentApplicants]

    if (numberOfApplicants > currentApplicants.length) {
      // Add new applicant
      newApplicants.push({ workSituation: '', monthlyIncome: 3000 })
    } else if (numberOfApplicants < currentApplicants.length) {
      // Remove applicant
      newApplicants = newApplicants.slice(0, numberOfApplicants)
    }

    updateFormData({ 
      numberOfApplicants,
      applicants: newApplicants
    })
  }

  return (
    <div className="space-y-8">
      {/* Available Savings */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          ¿Cuánto ahorro tienes disponible?
        </h3>
        <div className="space-y-4">
          <div className="px-4 py-3 bg-purple-50 rounded-lg border">
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(formData.availableSavings)}
            </div>
          </div>
          <Slider
            value={[formData.availableSavings]}
            onValueChange={(value) => updateFormData({ availableSavings: value[0] })}
            max={200000}
            min={0}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>0€</span>
            <span>200.000€</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="savings-over-50k"
            checked={formData.savingsOver50k}
            onCheckedChange={(checked) => updateFormData({ savingsOver50k: !!checked })}
          />
          <label
            htmlFor="savings-over-50k"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Marca esta casilla si tu ahorro es mayor a 50.000€
          </label>
        </div>
      </div>

      {/* Number of Applicants */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          ¿Número de solicitantes?
        </h3>
        <div className="flex gap-4">
          <Button
            variant={formData.numberOfApplicants === 1 ? "default" : "outline"}
            className={`flex-1 h-16 text-lg ${
              formData.numberOfApplicants === 1 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "hover:bg-gray-50"
            }`}
            onClick={() => handleApplicantsChange(1)}
          >
            1 Solicitante
          </Button>
          <Button
            variant={formData.numberOfApplicants === 2 ? "default" : "outline"}
            className={`flex-1 h-16 text-lg ${
              formData.numberOfApplicants === 2 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "hover:bg-gray-50"
            }`}
            onClick={() => handleApplicantsChange(2)}
          >
            2 Solicitantes
          </Button>
        </div>
      </div>
    </div>
  )
}