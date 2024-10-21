'use client'

import React from 'react'
import { Icon } from '@iconify/react'

import LogoPinwin from 'components/ui/Logo/LogoPinwin'
import Navigation from 'compositions/Navigation/Navigation'
import LiveSwitcher from 'compositions/LiveSwitcher/LiveSwitcher'


const LeftSidebar: React.FC = () => {
  return (
    <div className="hflex flex-col">
      <div className="px-4 py-5 flex flex-col items-center">
        <LogoPinwin className="w-full h-auto" variant="lateral" />
        <div className="flex justify-center space-x-4 mt-2 iconify-icon">
          <a href="https://x.com/pinwinxyz" target="_blank" rel="noopener noreferrer">
            <Icon icon="proicons:x-twitter" className="text-xl hover:text-brand-50 transition-colors" />
          </a>
          <a href="https://discord.com/invite/pinwinxyz" target="_blank" rel="noopener noreferrer">
            <Icon icon="akar-icons:discord-fill" className="text-xl hover:text-brand-50 transition-colors" />
          </a>
          <a href="https://pinwin-xyz.gitbook.io/pinwin.xyz-docs" target="_blank" rel="noopener noreferrer">
            <Icon icon="simple-icons:gitbook" className="text-xl hover:text-brand-50 transition-colors" />
          </a>
        </div>
      </div>
      <div className="overflow-auto flex-grow no-scrollbar bg-bg-l1 border border-grey-10 rounded-md px-2 py-2">
        <LiveSwitcher />
        <Navigation className="mt-2" />
      </div>
    </div>
  )
}

export default LeftSidebar
