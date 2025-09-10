"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { submitApplication } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Home } from "lucide-react"

export interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  currentAddress: string
  city: string
  state: string
  zipCode: string
  timeAtCurrentAddress: string
  reasonForMoving: string

  // Employment Information
  employmentStatus: string
  monthlyIncome: string
  employer: string
  employerAddress: string
  jobTitle: string
  employmentLength: string

  // Additional Information
  pets: string
  smoking: string
  petDetails: string
  occupants: string
  moveInDate: string
  fundsAtHand: string
  intendedLeaseTime: string
  declaredBankruptcy: string
  paymentMethod: string
  agreement: boolean
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  currentAddress: "",
  city: "",
  state: "",
  zipCode: "",
  timeAtCurrentAddress: "",
  reasonForMoving: "",
  employmentStatus: "",
  monthlyIncome: "",
  employer: "",
  employerAddress: "",
  jobTitle: "",
  employmentLength: "",
  pets: "",
  smoking: "",
  petDetails: "",
  occupants: "",
  moveInDate: "",
  fundsAtHand: "",
  intendedLeaseTime: "",
  declaredBankruptcy: "",
  paymentMethod: "",
  agreement: false,
}

export default function RentalApplication() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    updateFormData({ [field]: value })
  }

  const validateForm = (): boolean => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "dateOfBirth",
      "currentAddress",
      "city",
      "state",
      "zipCode",
      "employmentStatus",
      "monthlyIncome",
      "moveInDate",
      "fundsAtHand",
      "intendedLeaseTime",
      "declaredBankruptcy",
      "paymentMethod",
    ]

    for (const field of requiredFields) {
      const value = formData[field as keyof FormData]
      if (!value || (typeof value === "string" && value.trim() === "")) {
        return false
      }
    }

    return formData.agreement
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Please complete all required fields",
        description: "Fill in all required fields and agree to the terms before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const result = await submitApplication(formData)
      if (result.success) {
        toast({
          title: "Application Submitted Successfully! 🎉",
          description: "We've received your rental application and will review it shortly.",
        })
        // Reset form
        setFormData(initialFormData)
        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "Please try again or contact us for assistance.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Something went wrong",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Rental Application</h1>
              <p className="text-gray-600">Find your perfect home with us</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Personal Information</CardTitle>
              <CardDescription className="text-blue-100">Basic information about yourself</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                    Date of Birth *
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeAtCurrentAddress" className="text-sm font-medium text-gray-700">
                    Time at Current Address
                  </Label>
                  <Input
                    id="timeAtCurrentAddress"
                    placeholder="e.g., 2 years 3 months"
                    value={formData.timeAtCurrentAddress}
                    onChange={(e) => handleChange("timeAtCurrentAddress", e.target.value)}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentAddress" className="text-sm font-medium text-gray-700">
                  Current Address *
                </Label>
                <Input
                  id="currentAddress"
                  value={formData.currentAddress}
                  onChange={(e) => handleChange("currentAddress", e.target.value)}
                  required
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                    City *
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                    State *
                  </Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                    ZIP Code *
                  </Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleChange("zipCode", e.target.value)}
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reasonForMoving" className="text-sm font-medium text-gray-700">
                  Reason for Moving
                </Label>
                <Input
                  id="reasonForMoving"
                  value={formData.reasonForMoving}
                  onChange={(e) => handleChange("reasonForMoving", e.target.value)}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Employment Information Section */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Employment Information</CardTitle>
              <CardDescription className="text-green-100">Work and income details</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus" className="text-sm font-medium text-gray-700">
                    Employment Status *
                  </Label>
                  <Select
                    value={formData.employmentStatus}
                    onValueChange={(value) => handleChange("employmentStatus", value)}
                  >
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
            </CardContent>
          </Card>

          {/* Additional Information Section */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Additional Information</CardTitle>
              <CardDescription className="text-purple-100">Final details and agreement</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pets" className="text-sm font-medium text-gray-700">
                    Do you have pets?
                  </Label>
                  <Select value={formData.pets} onValueChange={(value) => handleChange("pets", value)}>
                    <SelectTrigger className="border-gray-200 focus:border-purple-500 focus:ring-purple-500">
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
                    <SelectTrigger className="border-gray-200 focus:border-purple-500 focus:ring-purple-500">
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
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
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
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
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
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
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
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
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
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
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
                      A refundable application fee is required to process the reviewing of the form. How do you want to
                      make the payment? <span className="font-medium">(ZELLE, VENMO, PAYPAL, APPLE PAY AND CHIME)</span>{" "}
                      Please indicate in the given box.
                    </p>
                  </div>
                </div>
                <Input
                  id="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={(e) => handleChange("paymentMethod", e.target.value)}
                  required
                  className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 bg-white"
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
                    1) The information provided herein is complete and accurate. Providing incomplete and/or false
                    information could result in the rejection of the application.
                    <br />
                    2) Submission of this application does not guarantee a room lease, which is reserved only upon
                    signing of a completed lease agreement by all parties. Additionally, no other agreements, either
                    written or oral, are binding on applicant, owner or owner's agents until the completed lease
                    agreement is signed by all parties.
                    <br />
                    3) Additional information may be required in order to process your application. Our management team
                    will contact you upon receipt of this online application to obtain any additional information
                    necessary to complete the processing of your application. *
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg"
            >
              {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isSubmitting ? "Submitting Application..." : "Submit Application"}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Your information is secure and will only be used for rental application purposes.</p>
          <p className="mt-1">Questions? Contact us at support@rentalapp.com</p>
        </div>
      </div>
    </div>
  )
}
