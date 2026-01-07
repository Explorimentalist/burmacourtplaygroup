import React from 'react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  className = ''
}) => {
  const progressPercentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100))
  
  return (
    <div className={`w-full bg-neutral-300 h-2 rounded-full overflow-hidden ${className}`}>
      <div 
        className="bg-primary-500 h-full rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep} of ${totalSteps}`}
      />
    </div>
  )
}

export default ProgressBar