import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  placeholder?: string
  hasError?: boolean
  value?: string
  name?: string
  id?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void
  className?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-required'?: boolean
  'aria-invalid'?: boolean
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  placeholder = 'Select an option',
  hasError = false,
  value = '',
  name,
  id,
  onChange,
  onBlur,
  className = '',
  ...ariaProps
}, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hiddenSelectRef = useRef<HTMLSelectElement>(null)

  // Combine refs
  React.useImperativeHandle(ref, () => hiddenSelectRef.current as HTMLSelectElement)

  // Get selected label
  const selectedOption = options.find(opt => opt.value === value)
  const displayValue = selectedOption?.label || ''

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    if (onChange && hiddenSelectRef.current) {
      // Create a synthetic event to match the native select behavior
      const syntheticEvent = {
        target: {
          name: name || '',
          value: optionValue,
        },
        currentTarget: {
          name: name || '',
          value: optionValue,
        },
      } as React.ChangeEvent<HTMLSelectElement>

      onChange(syntheticEvent)
    }
    setIsOpen(false)
  }

  // Handle blur
  const handleBlur = () => {
    if (onBlur && hiddenSelectRef.current) {
      const syntheticEvent = {
        target: hiddenSelectRef.current,
        currentTarget: hiddenSelectRef.current,
      } as React.FocusEvent<HTMLSelectElement>

      onBlur(syntheticEvent)
    }
  }

  const baseStyles = `
    h-input w-full bg-neutral-50 px-3 py-3
    font-body text-16 leading-21
    border border-transparent rounded-none
    focus:border-neutral-600 hover:border-neutral-400 focus:outline-none
    transition-colors duration-200
    cursor-pointer
  `

  const errorStyles = hasError ? 'border-red-500 focus:border-red-500' : ''

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden native select for form submission and accessibility */}
      <select
        ref={hiddenSelectRef}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        {...ariaProps}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom dropdown trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={handleBlur}
        className={`${baseStyles} ${errorStyles} ${className} text-left flex items-center justify-between`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={ariaProps['aria-labelledby']}
      >
        <span className={value ? 'text-neutral-800' : 'text-neutral-500'}>
          {displayValue || placeholder}
        </span>
        <ChevronDown
          className={`text-neutral-800 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>

      {/* Custom dropdown menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-neutral-50 border border-neutral-300 rounded-sm shadow-lg z-50 max-h-60 overflow-y-auto"
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`
                w-full px-4 py-3 text-left font-body text-16 leading-21
                flex items-center justify-between
                transition-colors duration-150
                ${option.value === value
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-neutral-800 hover:bg-neutral-200'
                }
              `}
              role="option"
              aria-selected={option.value === value}
            >
              <span>{option.label}</span>
              {option.value === value && (
                <Check size={18} className="text-primary-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select
