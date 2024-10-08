'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Message } from '@locmod/intl'
import { useLive, useNavigation } from '@azuro-org/sdk'
import type { NavigationQuery } from '@azuro-org/toolkit'
import cx from 'classnames'

import { constants } from 'helpers'

import type { IconName } from 'components/ui'
import { Icon } from 'components/ui'
import { Href } from 'components/navigation'
import { Flag } from 'components/dataDisplay'

import Skeleton from './components/Skeleton/Skeleton'

import messages from './messages'

// Add these at the top of the file, after the imports
const CATEGORIES = {
  PREDICTION_MARKETS: 'Prediction Markets',
  SPORTS: 'Sports',
  ESPORTS: 'E-Sports',
} as const

const SPORT_CATEGORIES: Record<string, typeof CATEGORIES[keyof typeof CATEGORIES]> = {
  'politics': CATEGORIES.PREDICTION_MARKETS,
  'football': CATEGORIES.SPORTS,
  'basketball': CATEGORIES.SPORTS,
  'baseball': CATEGORIES.SPORTS,
  'ice-hockey': CATEGORIES.SPORTS,
  'mma': CATEGORIES.SPORTS,
  'cricket': CATEGORIES.SPORTS,
  'american-football': CATEGORIES.SPORTS,
  'tennis': CATEGORIES.SPORTS,
  'boxing': CATEGORIES.SPORTS,
  'rugby-league': CATEGORIES.SPORTS,
  'rugby-union': CATEGORIES.SPORTS,
  'dota-2': CATEGORIES.ESPORTS,
  'csgo': CATEGORIES.ESPORTS,
  'lol': CATEGORIES.ESPORTS,
  'cs2': CATEGORIES.ESPORTS,
}

type LeagueProps = NavigationQuery['sports'][0]['countries'][0]['leagues'][0] & {
  url: string
  country: {
    name: string
    slug: string
  }
}

const League: React.FC<LeagueProps> = ({ url, name, country, games, slug }) => {
  const { countrySlug, leagueSlug } = useParams()
  const isActive = Boolean(leagueSlug) && countrySlug === country.slug && slug === leagueSlug

  return (
    <Href
      to={url}
      className={cx(
        'flex items-center justify-between py-2 px-4 hover:text-grey-90',
        {
          'text-grey-60': !isActive,
          'text-grey-90': isActive,
        }
      )}
    >
      <div className="flex items-center overflow-hidden">
        <Flag className="mr-2 flex-none" country={country.slug} />
        <div className="text-caption-13 text-ellipsis whitespace-nowrap overflow-hidden">{name}</div>
      </div>
      <div className="bg-grey-10 px-1 py-px ml-2 text-caption-12">{games?.length || 0}</div>
    </Href>
  )
}

type Top = {
  slug: '/'
  name: Intl.Message
  gamesCount?: number
}

type SportProps = {
  slug: string
  name: string | Intl.Message
  isExpanded: boolean
  onToggle: () => void
  category?: typeof CATEGORIES[keyof typeof CATEGORIES]
  gamesCount?: number
  countries?: NavigationQuery['sports'][0]['countries']
}

const Sport: React.FC<SportProps> = ({ slug, name, countries, isExpanded, onToggle, gamesCount }) => {
  const { sportSlug } = useParams()
  const isTop = slug === '/'
  const isUnique = slug === 'unique'
  const isActive = sportSlug === slug || (isTop && !sportSlug)

  const icon: IconName = isTop || isUnique ? 'interface/icecream' : `sport/${slug}` as IconName

  const leagues = useMemo(() => {
    if (!countries) {
      return undefined
    }

    return countries.flatMap(({ leagues: countryLeagues, name: countryName, slug: countrySlug }) =>
      countryLeagues.map((league) => ({
        url: `/${slug}/${countrySlug}/${league.slug}`,
        ...league,
        country: { name: countryName, slug: countrySlug },
      }))
    )
  }, [ countries, slug ])

  if (isTop) {
    return (
      <Href
        to="/"
        className={cx(
          'group px-4 py-2 flex w-full items-center justify-between',
          {
            'text-grey-60 hover:text-brand-50': !isActive,
            'text-brand-50': isActive,
          }
        )}
      >
        <div className="flex items-center">
          <Icon className="size-4 mr-2" name={icon} />
          <Message className="text-caption-13" value={name} />
        </div>
        <div className="text-caption-12 min-w-4 text-center">{gamesCount || 0}</div>
      </Href>
    )
  }

  return (
    <div className={cx('p-px rounded-md overflow-hidden', { 'bg-card-border-top': isExpanded })}>
      <div className={cx({ 'bg-bg-l1 rounded-md': isExpanded })}>
        <button
          onClick={onToggle}
          className={cx(
            'group px-4 py-2 flex w-full items-center justify-between',
            {
              'text-grey-60 hover:text-brand-50': !isExpanded && !isActive,
              'text-brand-50': isExpanded || isActive,
            }
          )}
        >
          <div className="flex items-center">
            <Icon className="size-4 mr-2" name={icon} />
            <Message className="text-caption-13" value={name} />
          </div>
          {Boolean(isUnique || !leagues?.length) ? (
            <div className="text-caption-12 min-w-4 text-center">{gamesCount || 0}</div>
          ) : (
            <Icon
              className={cx('h-4 w-4', { 'rotate-180': isExpanded })}
              name="interface/chevron_down"
            />
          )}
        </button>
        {Boolean(!isUnique && isExpanded && leagues) && (
          leagues?.map((league) => (
            <League key={`${league.country.slug}-${league.slug}`} {...league} />
          ))
        )}
      </div>
    </div>
  )
}

type NavigationProps = {
  className?: string
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const { isLive } = useLive()
  const { navigation, loading } = useNavigation({ withGameCount: true, isLive })
  const [ expandedSport, setExpandedSport ] = useState<string | null>(null)
  const { sportSlug } = useParams()
  useEffect(() => {
    if (typeof sportSlug === 'string') {
      setExpandedSport(sportSlug)
    }
  }, [ sportSlug ])

  const allTopGames = useMemo(() => {
    if (!navigation) {
      return 0
    }

    return navigation.reduce((total, sport) => {
      const sportGames = sport.countries.reduce((acc, country) =>
        acc + country.leagues.reduce((leagueAcc, league) =>
          leagueAcc + (league.games?.length || 0), 0), 0)
      return total + Math.min(sportGames, constants.topPageGamePerSportLimit)
    }, 0)
  }, [ navigation ])

  const sortedSports = useMemo(() => {
    if (!navigation) {
      return []
    }

    return navigation
      .map((sport) => ({
        ...sport,
        category: SPORT_CATEGORIES[sport.slug] || CATEGORIES.SPORTS,
        gamesCount: sport.countries.reduce((acc, country) =>
          acc + country.leagues.reduce((leagueAcc, league) =>
            leagueAcc + (league.games?.length || 0), 0), 0),
      }))
      .filter((sport) => sport.gamesCount > 0)
      .sort((a, b) => {
        const aIndex = constants.sportsOrder.indexOf(a.slug)
        const bIndex = constants.sportsOrder.indexOf(b.slug)
        if (aIndex >= 0 && bIndex >= 0) {
          return aIndex - bIndex
        }
        if (aIndex < 0 && bIndex >= 0) {
          return 1
        }
        if (aIndex >= 0 && bIndex < 0) {
          return -1
        }
        return 0
      })
  }, [ navigation ])

  if (loading) {
    return <Skeleton className={className} />
  }

  return (
    <div className={className}>
      <Message className="text-caption-13 font-semibold py-2 px-4 mb-2" value={messages.title} tag="p" />
      <Sport
        slug="/"
        name={messages.top}
        gamesCount={allTopGames}
        isExpanded={false}
        onToggle={() => setExpandedSport(null)}
      />
      {Object.values(CATEGORIES).map(category => {
        const sportsInCategory = sortedSports.filter(sport => sport.category === category)
        if (sportsInCategory.length === 0) {
          return null
        }
        return (
          <React.Fragment key={category}>
            <h2 className="text-caption-13 font-semibold py-2 px-4">{category}</h2>
            {sportsInCategory.map(sport => (
              <Sport
                key={sport.slug}
                {...sport}
                isExpanded={expandedSport === sport.slug}
                onToggle={() => setExpandedSport(prev => prev === sport.slug ? null : sport.slug)}
              />
            ))}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Navigation
