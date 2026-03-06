import React from 'react'
import emailjs from '@emailjs/browser'
import Navbar from '../components/Navbar'
import Contact from '../components/sections/Contact'
import Footer from '../components/organisms/Footer'
import { getStoredHomepageTestVariant } from '../lib/abTest'
import { trackHomepageExperimentEvent } from '../lib/analytics'

interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  reasonForContacting: string
  childName: string
  dateOfBirth: string
  desiredStartDate: string
  message: string
  howDidYouHear: string
}

const ContactPage: React.FC = () => {
  const handleFormSubmit = async (formData: FormData) => {
    try {
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      
      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS not configured. Please set up environment variables.')
        // Fallback behavior - show success message but log data
        console.log('Contact form submitted (EmailJS not configured):', formData)
        alert('Thank you for your message! We will get back to you soon.\n\n(Note: EmailJS not configured for development)')
        return
      }

      // Prepare email data for EmailJS template
      const emailData = {
        to_email: 'leighbcp@gmail.com',
        from_name: formData.fullName,
        from_email: formData.email,
        phone_number: formData.phoneNumber,
        reason_for_contacting: formData.reasonForContacting,
        child_name: formData.childName || 'N/A',
        date_of_birth: formData.dateOfBirth || 'N/A',
        desired_start_date: formData.desiredStartDate || 'N/A',
        message: formData.message || 'No message provided',
        how_did_you_hear: formData.howDidYouHear || 'Not specified',
        submission_date: new Date().toLocaleString(),
        // Create a formatted inquiry type
        inquiry_type: formData.reasonForContacting === 'inscription' ? 'Inscription Enquiry' : 'General Information'
      }

      // Send email using EmailJS
      console.log('Sending email with data:', emailData)
      
      const response = await emailjs.send(
        serviceId,
        templateId,
        emailData,
        publicKey
      )

      if (response.status === 200) {
        const variant = getStoredHomepageTestVariant()
        if (variant) {
          trackHomepageExperimentEvent('contact_form_submit', variant)
        }
        alert('Thank you for your message! We will get back to you soon.')
        console.log('Email sent successfully:', response)
      } else {
        throw new Error(`EmailJS returned status: ${response.status}`)
      }

    } catch (error) {
      console.error('Error sending email:', error)
      
      // User-friendly error message
      alert('Sorry, there was an error sending your message. Please try again or contact us directly at leighbcp@gmail.com.')
      
      // Log the form data for debugging
      console.log('Failed form submission data:', formData)
    }
  }

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Contact onSubmit={handleFormSubmit} />
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage
