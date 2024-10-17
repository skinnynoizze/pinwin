'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import { Message } from '@locmod/intl'
import { useLive } from '@azuro-org/sdk'
import cx from 'classnames'
import Link from 'next/link'

import { Icon, type IconName } from 'components/ui'
import TimeFilter, { FilterByTimeProvider } from 'compositions/events/TimeFilter/TimeFilter'
import ChangeOddsView from 'compositions/ChangeOddsView/ChangeOddsView'

import messages from './messages'


export const NavbarSkeleton: React.FC = () => {
  return (
    <div className="border-b border-b-grey-10 -mx-2 ds:px-6 mb:px-3 py-3">
      <div className="flex items-center">
        <div className="bone size-6 rounded-full mr-3" />
        <div className="bone rounded-full h-8 w-32" />
      </div>
    </div>
  )
}

const Navbar: React.CFC = ({ children }) => {
  const { isLive } = useLive()
  const params = useParams()

  const sportSlug = params.sportSlug as string || 'top'
  const countrySlug = params.countrySlug as string
  const icon: IconName = sportSlug === 'top' ? 'interface/iglu10b' : `sport/${sportSlug}` as IconName
  const isTimeFilterVisible = !isLive && sportSlug !== 'unique'

  const className = cx('sticky mb:top-[50px] nr:top-[40px] ds:top-0 z-20 px-6 pt-6 mb:pt-3 pb-1 mb:items-center mb:flex-col border-b border-b-grey-10 flex justify-between bg-bg-l1', {
    'py-3': !isTimeFilterVisible,
  })

  return (
    <FilterByTimeProvider>
      <div className={className}>
        <div className="flex items-center ds:flex-row">
          <Icon className="size-6 mr-3 text-brand-50" name={icon} />
          <Link href={`/${sportSlug}`} passHref>
            <Message className="mb:text-heading-h3 text-heading-h2 font-bold hover:text-brand-50" value={messages[sportSlug] || sportSlug} />
          </Link>
          {countrySlug && <Message className="text-caption-14 mx-2" value={messages.in} />}
          <Link href={`/${sportSlug}/${countrySlug}`} passHref>
            <Message className="text-caption-14 hover:text-brand-50" value={messages[countrySlug] || countrySlug} />
          </Link>
        </div>
        <div className="flex items-center space-x-2 ds:flex-row">
          {
            isTimeFilterVisible && (
              <TimeFilter className="ds:h-10 nr:h-10 mb:h-8" />
            )
          }
          <ChangeOddsView />
        </div>
      </div>
      {children}
    </FilterByTimeProvider>
  )
}

export default Navbar
