"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { FormData } from "../page"

interface AdditionalInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function AdditionalInfoStep({ formData, updateFormData }: AdditionalInfoStepProps) {
  const handleChange = (field: keyof FormData, value: string | boolean) => {
    updateFormData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pets" className="text-sm font-medium text-gray-700">
            Do you have pets?
          </Label>
          <Select value={formData.pets} onValueChange={(value) => handleChange("pets", value)}>
            <SelectTrigger className="border-gray-200 focus:border-teal-500 focus:ring-teal-500">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="smoking" className="text-sm font-medium text-gray-700">
            Do you smoke?
          </Label>
          <Select value={formData.smoking} onValueChange={(value) => handleChange("smoking", value)}>
            <SelectTrigger className="border-gray-200 focus:border-teal-500 focus:ring-teal-500">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="petDetails" className="text-sm font-medium text-gray-700">
          If you have pets, please describe (type, breed, weight, etc.)
        </Label>
        <Textarea
          id="petDetails"
          value={formData.petDetails}
          onChange={(e) => handleChange("petDetails", e.target.value)}
          className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="occupants" className="text-sm font-medium text-gray-700">
            Number of occupants (including yourself)
          </Label>
          <Input
            id="occupants"
            type="number"
            min="1"
            value={formData.occupants}
            onChange={(e) => handleChange("occupants", e.target.value)}
            className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="moveInDate" className="text-sm font-medium text-gray-700">
            Desired Move-in Date
          </Label>
          <Input
            id="moveInDate"
            type="date"
            value={formData.moveInDate}
            onChange={(e) => handleChange("moveInDate", e.target.value)}
            className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo" className="text-sm font-medium text-gray-700">
          Additional Information or Comments
        </Label>
        <Textarea
          id="additionalInfo"
          value={formData.additionalInfo}
          onChange={(e) => handleChange("additionalInfo", e.target.value)}
          className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreement"
            checked={formData.agreement}
            onCheckedChange={(checked) => handleChange("agreement", checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="agreement" className="text-sm text-gray-700 leading-relaxed">
            I certify that the information provided is true and complete to the best of my knowledge. I understand that
            any false information may result in rejection of this application. I authorize the verification of all
            information provided and consent to background and credit checks. *
          </Label>
        </div>
      </div>
    </div>
  )
}
