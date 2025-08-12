"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

      {formData.pets === "yes" && (
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
      )}

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
            Preferred Move-in Date *
          </Label>
          <Input
            id="moveInDate"
            type="date"
            value={formData.moveInDate}
            onChange={(e) => handleChange("moveInDate", e.target.value)}
            required
            className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fundsAtHand" className="text-sm font-medium text-gray-700">
            How much do you have at hand to secure the property/move in? *
          </Label>
          <Input
            id="fundsAtHand"
            type="text"
            placeholder="$"
            value={formData.fundsAtHand}
            onChange={(e) => handleChange("fundsAtHand", e.target.value)}
            required
            className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="intendedLeaseTime" className="text-sm font-medium text-gray-700">
            What's your intended time of lease? *
          </Label>
          <Input
            id="intendedLeaseTime"
            type="text"
            placeholder="e.g., 12 months"
            value={formData.intendedLeaseTime}
            onChange={(e) => handleChange("intendedLeaseTime", e.target.value)}
            required
            className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Have you ever declared bankruptcy? *</Label>
        <RadioGroup
          value={formData.declaredBankruptcy}
          onValueChange={(value) => handleChange("declaredBankruptcy", value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="bankruptcy-yes" />
            <Label htmlFor="bankruptcy-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="bankruptcy-no" />
            <Label htmlFor="bankruptcy-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-yellow-900 font-bold text-lg">$</span>
          </div>
          <div className="flex-1">
            <Label htmlFor="paymentMethod" className="text-base font-semibold text-yellow-900 mb-2 block">
              Payment Information Required *
            </Label>
            <p className="text-sm text-yellow-800 mb-4 leading-relaxed">
              A refundable application fee is required to process the reviewing of the form. How do you want to make the
              payment? <span className="font-medium">(ZELLE, VENMO, PAYPAL, APPLE PAY AND CHIME)</span> Please indicate
              in the given box.
            </p>
          </div>
        </div>
        <Textarea
          id="paymentMethod"
          value={formData.paymentMethod}
          onChange={(e) => handleChange("paymentMethod", e.target.value)}
          required
          className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 bg-white"
          placeholder="e.g., ZELLE - [your details here]"
          rows={3}
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
            By submitting this application you agree:
            <br />
            1) The information provided herein is complete and accurate. Providing incomplete and/or false information
            could result in the rejection of the application.
            <br />
            2) Submission of this application does not guarantee a room lease, which is reserved only upon signing of a
            completed lease agreement by all parties. Additionally, no other agreements, either written or oral, are
            binding on applicant, owner or owner's agents until the completed lease agreement is signed by all parties.
            <br />
            3) Additional information may be required in order to process your application. Our management team will
            contact you upon receipt of this online application to obtain any additional information necessary to
            complete the processing of your application. *
          </Label>
        </div>
      </div>
    </div>
  )
}
