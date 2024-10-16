'use client'

import { useGame, useGameStatus } from '@azuro-org/sdk'
import { type GameQuery } from '@azuro-org/toolkit'
import { useParams } from 'next/navigation'
import { Tab } from '@headlessui/react'

import EventInfo, { EventInfoSkeleton } from 'compositions/event/EventInfo/EventInfo'
import Markets, { MarketsSkeleton } from 'compositions/event/Markets/Markets'
import Statistics from 'compositions/event/Statistics/Statistics'


type ContentProps = {
  game: GameQuery['games'][0]
  isGameInLive: boolean
  leagueName: string // Add leagueName to props
}

const Content: React.FC<ContentProps> = ({ game, isGameInLive, leagueName }) => {
  const { status } = useGameStatus({
    graphStatus: game.status,
    startsAt: +game.startsAt,
    isGameExistInLive: isGameInLive,
  })

  return (
    <>
      <EventInfo game={game} status={status} />
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-gray-800 rounded-xl mt-4">
          <Tab
            className={
              ({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 rounded-lg
              focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-800 ring-brand-50 ring-opacity-60
              ${selected
      ? 'bg-brand-50 text-gray-900 shadow'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`
            }
          >
            Markets
          </Tab>
          <Tab
            className={
              ({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 rounded-lg
              focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-800 ring-brand-50 ring-opacity-60
              ${selected
      ? 'bg-brand-50 text-gray-900 shadow'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`
            }
          >
            Statistics
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <Markets gameId={game.gameId} gameStatus={status} startsAt={game.startsAt} />
          </Tab.Panel>
          <Tab.Panel>
            <Statistics gameId={game.gameId} leagueName={leagueName} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}

export default function EventPage() {
  const params = useParams()

  const { loading, game, isGameInLive } = useGame({
    gameId: params.gameId as string,
  })

  if (loading) {
    return (
      <>
        <EventInfoSkeleton />
        <MarketsSkeleton />
      </>
    )
  }

  if (!game) {
    return (
      <div className="text-gray-300">Game info not found</div>
    )
  }

  const leagueName = game.league.name // Extract leagueName from the game object

  return (
    <Content game={game} isGameInLive={isGameInLive} leagueName={leagueName} />
  )
}
