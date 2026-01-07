import React from 'react'
import { Mail, Phone } from 'lucide-react'

interface ContactInfoProps {
  email: string
  phone: string
  className?: string
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  email,
  phone,
  className = ''
}) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2 className="font-display text-32 leading-40 text-neutral-800">
        Email or call
      </h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {/* <Mail className="text-neutral-800 flex-shrink-0" size={24} /> */}
          <img src="/icons/custom/email.svg" alt="Email" className="text-neutral-800 flex-shrink-0" />
          <a 
            href={`mailto:${email}`}
            className="font-body text-16 leading-21 text-neutral-800 hover:text-primary-500 transition-colors duration-200"
          >
            {email}
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          {/* <Phone className="text-neutral-800 flex-shrink-0" size={24} /> */}
          <img src="/icons/custom/phone.svg" alt="Phone" className="text-neutral-800 flex-shrink-0" />
          <a 
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="font-body text-16 leading-21 text-neutral-800 hover:text-primary-500 transition-colors duration-200"
          >
            {phone}
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo