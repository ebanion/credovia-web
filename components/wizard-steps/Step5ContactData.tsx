import { FormData } from '../MortgageWizardModal'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

interface Step5Props {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

const COUNTRY_CODES = [
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+33', country: 'Francia', flag: '🇫🇷' },
  { code: '+49', country: 'Alemania', flag: '🇩🇪' },
  { code: '+39', country: 'Italia', flag: '🇮🇹' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+44', country: 'Reino Unido', flag: '🇬🇧' },
  { code: '+1', country: 'Estados Unidos', flag: '🇺🇸' },
]

export function Step5ContactData({ formData, updateFormData }: Step5Props) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+34')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value)
    updateFormData({ phone: `${selectedCountryCode} ${value}` })
  }

  const handleCountryCodeChange = (code: string) => {
    setSelectedCountryCode(code)
    updateFormData({ phone: `${code} ${phoneNumber}` })
  }

  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          Nombre y apellidos *
        </label>
        <Input
          id="fullName"
          type="text"
          placeholder="Introduce tu nombre completo"
          value={formData.fullName}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
          className="h-12"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Correo electrónico *
        </label>
        <Input
          id="email"
          type="email"
          placeholder="ejemplo@correo.com"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className="h-12"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Teléfono móvil *
        </label>
        <div className="flex gap-2">
          <Select value={selectedCountryCode} onValueChange={handleCountryCodeChange}>
            <SelectTrigger className="w-32 h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_CODES.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <div className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.code}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="phone"
            type="tel"
            placeholder="123 456 789"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className="flex-1 h-12"
          />
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="pt-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="accept-terms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => updateFormData({ acceptTerms: !!checked })}
            className="mt-1"
          />
          <label
            htmlFor="accept-terms"
            className="text-sm text-gray-600 leading-relaxed cursor-pointer"
          >
            Acepto los{' '}
            <a href="#" className="text-blue-600 hover:underline">
              términos y condiciones
            </a>{' '}
            y la{' '}
            <a href="#" className="text-blue-600 hover:underline">
              política de privacidad
            </a>
            . Autorizo el tratamiento de mis datos personales para recibir información comercial sobre productos y servicios financieros.
          </label>
        </div>
      </div>

      {/* Information Note */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>ℹ️ Información:</strong> Nos pondremos en contacto contigo en un plazo máximo de 24 horas para ofrecerte las mejores opciones de hipoteca adaptadas a tu perfil.
        </p>
      </div>
    </div>
  )
}