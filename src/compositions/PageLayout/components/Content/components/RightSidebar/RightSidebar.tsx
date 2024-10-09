'use client'

import React, { useState, useEffect } from 'react'
import { openModal } from '@locmod/modal'
import { useAccount } from 'wagmi'
import { Button, buttonMessages } from 'components/inputs'
import { Icon } from 'components/ui'
import { Media } from 'components/layout'
import TabbedBetslip from 'compositions/TabbedBetslip/TabbedBetslip'
import Controls from '../Controls/Controls'

interface RightSidebarProps {
  onToggle: (expanded: boolean) => void
}

const RightSidebar: React.FC<RightSidebarProps> = ({ onToggle }) => {
  const { address } = useAccount()
  const [ isExpanded, setIsExpanded ] = useState(true)

  useEffect(() => {
    onToggle(isExpanded)
  }, [ isExpanded, onToggle ])

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  const desktopContent = (
    <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'w-[316px]' : 'w-12'}`}>
      <div className="h-full relative">
        <button
          onClick={toggleSidebar}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-bg-l1 p-2 rounded-l-md"
        >
          <Icon
            className={`size-6 text-grey-60 transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`}
            name="interface/chevron_right"
          />
        </button>
        <div className={`h-full transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="px-6 py-3 sticky top-0 z-20 flex mb:justify-end ds:justify-center items-center">
            {Boolean(address) ? (
              <Controls />
            ) : (
              <Button
                title={buttonMessages.connectWallet}
                size={40}
                onClick={() => openModal('ConnectModal')}
              />
            )}
          </div>
          <div className="bg-bg-l1 border border-grey-10 border-l-0 rounded-r-md overflow-auto wd:h-[calc(100vh_-_4.5rem)] no-scrollbar px-2 pt-1">
            <TabbedBetslip />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Media wide>{desktopContent}</Media>
      {/* Mobile view is handled by MobileBetslipButton in the Content component */}
    </>
  )
}

export default RightSidebar