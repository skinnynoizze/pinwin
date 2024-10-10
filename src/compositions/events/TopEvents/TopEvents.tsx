'use client'

import React, { useEffect, useRef, useState, useContext, useCallback } from 'react'
import { Message } from '@locmod/intl'
import { useParams } from 'next/navigation'
import { useActiveMarkets, useGames } from '@azuro-org/sdk'
import { Game_OrderBy, type GamesQuery, GameStatus } from '@azuro-org/toolkit'
import cx from 'classnames'
import { getGameDateTime } from 'helpers/getters'

import { Icon, type IconName } from 'components/ui'
import { OpponentLogo } from 'components/dataDisplay'
import { Href } from 'components/navigation'
import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'

import messages from './messages'


const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cx('bone h-[12.125rem] w-full rounded-md', className)} />
  )
}

type CardProps = {
  game: GamesQuery['games'][0]
}

const Card: React.FC<CardProps> = ({ game }) => {
  const {
    sport: {
      slug: sportSlug,
    },
    league: {
      name: leagueName,
      slug: leagueSlug,
      country: {
        name: countryName,
        slug: countrySlug,
      },
    },
    gameId,
    participants,
    startsAt,
    title,
  } = game

  const { date, time } = getGameDateTime(+startsAt * 1000)

  const { markets, loading } = useActiveMarkets({
    gameId: game.gameId,
    gameStatus: GameStatus.Created,
  })

  const marketsRow = markets?.[0]?.outcomeRows?.[0]

  return (
    <div className="bg-card-border-bottom p-px rounded-md overflow-hidden">
      <div className="p-4 bg-grey-10 rounded-md">
        <Href to={`${sportSlug}/${countrySlug}/${leagueSlug}/${gameId}`} className="flex items-center justify-center text-grey-60 text-caption-13 hover:underline">
          <Icon className="size-4 mr-2 flex-none" name={`sport/${sportSlug}` as IconName} />
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">{countryName}</span>
          <div className="size-[2px] rounded-full bg-grey-20 mx-1" />
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">{leagueName}</span>
        </Href>
        <div className="mt-3 flex items-center justify-between px-7">
          <OpponentLogo image={participants[0].image} size={48} />
          <div className="text-caption-12 text-center">
            <div className="text-grey-60">{date}</div>
            <div className="font-semibold mt-[2px]">{time}</div>
          </div>
          <OpponentLogo image={participants[1].image} size={48} />
        </div>
        <div className="mt-5 text-caption-13 font-semibold text-center text-ellipsis whitespace-nowrap overflow-hidden">{title}</div>
        <div className="mt-3 flex items-center space-x-2">
          {
            loading ? (
              <>
                <div className="bone w-full h-7 rounded-sm" />
                <div className="bone w-full h-7 rounded-sm" />
                <div className="bone w-full h-7 rounded-sm" />
              </>
            ) : (
              marketsRow.map(outcome => (
                <OutcomeButton key={outcome.outcomeId} outcome={outcome} />
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

const sliderConfiguration = {
  gap: 8,
  perView: 3,
  startAt: 0,
  focusAt: 0,
  autoplay: 5000,
  bound: true,
  breakpoints: {
    802: {
      perView: 1.1,
    },
  },
}

const TopEvents: React.FC = () => {
  const params = useParams()
  const sport = messages[params.sportSlug as string]
  const { games, loading } = useGames({
    filter: { limit: 9 },
    orderBy: Game_OrderBy.Turnover,
  })
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const totalGroups = Math.ceil((games?.length || 0) / 3)

  const startAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
    }
    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalGroups)
    }, 5000)
  }, [ totalGroups ])

  const moveCarousel = (direction: 'next' | 'prev') => {
    setCurrentIndex(prevIndex => {
      if (direction === 'next') {
        return (prevIndex + 1) % totalGroups
      }
      else {
        return (prevIndex - 1 + totalGroups) % totalGroups
      }
    })
    startAutoplay() // Restart autoplay after manual navigation
  }

  useEffect(() => {
    startAutoplay()

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [ startAutoplay ])

  return (
    <div className="relative pt-6">
      <div className="px-4 flex justify-between items-center mb-4">
        <div>
          <Message className="text-caption-13 text-grey-60 uppercase" value={messages.title} />
          <h1 className="text-heading-h1 font-bold">
            <Message className="text-brand-50" value={messages.top} />
            {
              Boolean(sport) && (
                <Message className="ml-2" value={sport} />
              )
            }
            <Message className="ml-2" value={messages.events} />
          </h1>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => moveCarousel('prev')}
            className="w-8 h-6 flex items-center justify-center bg-bg-l0 rounded-tl-full rounded-tr-1 rounded-br-1 rounded-bl-full border border-grey-15 text-grey-60 hover:text-grey-90 transition"
          >
            <Icon className="size-5" name="interface/chevron_left" />
          </button>
          <button
            onClick={() => moveCarousel('next')}
            className="w-8 h-6 flex items-center justify-center bg-bg-l0 rounded-tl-1 rounded-tr-full rounded-br-full rounded-bl-1 border border-grey-15 text-grey-60 hover:text-grey-90 transition"
          >
            <Icon className="size-5" name="interface/chevron_right" />
          </button>
        </div>
      </div>
      {
        loading ? (
          <div className="flex justify-between mt-6 space-x-4">
            <CardSkeleton />
            <CardSkeleton className="hidden md:block" />
            <CardSkeleton className="hidden md:block" />
          </div>
        ) : (
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {
                games?.map((game, index) => (
                  <div key={game.gameId} className="w-1/3 flex-shrink-0 px-2">
                    <Card game={game} />
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default TopEvents
