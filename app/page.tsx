"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { submitApplication } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Home, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"
import { PersonalInfoStep } from "./components/personal-info-step"
import { EmploymentStep } from "./components/employment-step"
import { RentalHistoryStep } from "./components/rental-history-step"
import { AdditionalInfoStep } from "./components/additional-info-step"
import { ReviewStep } from "./components/review-step"

export interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  ssn: string
  driversLicense: string
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
  supervisorContact: string

  // Rental History
  previousAddress: string
  previousLandlord: string
  previousLandlordPhone: string
  previousRent: string
  reasonForLeaving: string

  // References
  ref1Name: string
  ref1Phone: string
  ref1Relationship: string
  ref2Name: string
  ref2Phone: string
  ref2Relationship: string

  // Additional Information
  pets: string
  smoking: string
  petDetails: string
  occupants: string
  moveInDate: string
  additionalInfo: string
  agreement: boolean
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  ssn: "",
  driversLicense: "",
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
  supervisorContact: "",
  previousAddress: "",
  previousLandlord: "",
  previousLandlordPhone: "",
  previousRent: "",
  reasonForLeaving: "",
  ref1Name: "",
  ref1Phone: "",
  ref1Relationship: "",
  ref2Name: "",
  ref2Phone: "",
  ref2Relationship: "",
  pets: "",
  smoking: "",
  petDetails: "",
  occupants: "",
  moveInDate: "",
  additionalInfo: "",
  agreement: false,
}

const steps = [
  { id: 1, title: "Personal Info", description: "Basic information" },
  { id: 2, title: "Employment", description: "Work & income details" },
  { id: 3, title: "History & References", description: "Previous rentals & contacts" },
  { id: 4, title: "Additional Info", description: "Final details" },
  { id: 5, title: "Review", description: "Confirm & submit" },
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
          formData.ssn &&
          formData.currentAddress &&
          formData.city &&
          formData.state &&
          formData.zipCode
        )
      case 2:
        return !!(formData.employmentStatus && formData.monthlyIncome)
      case 3:
        return true // Optional fields
      case 4:
        return formData.agreement
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
    if (!validateStep(4)) {
      toast({
        title: "Please complete the form",
        description: "Make sure all required fields are filled and you've agreed to the terms.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Send the form data directly as an object
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
        return <RentalHistoryStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <AdditionalInfoStep formData={formData} updateFormData={updateFormData} />
      case 5:
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
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
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
                <div className="hidden md:block">
                  <div className={`text-sm font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-600"}`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
            ))}
            {steps.map(
              (step, index) =>
                index < steps.length - 1 && (
                  <div
                    key={`line-${step.id}`}
                    className={`flex-1 h-px mx-4 transition-all ${
                      currentStep > step.id ? "bg-green-600" : "bg-gray-200"
                    }`}
                  ></div>
                ),
            )}
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
