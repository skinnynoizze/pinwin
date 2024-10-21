'use client'

import React from 'react'
import { Icon } from '@iconify/react'


export interface ButtonMobileProps {
  icon: string
  size?: number
  className?: string
  onClick: () => void
  ariaLabel: string // For accessibility
}

const ButtonMobile: React.FC<ButtonMobileProps> = ({
  icon,
  size = 12,
  className = '',
  onClick,
  ariaLabel,
}) => {
  return (
    <button
      className={`flex items-center justify-center ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon icon={icon} width={size} height={size} />
    </button>
  )
}

export default ButtonMobile
