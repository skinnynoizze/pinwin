'use client'

import { useGame, useGameStatus } from '@azuro-org/sdk'
import { type GameQuery } from '@azuro-org/toolkit'
import { useParams } from 'next/navigation'

import EventInfo, { EventInfoSkeleton } from 'compositions/event/EventInfo/EventInfo'
import Markets, { MarketsSkeleton } from 'compositions/event/Markets/Markets'
import HeadToHead from 'compositions/event/Statistics/HeadToHead'
import Tabs from 'compositions/event/Tabs'


type ContentProps = {
  game: GameQuery['games'][0]
  isGameInLive: boolean
}

const Content: React.FC<ContentProps> = ({ game, isGameInLive }) => {
  const { status } = useGameStatus({
    graphStatus: game.status,
    startsAt: +game.startsAt,
    isGameExistInLive: isGameInLive,
  })

  const tabs = [
    {
      label: 'Markets',
      content: <Markets gameId={game.gameId} gameStatus={status} startsAt={game.startsAt} />,
    },
    {
      label: 'Statistics',
      content: <HeadToHead />,
    },
  ];

  return (
    <>
      <EventInfo game={game} status={status} />
      <Tabs tabs={tabs} />
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
      <div>Game info not found</div>
    )
  }

  return (
    <Content game={game} isGameInLive={isGameInLive} />
  )
}
