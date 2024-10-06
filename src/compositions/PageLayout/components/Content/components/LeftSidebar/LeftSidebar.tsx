'use client'

import React from 'react'

import LogoPinwin from 'components/ui/Logo/LogoPinwin'
import Navigation from 'compositions/Navigation/Navigation'
import LiveSwitcher from 'compositions/LiveSwitcher/LiveSwitcher'


const LeftSidebar: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-5 sticky top-0">
        <LogoPinwin className="w-full h-auto" variant="lateral" />
      </div>
      <div className="overflow-auto flex-grow no-scrollbar">
        <LiveSwitcher />
        <Navigation className="mt-2" />
      </div>
    </div>
  )
}

export default LeftSidebar
