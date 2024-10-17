'use client'

import React from 'react'
import { type Sport } from 'hooks'

import { Flag } from 'components/dataDisplay'
import { Href } from 'components/navigation'

import Game, { GameSkeleton } from 'compositions/events/Game/Game'


export const LeagueSkeleton: React.FC<{isPage?: boolean}> = ({ isPage = false }) => {
  return (
    <div className="mt-1 first-of-type:mt-0 mb-4">
      {
        isPage ? (
          <div className="py-3 px-4">
            <div className="bone h-[1.375rem] w-44 rounded-full" />
          </div>
        ) : (
          <div className="mb-2 w-full"> {/* Keep it full width */}
            <div className="rounded-t-md flex items-center justify-start py-2 px-4 bg-gray-800">
              <div className="flex items-center">
                <div className="bone size-4 mr-2 rounded-full" />
                <div className="bone h-[0.875rem] w-[8rem] rounded-md" />
                <div className="size-1 rounded-full mx-2 bg-grey-20" />
                <div className="bone h-[0.875rem] w-[4rem] rounded-md" />
              </div>
            </div>
          </div>
        )
      }
      <div className="grid grid-cols-2 mb:grid-cols-1 gap-2">
        {
          new Array(2).fill(0).map((_, index) => ( // Adjust to show 2 skeletons for evenness
            <GameSkeleton key={index} className="w-full" />
          ))
        }
      </div>
    </div>
  )
}

type LeagueProps = {
  sportSlug: string
  league: Sport['leagues'][0]
  isPage?: boolean
}

const League: React.FC<LeagueProps> = ({ sportSlug, league, isPage = false }) => {
  const { slug, name, countryName, countrySlug, games } = league

  const leagueUrl = `/${sportSlug}/${countrySlug}/${slug}`
  const countryUrl = `/${sportSlug}/${countrySlug}`

  // Ensure an even number of games
  const adjustedGames = games.length % 2 === 1 ? [ ...games, games[games.length - 1] ] : games

  return (
    <div className="mt-1 first-of-type:mt-0 mb-4">
      {
        isPage && (
          <div className="py-3 px-4">
            <div className="text-heading-h4 font-semibold">{name}</div>
          </div>
        )
      }

      <div className="mb-2 w-full"> {/* Keep it full width */}
        <div className="rounded-t-md flex items-center justify-start py-2 px-4 bg-gray-800">
          <Href to={leagueUrl} className="flex items-center hover:underline">
            <Flag className="mr-2" country={countrySlug} />
            <div className="text-caption-13 text-grey-70">{countryName}</div>
          </Href>
          <Href to={leagueUrl} className="flex items-center hover:underline">
            <div className="size-1 rounded-full mx-2 bg-grey-20" />
            <div className="text-caption-13">{name}</div>
          </Href>
        </div>
      </div>

      <div className="grid grid-cols-2 mb:grid-cols-1 gap-2">
        {
          adjustedGames.map(game => (
            <Game
              key={game.gameId}
              leagueUrl={leagueUrl}
              game={game}
              withTopRadius={isPage}
            />
          ))
        }
      </div>
    </div>
  )
}

export default League
