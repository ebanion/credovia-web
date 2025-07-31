import { FormData } from '../MortgageWizardModal'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Step1Props {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

const SPANISH_REGIONS = [
  'Andalucía',
  'Aragón',
  'Asturias',
  'Baleares',
  'Canarias',
  'Cantabria',
  'Castilla-La Mancha',
  'Castilla y León',
  'Cataluña',
  'Comunidad Valenciana',
  'Extremadura',
  'Galicia',
  'La Rioja',
  'Madrid',
  'Murcia',
  'Navarra',
  'País Vasco',
  'Ceuta',
  'Melilla'
]

const SEARCH_STATUS_OPTIONS = [
  { value: 'searching', label: 'Estoy en ello' },
  { value: 'reserved', label: 'Acabo de reservar' },
  { value: 'pending_deposit', label: 'Pendiente de hacer arras' }
]

export function Step1SearchStatus({ formData, updateFormData }: Step1Props) {
  return (
    <div className="space-y-8">
      {/* Search Status Question */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          ¿Cómo llevas la búsqueda de la vivienda?
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {SEARCH_STATUS_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={formData.searchStatus === option.value ? "default" : "outline"}
              className={`justify-start h-auto p-4 text-left ${
                formData.searchStatus === option.value 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "hover:bg-gray-50"
              }`}
              onClick={() => updateFormData({ searchStatus: option.value })}
            >
              <div>
                <div className="font-medium">{option.label}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Property Location Question */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          ¿Dónde estaría el inmueble?
        </h3>
        <Select
          value={formData.propertyLocation}
          onValueChange={(value) => updateFormData({ propertyLocation: value })}
        >
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Selecciona una comunidad autónoma" />
          </SelectTrigger>
          <SelectContent>
            {SPANISH_REGIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}