import React from 'react'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  className?: string
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  className = ''
}) => {
  return (
    <p className={`font-body text-14 leading-21 text-neutral-600 ${className}`}>
      Step {currentStep} of {totalSteps}
    </p>
  )
}

export default StepIndicator