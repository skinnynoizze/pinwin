'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import { Message } from '@locmod/intl'
import { useLive } from '@azuro-org/sdk'
import cx from 'classnames'
import Link from 'next/link' // Import Link from next/link

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

  const className = cx(
    'border-b border-b-grey-10 -mx-2 ds:px-6 mb:px-2 flex mb:flex-col ds:flex-row items-center justify-between sticky z-20 bg-bg-l1 rounded-t-lg overflow-hidden',
    {
      'py-3 mb:py-0': !isTimeFilterVisible,
      'ds:py-[4.5px] mb:py-0': isTimeFilterVisible,
      'top-0': isLive,
      'mb:top-[60px] nr:top-[45px] ds:top-0': !isLive,
    }
  )

  return (
    <FilterByTimeProvider>
      <div className={className}>
        <div className="flex items-center mb:justify-center mb:w-full mb:h-[40px] mb:mt-2 ds:h-auto">
          <Icon className="size-6 mr-3 text-brand-50" name={icon} />
          <Link href={`/${sportSlug}`} className="text-heading-h2 font-bold mb:text-heading-h5 hover:underline">
            <Message value={messages[sportSlug]} />
          </Link>
          {/* Display Country Name */}
          <span className="mb:text-xs text-base text-grey-60 ml-2 pt-2 mb:pt-1">
            {
              countrySlug ? (
                <>
                  <Message value={messages.in} />
                  {' '}
                  <Link href={`/${sportSlug}/${countrySlug}`} className="text-grey-60 hover:underline">
                    <Message value={messages[countrySlug] || countrySlug} />
                  </Link>
                </>
              ) : null
            }
          </span>
        </div>
        <div className="flex items-center space-x-2 mb:justify-center mb:w-full mb:h-[40px] ds:h-auto">
          {
            isTimeFilterVisible && (
              <TimeFilter className="ds:h-14 mb:h-8" />
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
