import { FormData } from '../MortgageWizardModal'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'

interface Step2Props {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

export function Step2MortgageDetails({ formData, updateFormData }: Step2Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value}%`
  }

  return (
    <div className="space-y-8">
      {/* Property Price */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          ¿Cuál es el precio de la vivienda?
        </h3>
        <div className="space-y-4">
          <div className="px-4 py-3 bg-blue-50 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(formData.propertyPrice)}
            </div>
          </div>
          <Slider
            value={[formData.propertyPrice]}
            onValueChange={(value) => updateFormData({ propertyPrice: value[0] })}
            max={1000000}
            min={50000}
            step={10000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>50.000€</span>
            <span>1.000.000€</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="price-over-300k"
            checked={formData.priceOver300k}
            onCheckedChange={(checked) => updateFormData({ priceOver300k: !!checked })}
          />
          <label
            htmlFor="price-over-300k"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Marca esta casilla si el precio supera 300.000 euros
          </label>
        </div>
      </div>

      {/* Finance Amount */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          ¿Qué importe se busca financiar?
        </h3>
        <div className="space-y-4">
          <div className="px-4 py-3 bg-green-50 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">
              {formatPercentage(formData.financeAmount)}
            </div>
            <div className="text-sm text-gray-600">
              {formatCurrency((formData.propertyPrice * formData.financeAmount) / 100)}
            </div>
          </div>
          <Slider
            value={[formData.financeAmount]}
            onValueChange={(value) => updateFormData({ financeAmount: value[0] })}
            max={100}
            min={20}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>20%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="finance-100-plus"
            checked={formData.finance100Plus}
            onCheckedChange={(checked) => updateFormData({ finance100Plus: !!checked })}
          />
          <label
            htmlFor="finance-100-plus"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Marca esta casilla si buscas un 100% + gastos
          </label>
        </div>
      </div>
    </div>
  )
}