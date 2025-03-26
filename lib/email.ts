// This file contains the email sending functionality
// You'll need to install EmailJS: npm install @emailjs/browser

import emailjs from "@emailjs/browser"

interface EmailData {
  name: string
  email: string
  subject: string
  message: string
  to_email: string
}

export const sendEmail = async (data: EmailData) => {
  // You need to sign up for EmailJS (https://www.emailjs.com/) and get these values
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error("EmailJS configuration is missing. Please check your environment variables.")
  }

  try {
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY)

    return result
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

