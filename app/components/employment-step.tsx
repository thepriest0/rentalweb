"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FormData } from "../page"

interface EmploymentStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function EmploymentStep({ formData, updateFormData }: EmploymentStepProps) {
  const handleChange = (field: keyof FormData, value: string) => {
    updateFormData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employmentStatus" className="text-sm font-medium text-gray-700">
            Employment Status *
          </Label>
          <Select value={formData.employmentStatus} onValueChange={(value) => handleChange("employmentStatus", value)}>
            <SelectTrigger className="border-gray-200 focus:border-green-500 focus:ring-green-500">
              <SelectValue placeholder="Select employment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="self-employed">Self-employed</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-700">
            Monthly Gross Income *
          </Label>
          <Input
            id="monthlyIncome"
            type="number"
            placeholder="5000"
            value={formData.monthlyIncome}
            onChange={(e) => handleChange("monthlyIncome", e.target.value)}
            required
            className="border-gray-200 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="employer" className="text-sm font-medium text-gray-700">
          Employer Name
        </Label>
        <Input
          id="employer"
          value={formData.employer}
          onChange={(e) => handleChange("employer", e.target.value)}
          className="border-gray-200 focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="employerAddress" className="text-sm font-medium text-gray-700">
          Employer Address
        </Label>
        <Input
          id="employerAddress"
          value={formData.employerAddress}
          onChange={(e) => handleChange("employerAddress", e.target.value)}
          className="border-gray-200 focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
          Job Title
        </Label>
        <Input
          id="jobTitle"
          value={formData.jobTitle}
          onChange={(e) => handleChange("jobTitle", e.target.value)}
          className="border-gray-200 focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="employmentLength" className="text-sm font-medium text-gray-700">
          Length of Employment
        </Label>
        <Input
          id="employmentLength"
          placeholder="e.g., 3 years"
          value={formData.employmentLength}
          onChange={(e) => handleChange("employmentLength", e.target.value)}
          className="border-gray-200 focus:border-green-500 focus:ring-green-500"
        />
      </div>
    </div>
  )
}
