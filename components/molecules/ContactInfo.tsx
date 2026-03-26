import React from 'react'

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
    <div className={`flex flex-col ${className}`}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-1 lg:gap-6">
        <div className="flex flex-col gap-4 min-w-0">
          <h2 className="font-display text-32 leading-40 text-neutral-800">
            Email or call
          </h2>
          <div className="flex items-center gap-4">
            {/* <Mail className="text-neutral-800 flex-shrink-0" size={24} /> */}
            <img src="/icons/custom/email.svg" alt="Email" className="text-neutral-800 flex-shrink-0" />
            <a 
              href={`mailto:${email}`}
              className="font-body text-16 leading-21 text-neutral-800 hover:text-primary-500 transition-colors duration-200 break-words"
            >
              {email}
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            {/* <Phone className="text-neutral-800 flex-shrink-0" size={24} /> */}
            <img src="/icons/custom/phone.svg" alt="Phone" className="text-neutral-800 flex-shrink-0" />
            <a 
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="font-body text-16 leading-21 text-neutral-800 hover:text-primary-500 transition-colors duration-200 break-words"
            >
              {phone}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-32 leading-40 text-neutral-800">
            Address
          </h3>
          <div className="font-body text-16 leading-24 text-neutral-800">
            <div className="flex items-start gap-3">
              <img src="/icons/custom/pin.svg" alt="Map Pin" className="text-neutral-800 flex-shrink-0 w-6 h-6 mt-0.5" />
              <div>
                <div>Burma Court Playgroup</div>
                <div>Mabel Thornton Community Hall</div>
                <div>Burma Road</div>
                <div>N16 9BG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
