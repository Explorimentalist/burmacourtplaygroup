import React from 'react'
import ContactForm from '../organisms/ContactForm'
import ContactInfo from '../molecules/ContactInfo'

interface ContactProps {
  onSubmit?: (data: any) => Promise<void>
  className?: string
}

const Contact: React.FC<ContactProps> = ({ onSubmit, className = '' }) => {
  return (
    <section className={`min-h-screen bg-neutral-200 py-20 px-6 lg:px-20 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[632px_1fr] gap-12 lg:gap-48">
          {/* Left Column: Form */}
          <div className="flex flex-col">
            <ContactForm onSubmit={onSubmit} />
          </div>
          
          {/* Right Column: Contact Info */}
          <div className="flex flex-col justify-start">
            <ContactInfo
              email="leigh.bcp@gmail.com"
              phone="+44 07 020 7249 6974"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact