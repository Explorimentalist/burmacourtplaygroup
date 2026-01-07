import React, { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'error'
  hasError?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  hasError = false,
  className = '',
  type = 'text',
  ...props
}, ref) => {
  const baseStyles = `
    h-input w-full bg-neutral-50 px-3 py-3
    font-body text-16 text-neutral-600 leading-21
    border border-transparent
    focus:border-neutral-600 hover:border-neutral-400 focus:outline-none
    transition-colors duration-200
    placeholder:text-neutral-500
  `
  
  const errorStyles = hasError ? 'border-red-500 focus:border-red-500' : ''
  
  return (
    <input
      ref={ref}
      type={type}
      className={`${baseStyles} ${errorStyles} ${className}`}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input