"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { submitApplication } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Home, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"
import { PersonalInfoStep } from "./components/personal-info-step"
import { EmploymentStep } from "./components/employment-step"
import { AdditionalInfoStep } from "./components/additional-info-step"
import { ReviewStep } from "./components/review-step"
import React from "react"

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
  fundsAtHand: string // New field
  intendedLeaseTime: string // New field
  declaredBankruptcy: string // New field
  paymentMethod: string // New field
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

const steps = [
  { id: 1, title: "Personal Info", description: "Basic information" },
  { id: 2, title: "Employment", description: "Work & income details" },
  { id: 3, title: "Additional Info", description: "Final details & agreement" },
  { id: 4, title: "Review", description: "Confirm & submit" },
]

export default function RentalApplication() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.dateOfBirth &&
          formData.currentAddress &&
          formData.city &&
          formData.state &&
          formData.zipCode
        )
      case 2:
        return !!(formData.employmentStatus && formData.monthlyIncome)
      case 3:
        return !!(
          formData.moveInDate &&
          formData.fundsAtHand &&
          formData.intendedLeaseTime &&
          formData.declaredBankruptcy &&
          formData.paymentMethod &&
          formData.agreement
        )
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    } else {
      toast({
        title: "Please complete required fields",
        description: "Fill in all required fields before proceeding.",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      // Validate the last input step before submission
      toast({
        title: "Please complete the form",
        description: "Make sure all required fields are filled and you've agreed to the terms.",
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
        setCurrentStep(1)
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <EmploymentStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <AdditionalInfoStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <ReviewStep formData={formData} />
      default:
        return null
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
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      currentStep > step.id
                        ? "bg-green-600 text-white"
                        : currentStep === step.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
                  </div>
                  <div className="hidden md:block ml-3 text-center">
                    {" "}
                    {/* Added ml-3 for spacing and text-center */}
                    <div
                      className={`text-sm font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-600"}`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-px w-16 mx-2 transition-all ${
                      /* Fixed width for the line, adjust mx as needed */
                      currentStep > step.id ? "bg-green-600" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-white">
              Step {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-blue-100">{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="p-8">{renderStep()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Your information is secure and will only be used for rental application purposes.</p>
          <p className="mt-1">Questions? Contact us at support@rentalapp.com</p>
        </div>
      </div>
    </div>
  )
}
