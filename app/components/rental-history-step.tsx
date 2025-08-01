"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FormData } from "../page"

interface RentalHistoryStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function RentalHistoryStep({ formData, updateFormData }: RentalHistoryStepProps) {
  const handleChange = (field: keyof FormData, value: string) => {
    updateFormData({ [field]: value })
  }

  return (
    <div className="space-y-8">
      {/* Rental History */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-purple-800 border-b border-purple-200 pb-2">
          Previous Rental Information
        </h3>

        <div className="space-y-2">
          <Label htmlFor="previousAddress" className="text-sm font-medium text-gray-700">
            Previous Address
          </Label>
          <Input
            id="previousAddress"
            value={formData.previousAddress}
            onChange={(e) => handleChange("previousAddress", e.target.value)}
            className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="previousLandlord" className="text-sm font-medium text-gray-700">
              Previous Landlord Name
            </Label>
            <Input
              id="previousLandlord"
              value={formData.previousLandlord}
              onChange={(e) => handleChange("previousLandlord", e.target.value)}
              className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="previousLandlordPhone" className="text-sm font-medium text-gray-700">
              Previous Landlord Phone
            </Label>
            <Input
              id="previousLandlordPhone"
              type="tel"
              value={formData.previousLandlordPhone}
              onChange={(e) => handleChange("previousLandlordPhone", e.target.value)}
              className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="previousRent" className="text-sm font-medium text-gray-700">
              Previous Monthly Rent
            </Label>
            <Input
              id="previousRent"
              type="number"
              placeholder="1500"
              value={formData.previousRent}
              onChange={(e) => handleChange("previousRent", e.target.value)}
              className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reasonForLeaving" className="text-sm font-medium text-gray-700">
              Reason for Leaving
            </Label>
            <Input
              id="reasonForLeaving"
              value={formData.reasonForLeaving}
              onChange={(e) => handleChange("reasonForLeaving", e.target.value)}
              className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* References */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-orange-800 border-b border-orange-200 pb-2">Personal References</h3>

        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-orange-800">Reference 1</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ref1Name" className="text-sm font-medium text-gray-700">
                Name
              </Label>
              <Input
                id="ref1Name"
                value={formData.ref1Name}
                onChange={(e) => handleChange("ref1Name", e.target.value)}
                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref1Phone" className="text-sm font-medium text-gray-700">
                Phone
              </Label>
              <Input
                id="ref1Phone"
                type="tel"
                value={formData.ref1Phone}
                onChange={(e) => handleChange("ref1Phone", e.target.value)}
                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref1Relationship" className="text-sm font-medium text-gray-700">
                Relationship
              </Label>
              <Input
                id="ref1Relationship"
                value={formData.ref1Relationship}
                onChange={(e) => handleChange("ref1Relationship", e.target.value)}
                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-red-800">Reference 2</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ref2Name" className="text-sm font-medium text-gray-700">
                Name
              </Label>
              <Input
                id="ref2Name"
                value={formData.ref2Name}
                onChange={(e) => handleChange("ref2Name", e.target.value)}
                className="border-gray-200 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref2Phone" className="text-sm font-medium text-gray-700">
                Phone
              </Label>
              <Input
                id="ref2Phone"
                type="tel"
                value={formData.ref2Phone}
                onChange={(e) => handleChange("ref2Phone", e.target.value)}
                className="border-gray-200 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref2Relationship" className="text-sm font-medium text-gray-700">
                Relationship
              </Label>
              <Input
                id="ref2Relationship"
                value={formData.ref2Relationship}
                onChange={(e) => handleChange("ref2Relationship", e.target.value)}
                className="border-gray-200 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
