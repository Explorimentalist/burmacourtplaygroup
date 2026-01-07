import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled = false,
  className = '',
  children,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-body font-medium rounded-sm
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    disabled:cursor-not-allowed
  `
  
  const variants = {
    primary: `
      bg-primary-500 text-neutral-50 
      hover:bg-primary-600 
      disabled:bg-neutral-300 disabled:text-neutral-600
    `,
    secondary: `
      bg-neutral-50 text-neutral-800 border border-neutral-300
      hover:bg-neutral-100
      disabled:bg-neutral-100 disabled:text-neutral-400
    `
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-14 leading-21',
    md: 'px-4 py-2.5 text-16 leading-21', 
    lg: 'px-6 py-3 text-20 leading-26'
  }
  
  const isDisabled = disabled || loading
  
  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button