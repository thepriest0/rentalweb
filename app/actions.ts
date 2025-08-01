"use server"

import nodemailer from "nodemailer"

interface ApplicationData {
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
  employmentStatus: string
  monthlyIncome: string
  employer: string
  employerAddress: string
  jobTitle: string
  employmentLength: string
  supervisorContact: string
  previousAddress: string
  previousLandlord: string
  previousLandlordPhone: string
  previousRent: string
  reasonForLeaving: string
  ref1Name: string
  ref1Phone: string
  ref1Relationship: string
  ref2Name: string
  ref2Phone: string
  ref2Relationship: string
  pets: string
  smoking: string
  petDetails: string
  occupants: string
  moveInDate: string
  additionalInfo: string
  agreement: boolean
}

export async function submitApplication(applicationData: ApplicationData) {
  console.log("=== STARTING APPLICATION SUBMISSION ===")
  console.log("Application data received:", JSON.stringify(applicationData, null, 2))

  try {
    // Check environment variables first
    console.log("Checking environment variables...")
    console.log("GMAIL_USER exists:", !!process.env.GMAIL_USER)
    console.log("GMAIL_APP_PASSWORD exists:", !!process.env.GMAIL_APP_PASSWORD)

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("❌ Missing Gmail credentials")
      return {
        success: false,
        error: "Email configuration missing. Please set up Gmail credentials.",
      }
    }

    // Validate required fields
    console.log("Validating required fields...")
    const requiredFields = {
      firstName: applicationData.firstName,
      lastName: applicationData.lastName,
      email: applicationData.email,
      phone: applicationData.phone,
      employmentStatus: applicationData.employmentStatus,
      monthlyIncome: applicationData.monthlyIncome,
      agreement: applicationData.agreement,
    }

    console.log("Required fields check:", requiredFields)

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        console.error(`❌ Missing required field: ${field}`)
        return {
          success: false,
          error: `Missing required field: ${field}`,
        }
      }
    }

    console.log("✅ All required fields present")

    // Test email configuration - FIXED: createTransport instead of createTransporter
    console.log("Testing email configuration...")
    let transporter
    try {
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      })

      // Verify the connection
      console.log("Verifying SMTP connection...")
      await transporter.verify()
      console.log("✅ SMTP connection verified")
    } catch (emailError) {
      console.error("❌ Email configuration error:", emailError)
      return {
        success: false,
        error: `Email setup error: ${emailError instanceof Error ? emailError.message : "Unknown email error"}`,
      }
    }

    // Format date helper
    const formatDate = (dateString: string) => {
      if (!dateString) return "Not provided"
      try {
        return new Date(dateString).toLocaleDateString()
      } catch {
        return dateString
      }
    }

    // Create email content
    console.log("Creating email content...")
    const subject = `🏠 New Rental Application - ${applicationData.firstName} ${applicationData.lastName}`

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 30px; }
            .section { background: #f8f9fa; padding: 25px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
            .section h2 { color: #667eea; margin-top: 0; font-size: 18px; }
            .info-row { margin: 10px 0; }
            .label { font-weight: bold; color: #555; }
            .value { margin-left: 10px; }
            .footer { text-align: center; margin-top: 30px; padding: 20px; background: #e9ecef; border-radius: 8px; }
            .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🏠 New Rental Application</h1>
            <p>Application from ${applicationData.firstName} ${applicationData.lastName}</p>
          </div>

          <div class="section">
            <h2>👤 Personal Information</h2>
            <div class="info-row"><span class="label">Name:</span><span class="value">${applicationData.firstName} ${applicationData.lastName}</span></div>
            <div class="info-row"><span class="label">Email:</span><span class="value">${applicationData.email}</span></div>
            <div class="info-row"><span class="label">Phone:</span><span class="value">${applicationData.phone}</span></div>
            <div class="info-row"><span class="label">Date of Birth:</span><span class="value">${formatDate(applicationData.dateOfBirth)}</span></div>
            <div class="info-row"><span class="label">SSN:</span><span class="value">${applicationData.ssn}</span></div>
            <div class="info-row"><span class="label">Driver's License:</span><span class="value">${applicationData.driversLicense || "Not provided"}</span></div>
            <div class="info-row"><span class="label">Current Address:</span><span class="value">${applicationData.currentAddress}</span></div>
            <div class="info-row"><span class="label">City, State, ZIP:</span><span class="value">${applicationData.city}, ${applicationData.state} ${applicationData.zipCode}</span></div>
            <div class="info-row"><span class="label">Time at Current Address:</span><span class="value">${applicationData.timeAtCurrentAddress || "Not provided"}</span></div>
            <div class="info-row"><span class="label">Reason for Moving:</span><span class="value">${applicationData.reasonForMoving || "Not provided"}</span></div>
          </div>

          <div class="section">
            <h2>💼 Employment Information</h2>
            <div class="highlight">
              <div class="info-row"><span class="label">Monthly Income:</span><span class="value">$${applicationData.monthlyIncome}</span></div>
              <div class="info-row"><span class="label">Employment Status:</span><span class="value">${applicationData.employmentStatus}</span></div>
            </div>
            <div class="info-row"><span class="label">Employer:</span><span class="value">${applicationData.employer || "Not provided"}</span></div>
            <div class="info-row"><span class="label">Employer Address:</span><span class="value">${applicationData.employerAddress || "Not provided"}</span></div>
            <div class="info-row"><span class="label">Job Title:</span><span class="value">${applicationData.jobTitle || "Not provided"}</span></div>
            <div class="info-row"><span class="label">Employment Length:</span><span class="value">${applicationData.employmentLength || "Not provided"}</span></div>
            <div class="info-row"><span class="label">Supervisor Contact:</span><span class="value">${applicationData.supervisorContact || "Not provided"}</span></div>
          </div>

          <div class="section">
            <h2>🏘️ Rental History</h2>
            <div class="info-row"><span class="label">Previous Address:</span><span class="value">${applicationData.previousAddress || "Not provided"}</span></div>
            <div class="info-row"><span class="label">Previous Landlord:</span><span class="value">${applicationData.previousLandlord || "Not provided"}</span></div>
            <div class="info-row"><span class="label">Previous Landlord Phone:</span><span class="value">${applicationData.previousLandlordPhone || "Not provided"}</span></div>
            <div class="info-row"><span class="label">Previous Rent:</span><span class="value">$${applicationData.previousRent || "Not provided"}</span></div>
            <div class="info-row"><span class="label">Reason for Leaving:</span><span class="value">${applicationData.reasonForLeaving || "Not provided"}</span></div>
          </div>

          <div class="section">
            <h2>👥 References</h2>
            <div class="info-row"><span class="label">Reference 1:</span><span class="value">${applicationData.ref1Name || "Not provided"} - ${applicationData.ref1Phone || "No phone"} (${applicationData.ref1Relationship || "No relationship specified"})</span></div>
            <div class="info-row"><span class="label">Reference 2:</span><span class="value">${applicationData.ref2Name || "Not provided"} - ${applicationData.ref2Phone || "No phone"} (${applicationData.ref2Relationship || "No relationship specified"})</span></div>
          </div>

          <div class="section">
            <h2>📋 Additional Information</h2>
            <div class="info-row"><span class="label">Pets:</span><span class="value">${applicationData.pets || "Not specified"}</span></div>
            ${applicationData.petDetails ? `<div class="info-row"><span class="label">Pet Details:</span><span class="value">${applicationData.petDetails}</span></div>` : ""}
            <div class="info-row"><span class="label">Smoking:</span><span class="value">${applicationData.smoking || "Not specified"}</span></div>
            <div class="info-row"><span class="label">Number of Occupants:</span><span class="value">${applicationData.occupants || "Not provided"}</span></div>
            <div class="info-row"><span class="label">Desired Move-in Date:</span><span class="value">${formatDate(applicationData.moveInDate)}</span></div>
            ${applicationData.additionalInfo ? `<div class="info-row"><span class="label">Additional Comments:</span><span class="value">${applicationData.additionalInfo}</span></div>` : ""}
          </div>

          <div class="footer">
            <p><strong>Application submitted on:</strong> ${new Date().toLocaleString()}</p>
            <p>Please review this application and contact the applicant if you need additional information.</p>
          </div>
        </body>
      </html>
    `

    const textContent = `
NEW RENTAL APPLICATION

APPLICANT: ${applicationData.firstName} ${applicationData.lastName}
EMAIL: ${applicationData.email}
PHONE: ${applicationData.phone}

PERSONAL INFORMATION:
- Date of Birth: ${formatDate(applicationData.dateOfBirth)}
- SSN: ${applicationData.ssn}
- Driver's License: ${applicationData.driversLicense || "Not provided"}
- Current Address: ${applicationData.currentAddress}, ${applicationData.city}, ${applicationData.state} ${applicationData.zipCode}

EMPLOYMENT INFORMATION:
- Employment Status: ${applicationData.employmentStatus}
- Monthly Income: $${applicationData.monthlyIncome}
- Employer: ${applicationData.employer || "Not provided"}

RENTAL HISTORY:
- Previous Address: ${applicationData.previousAddress || "Not provided"}
- Previous Landlord: ${applicationData.previousLandlord || "Not provided"}

REFERENCES:
- Reference 1: ${applicationData.ref1Name || "Not provided"} - ${applicationData.ref1Phone || "No phone"}
- Reference 2: ${applicationData.ref2Name || "Not provided"} - ${applicationData.ref2Phone || "No phone"}

ADDITIONAL INFO:
- Pets: ${applicationData.pets || "Not specified"}
- Pet Details: ${applicationData.petDetails || "None"}
- Smoking: ${applicationData.smoking || "Not specified"}
- Move-in Date: ${formatDate(applicationData.moveInDate)}

Submitted: ${new Date().toLocaleString()}
    `

    // Send email
    console.log("Preparing to send email...")
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: subject,
      text: textContent,
      html: htmlContent,
    }

    console.log("Mail options prepared:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      hasText: !!mailOptions.text,
      hasHtml: !!mailOptions.html,
    })

    console.log("Sending email...")
    const info = await transporter.sendMail(mailOptions)
    console.log("✅ Email sent successfully:", info.messageId)

    console.log("=== APPLICATION SUBMISSION COMPLETED SUCCESSFULLY ===")
    return { success: true }
  } catch (error) {
    console.error("❌ SUBMISSION ERROR:", error)
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace",
    })

    return {
      success: false,
      error: `Submission failed: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
    }
  }
}
