import React, { useState, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import FormField from '../molecules/FormField'
import Button from '../atoms/Button'
import ProgressBar from '../atoms/ProgressBar'
import StepIndicator from '../molecules/StepIndicator'

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

interface FormErrors {
  [key: string]: string
}

interface ContactFormProps {
  onSubmit?: (data: FormData) => Promise<void>
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    reasonForContacting: '',
    childName: '',
    dateOfBirth: '',
    desiredStartDate: '',
    message: '',
    howDidYouHear: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  
  // Calculate total steps and current step display based on reason for contacting
  const totalSteps = formData.reasonForContacting === 'inscription' ? 3 : 2
  
  // Calculate display step (for "Step X of Y" display)
  const getDisplayStep = () => {
    if (formData.reasonForContacting === 'general-info') {
      return currentStep === 1 ? 1 : 2 // Step 1 or 2 for general info
    }
    return currentStep // Normal 1, 2, 3 for inscription
  }
  
  const displayStep = getDisplayStep()
  
  // Form options
  const reasonOptions = [
    { value: 'general-info', label: 'General information' },
    { value: 'inscription', label: 'Inscription enquiry' }
  ]
  
  const howDidYouHearOptions = [
    { value: 'search-engine', label: 'Search engine' },
    { value: 'social-media', label: 'Social media' },
    { value: 'friend-referral', label: 'Friend referral' },
    { value: 'local-directory', label: 'Local directory' },
    { value: 'other', label: 'Other' }
  ]
  
  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s()+\-]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
  }
  
  const validateField = useCallback((name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required'
        if (value.trim().length < 2) return 'Please enter a valid name'
        return ''
      
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!validateEmail(value)) return 'Please enter a valid email address'
        return ''
      
      case 'phoneNumber':
        if (!value.trim()) return 'Phone number is required'
        if (!validatePhone(value)) return 'Please enter a valid phone number'
        return ''
      
      case 'reasonForContacting':
        if (!value) return 'Please select a reason for contacting'
        return ''
      
      case 'dateOfBirth':
        if (formData.reasonForContacting === 'inscription' && !value) {
          return 'Date of birth is required'
        }
        return ''
      
      case 'desiredStartDate':
        if (formData.reasonForContacting === 'inscription' && value) {
          const selectedDate = new Date(value)
          const today = new Date()
          today.setHours(0, 0, 0, 0) // Reset time to compare dates only
          
          if (selectedDate < today) {
            return 'Please select a future date'
          }
        }
        return ''
      
      default:
        return ''
    }
  }, [formData.reasonForContacting])
  
  // Check if current step is valid
  const isCurrentStepValid = useCallback(() => {
    switch (currentStep) {
      case 1:
        const step1Fields = ['fullName', 'email', 'phoneNumber', 'reasonForContacting']
        return step1Fields.every(field => {
          const error = validateField(field, formData[field as keyof FormData])
          return !error && formData[field as keyof FormData].trim() !== ''
        })
      
      case 2:
        if (formData.reasonForContacting === 'inscription') {
          return !validateField('dateOfBirth', formData.dateOfBirth)
        }
        return true // Skip step 2 for general info
      
      case 3:
        return true // Final step always valid - all fields are optional
      
      default:
        return false
    }
  }, [currentStep, formData, validateField])
  
  // Handle form data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    
    // Handle reason for contacting change - reset step if needed
    if (name === 'reasonForContacting') {
      if (value === 'general-info' && currentStep === 2) {
        setCurrentStep(3) // Skip to final step
      } else if (value === 'inscription' && currentStep === 3) {
        setCurrentStep(2) // Go back to child details
      }
    }
  }
  
  // Handle field blur for validation
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }
  
  // Handle next step
  const handleNext = () => {
    if (!isCurrentStepValid()) return
    
    if (currentStep === 1 && formData.reasonForContacting === 'general-info') {
      setCurrentStep(3) // Skip to final step for general info
    } else if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }
  
  // Handle form submission with EmailJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isCurrentStepValid()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Send email using EmailJS
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        
        if (!serviceId || !templateId || !publicKey) {
          throw new Error('EmailJS configuration is missing. Please check your environment variables.')
        }
        
        // Prepare template parameters
        const templateParams = {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          reasonForContacting: formData.reasonForContacting,
          childName: formData.childName || 'Not provided',
          dateOfBirth: formData.dateOfBirth || 'Not provided',
          desiredStartDate: formData.desiredStartDate || 'Not provided',
          message: formData.message || 'No additional message',
          howDidYouHear: formData.howDidYouHear || 'Not specified',
          to_email: import.meta.env.VITE_TARGET_EMAIL || 'brianoko@gmail.com'
        }
        
        const result = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          publicKey
        )
      }
      
      // Show success message first
      setSubmitStatus('success')
      setStatusMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.')
      
      // Reset form after a brief delay so user sees the success message
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          reasonForContacting: '',
          childName: '',
          dateOfBirth: '',
          desiredStartDate: '',
          message: '',
          howDidYouHear: ''
        })
        setCurrentStep(1)
        setErrors({})
        setSubmitStatus('idle')
        setStatusMessage('')
      }, 3000)
      
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      if (error instanceof Error) {
        setStatusMessage(`There was an error sending your message: ${error.message}. Please try again or contact us directly.`)
      } else {
        setStatusMessage('There was an error sending your message. Please try again or contact us directly.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display text-32 leading-40 text-neutral-800">
                Your Details
              </h2>
              <StepIndicator currentStep={displayStep} totalSteps={totalSteps} />
            </div>
            
            <FormField
              label="Full Name"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              error={errors.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            
            <FormField
              label="Email"
              name="email"
              type="email"
              required
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            
            <FormField
              label="Phone number"
              name="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              error={errors.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            
            <FormField
              label="Reason for contacting"
              name="reasonForContacting"
              type="select"
              required
              options={reasonOptions}
              value={formData.reasonForContacting}
              error={errors.reasonForContacting}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Select a reason"
            />
          </div>
        )
      
      case 2:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display text-32 leading-40 text-neutral-800">
                Child details
              </h2>
              <StepIndicator currentStep={displayStep} totalSteps={totalSteps} />
            </div>
            
            <FormField
              label=" Child's name"
              name="childName"
              type="text"
              value={formData.childName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            
            <FormField
              label="Date of birth"
              name="dateOfBirth"
              type="date"
              required
              value={formData.dateOfBirth}
              error={errors.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            
            <FormField
              label="Desired start date"
              name="desiredStartDate"
              type="date"
              value={formData.desiredStartDate}
              error={errors.desiredStartDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        )
      
      case 3:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display text-32 leading-40 text-neutral-800">
                Tell us
              </h2>
              <StepIndicator currentStep={displayStep} totalSteps={totalSteps} />
            </div>
            
            <FormField
              label="Message"
              name="message"
              type="textarea"
              value={formData.message}
              onChange={handleChange}
              rows={4}
            />
            
            <FormField
              label="How did you hear about us?"
              name="howDidYouHear"
              type="select"
              options={howDidYouHearOptions}
              value={formData.howDidYouHear}
              onChange={handleChange}
              placeholder="Select an option"
            />
          </div>
        )
      
      default:
        return null
    }
  }
  
  // Fix isFinalStep logic to handle the skip-to-step-3 case for general-info
  const isFinalStep = 
    (formData.reasonForContacting === 'inscription' && currentStep === 3) ||
    (formData.reasonForContacting === 'general-info' && currentStep === 3) ||
    (formData.reasonForContacting === '' && currentStep === totalSteps)
  
  
  return (
    <div className="flex flex-col gap-14">
      <h1 className="font-display text-[64px] leading-[38px] text-neutral-800">
        Contact us
      </h1>
      
      
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="bg-secondary-100 border border-secondary-500 text-secondary-700 px-6 py-4 rounded-md mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-secondary-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-14 font-medium leading-21">{statusMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-primary-50 border border-primary-600 text-primary-700 px-6 py-4 rounded-md mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-14 font-medium leading-21">{statusMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {renderStepContent()}
        
        <div className="flex justify-end">
          {!isFinalStep && (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
            >
              Next
            </Button>
          )}
          {isFinalStep && (
            <Button
              type="submit"
              disabled={!isCurrentStepValid() || isSubmitting}
              loading={isSubmitting}
            >
              {isSubmitting ? 'Sending' : 'Send'}
            </Button>
          )}
        </div>
      </form>
      
      {/* ARIA live region for screen readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {`Currently on step ${currentStep} of ${totalSteps}`}
      </div>
    </div>
  )
}

export default ContactForm