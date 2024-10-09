'use client'

import React, { useState } from 'react'
import cx from 'classnames'

import { Media } from 'components/layout'
import MobileBetslipButton from 'compositions/MobileBetslipButton/MobileBetslipButton'
import Carrousel from 'compositions/Carrousel/Carrousel'
import { LeftSidebar, RightSidebar, Header } from './components'

import ns from './Narrow.module.scss'
import ws from './Wide.module.scss'


const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [ isRightSidebarExpanded, setIsRightSidebarExpanded ] = useState(true)

  const rootClassName = cx('h-full flex flex-col wd:flex-row min-h-screen mx-auto wd:px-2 wd:pb-2', ws.root)
  const mainClassName = cx(ns.main, ws.main,
    'mx-auto flex-1 w-full wd:h-auto',
    {
      [ws.withRightSidebar]: isRightSidebarExpanded,
    }
  )
  const sidebarClassName = 'sticky top-0 z-[100] shrink-0 no-scrollbar'

  return (
    <div className={rootClassName}>
      <Media className={cx('h-screen', ws.leftSidebar, sidebarClassName, 'pr-2 overflow-auto')} wide>
        <LeftSidebar />
      </Media>
      <Media className="sticky top-0 z-[100]" narrow mobile>
        <Header />
      </Media>
      <main className={mainClassName}>
        <Media
          className="mb-2"
          narrow
          mobile
          wide
        >
          <Carrousel />
        </Media>
        <div className="flex flex-col bg-bg-l1 border border-grey-10 wd:rounded-l-md -wd:rounded-t-md px-2 min-h-[calc(100vh_-_4.5rem)] w-full">
          {children}
        </div>
      </main>
      <Media className={cx('h-[calc(100vh_-_0.5rem)]', ws.rightSidebar, sidebarClassName)} wide>
        <RightSidebar onToggle={setIsRightSidebarExpanded} />
      </Media>
      <Media narrow mobile>
        <MobileBetslipButton />
      </Media>
    </div>
  )
}

export default Content
