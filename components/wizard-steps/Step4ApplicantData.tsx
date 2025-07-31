import { FormData } from '../MortgageWizardModal'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

interface Step4Props {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

const WORK_SITUATIONS = [
  { value: 'funcionario', label: 'Funcionario' },
  { value: 'contrato_fijo', label: 'Contrato fijo' },
  { value: 'pensionista', label: 'Pensionista' },
  { value: 'interino', label: 'Interino' },
  { value: 'desempleado', label: 'Desempleado' },
  { value: 'autonomo', label: 'Autónomo' },
  { value: 'contrato_temporal', label: 'Contrato temporal' },
  { value: 'otro', label: 'Otro' }
]

export function Step4ApplicantData({ formData, updateFormData }: Step4Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const updateApplicantData = (index: number, field: 'workSituation' | 'monthlyIncome', value: string | number) => {
    const newApplicants = [...formData.applicants]
    newApplicants[index] = {
      ...newApplicants[index],
      [field]: value
    }
    updateFormData({ applicants: newApplicants })
  }

  return (
    <div className="space-y-8">
      {formData.applicants.map((applicant, index) => (
        <div key={index} className="p-6 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            {formData.numberOfApplicants === 1 ? 'Datos del solicitante' : `Solicitante ${index + 1}`}
          </h3>
          
          <div className="space-y-6">
            {/* Work Situation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Situación laboral
              </label>
              <Select
                value={applicant.workSituation}
                onValueChange={(value) => updateApplicantData(index, 'workSituation', value)}
              >
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Selecciona tu situación laboral" />
                </SelectTrigger>
                <SelectContent>
                  {WORK_SITUATIONS.map((situation) => (
                    <SelectItem key={situation.value} value={situation.value}>
                      {situation.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Income */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingresos netos mensuales
              </label>
              <div className="space-y-4">
                <div className="px-4 py-3 bg-green-50 rounded-lg border">
                  <div className="text-xl font-bold text-green-600">
                    {formatCurrency(applicant.monthlyIncome)}
                  </div>
                </div>
                <Slider
                  value={[applicant.monthlyIncome]}
                  onValueChange={(value) => updateApplicantData(index, 'monthlyIncome', value[0])}
                  max={10000}
                  min={600}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>600€</span>
                  <span>10.000€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}