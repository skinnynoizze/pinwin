'use client'

import React from 'react'
import { Icon } from '@iconify/react'

import LogoPinwin from 'components/ui/Logo/LogoPinwin'
import Navigation from 'compositions/Navigation/Navigation'
import LiveSwitcher from 'compositions/LiveSwitcher/LiveSwitcher'


const LeftSidebar: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-5 sticky top-0 flex flex-col items-center">
        <LogoPinwin className="w-full h-auto" variant="lateral" />
        <div className="flex justify-center space-x-4 mt-2 iconify-icon">
          <a href="https://x.com/pinwinxyz" target="_blank" rel="noopener noreferrer">
            <Icon icon="proicons:x-twitter" className="text-xl hover:text-brand-50 transition-colors" />
          </a>
          <a href="https://discord.com/invite/pinwinxyz" target="_blank" rel="noopener noreferrer">
            <Icon icon="akar-icons:discord-fill" className="text-xl hover:text-brand-50 transition-colors" />
          </a>
        </div>
      </div>
      <div className="overflow-auto flex-grow no-scrollbar">
        <LiveSwitcher />
        <Navigation className="mt-2" />
      </div>
    </div>
  )
}

export default LeftSidebar
