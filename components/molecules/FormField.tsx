import React, { forwardRef } from 'react'
import Input from '../atoms/Input'
import Select from '../atoms/Select'
import Textarea from '../atoms/Textarea'

interface SelectOption {
  value: string
  label: string
}

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'date'
  required?: boolean
  placeholder?: string
  value?: string
  error?: string
  options?: SelectOption[]
  rows?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  className?: string
}

const FormField = forwardRef<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  FormFieldProps
>(({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  value,
  error,
  options = [],
  rows = 4,
  onChange,
  onBlur,
  className = ''
}, ref) => {
  const labelId = `${name}-label`
  const fieldId = `${name}-field`
  const errorId = `${name}-error`
  
  const renderField = () => {
    const commonProps = {
      id: fieldId,
      name,
      value,
      onChange,
      onBlur,
      placeholder,
      hasError: !!error,
      'aria-labelledby': labelId,
      'aria-describedby': error ? errorId : undefined,
      'aria-required': required,
      'aria-invalid': !!error
    }
    
    switch (type) {
      case 'select':
        return (
          <Select
            ref={ref as React.RefObject<HTMLSelectElement>}
            options={options}
            placeholder={placeholder}
            {...commonProps}
          />
        )
      
      case 'textarea':
        return (
          <Textarea
            ref={ref as React.RefObject<HTMLTextAreaElement>}
            rows={rows}
            {...commonProps}
          />
        )
      
      default:
        return (
          <Input
            ref={ref as React.RefObject<HTMLInputElement>}
            type={type}
            {...commonProps}
          />
        )
    }
  }
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label 
        id={labelId}
        htmlFor={fieldId}
        className="font-body text-16 leading-21 text-neutral-800"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {renderField()}
      
      {error && (
        <p 
          id={errorId}
          role="alert"
          className="font-body text-14 text-red-500 leading-21"
        >
          {error}
        </p>
      )}
    </div>
  )
})

FormField.displayName = 'FormField'

export default FormField