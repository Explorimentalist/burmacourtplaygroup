import React, { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  hasError = false,
  className = '',
  rows = 4,
  ...props
}, ref) => {
  const baseStyles = `
    min-h-[96px] w-full bg-neutral-50 p-3 resize-none
    font-body text-16 text-neutral-600 leading-21
    border border-transparent
    focus:border-neutral-600 hover:border-neutral-400 focus:outline-none
    transition-colors duration-200
    placeholder:text-neutral-500
  `
  
  const errorStyles = hasError ? 'border-red-500 focus:border-red-500' : ''
  
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={`${baseStyles} ${errorStyles} ${className}`}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

export default Textarea