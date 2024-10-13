import React from 'react'
import cx from 'classnames'

import { FallbackImage } from 'components/dataDisplay'


const sizes = [ 28, 48 ] as const

export type LogoSize = typeof sizes[number]
export type OpponentLogoBgColor = 'grey-20'

const fallback = 'interface/no_opponent'

type OpponentLogoProps = {
  className?: string
  image?: string | null
  size?: LogoSize
  bgColor?: OpponentLogoBgColor
}

const OpponentLogo: React.FC<OpponentLogoProps> = ({ className, image, size = 28, bgColor = 'grey-20' }) => {
  const rootClassName = cx(
    'flex items-center justify-center flex-none rounded-full overflow-hidden', // Ensure overflow is hidden
    `bg-${bgColor}`, 
    className, 
    {
      'size-8 p-1': size === 28,
      'size-16 p-1': size === 48,
    }
  )

  return (
    <div className={rootClassName}>
      <FallbackImage
        className="z-10 w-full h-full object-cover rounded-full" // Use object-cover to maintain aspect ratio and rounded-full for circular shape
        src={image}
        iconFallback={fallback}
      />
    </div>
  )
}

export default OpponentLogo
