import React, { SelectHTMLAttributes, forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[]
  placeholder?: string
  hasError?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  placeholder = 'Select an option',
  hasError = false,
  className = '',
  ...props
}, ref) => {
  const baseStyles = `
    h-input w-full bg-neutral-50 px-3 py-3 pr-10 appearance-none
    font-body text-16 text-neutral-600 leading-21
    border border-transparent
    focus:border-neutral-600 hover:border-neutral-400 focus:outline-none
    transition-colors duration-200
    cursor-pointer
  `
  
  const errorStyles = hasError ? 'border-red-500 focus:border-red-500' : ''
  
  return (
    <div className="relative">
      <select
        ref={ref}
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown 
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-800" 
        size={20} 
      />
    </div>
  )
})

Select.displayName = 'Select'

export default Select