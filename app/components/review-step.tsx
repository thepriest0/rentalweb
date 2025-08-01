import type { FormData } from "../page"

interface ReviewStepProps {
  formData: FormData
}

export function ReviewStep({ formData }: ReviewStepProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided"
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Your Application</h3>
        <p className="text-gray-600">Please review all information before submitting</p>
      </div>

      {/* Personal Information */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Name:</strong> {formData.firstName} {formData.lastName}
          </div>
          <div>
            <strong>Email:</strong> {formData.email}
          </div>
          <div>
            <strong>Phone:</strong> {formData.phone}
          </div>
          <div>
            <strong>Date of Birth:</strong> {formatDate(formData.dateOfBirth)}
          </div>
          <div>
            <strong>Time at Current Address:</strong> {formData.timeAtCurrentAddress || "Not provided"}
          </div>
          <div>
            <strong>Reason for Moving:</strong> {formData.reasonForMoving || "Not provided"}
          </div>
        </div>
        <div className="mt-4 text-sm">
          <div>
            <strong>Address:</strong> {formData.currentAddress}, {formData.city}, {formData.state} {formData.zipCode}
          </div>
        </div>
      </div>

      {/* Employment Information */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-4">Employment Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Employment Status:</strong> {formData.employmentStatus}
          </div>
          <div>
            <strong>Monthly Income:</strong> ${formData.monthlyIncome}
          </div>
          <div>
            <strong>Employer:</strong> {formData.employer || "Not provided"}
          </div>
          <div>
            <strong>Job Title:</strong> {formData.jobTitle || "Not provided"}
          </div>
          <div>
            <strong>Employment Length:</strong> {formData.employmentLength || "Not provided"}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-teal-50 p-6 rounded-lg">
        <h4 className="font-semibold text-teal-800 mb-4">Additional Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Pets:</strong> {formData.pets || "Not specified"}
          </div>
          <div>
            <strong>Smoking:</strong> {formData.smoking || "Not specified"}
          </div>
          <div>
            <strong>Occupants:</strong> {formData.occupants || "Not provided"}
          </div>
          <div>
            <strong>Preferred Move-in Date:</strong> {formatDate(formData.moveInDate)}
          </div>
          <div>
            <strong>Funds at Hand:</strong> {formData.fundsAtHand || "Not provided"}
          </div>
          <div>
            <strong>Intended Lease Time:</strong> {formData.intendedLeaseTime || "Not provided"}
          </div>
          <div>
            <strong>Declared Bankruptcy:</strong> {formData.declaredBankruptcy || "Not specified"}
          </div>
          <div>
            <strong>Payment Method:</strong> {formData.paymentMethod || "Not provided"}
          </div>
        </div>
        {formData.petDetails && (
          <div className="mt-4 text-sm">
            <div>
              <strong>Pet Details:</strong> {formData.petDetails}
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Important:</strong> By clicking "Submit Application", you confirm that all information provided is
          accurate and complete.
        </p>
      </div>
    </div>
  )
}
