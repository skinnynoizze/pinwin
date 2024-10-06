import React from 'react'
import Image from 'next/image'


interface LogoPinwinProps {
  className?: string
  variant?: 'lateral' | 'default'
}

const LogoPinwin: React.FC<LogoPinwinProps> = ({ className, variant = 'default' }) => {
  const imageSrc = variant === 'lateral'
    ? '/images/logos/pinwin-dark-lateral-trans.png'
    : '/images/logos/pinwin-dark-trans-no-penguin.png'

  const imageSize = variant === 'lateral'
    ? { width: 1132, height: 816 }
    : { width: 2404, height: 706 }

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${imageSize.width} / ${imageSize.height}` }}>
      <Image
        src={imageSrc}
        alt="Pinwin Logo"
        fill
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}

export default LogoPinwin
