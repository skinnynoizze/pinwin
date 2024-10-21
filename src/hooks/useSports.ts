import { useParams } from 'next/navigation'
import { useSports as _useSports, type UseSportsProps, useLive } from '@azuro-org/sdk'
import { Game_OrderBy, OrderDirection, type SportsQuery } from '@azuro-org/toolkit'
import { useMemo } from 'react'
import { constants } from 'helpers'


type GraphSport = SportsQuery['sports'][0]
type GraphLeague = GraphSport['countries'][0]['leagues'][0]

export type Sport = Omit<GraphSport, 'countries'> & {
  leagues: Array<GraphLeague & {
    countrySlug: string
    countryName: string
  }>
}

const useSports = () => {
  const params = useParams()
  const isTopPage = !params.sportSlug || params.sportSlug === '/'
  const { isLive } = useLive()

  const props: UseSportsProps = {
    gameOrderBy: isTopPage ? Game_OrderBy.Turnover : Game_OrderBy.StartsAt,
    orderDir: isTopPage ? OrderDirection.Desc : OrderDirection.Asc,
    filter: isTopPage ? {} : {
      sportSlug: params.sportSlug as string,
      countrySlug: params.countrySlug as string,
      leagueSlug: params.leagueSlug as string,
    },
    isLive,
  }

  const { loading, sports } = _useSports(props)

  const formattedSports = useMemo(() => {
    if (!sports?.length) {
      return []
    }

    return sports.reduce<Sport[]>((newSports, sport) => {
      const { countries, ...rest } = sport

      const newSport: Sport = {
        ...rest,
        leagues: [],
      }

      for (const country of countries) {
        const { leagues } = country

        for (const league of leagues) {
          const { games, ...leagueRest } = league

          // Apply the 4 games limit only when isTopPage is true
          const selectedGames = isTopPage ? games.slice(0, 4) : games // Take the first 4 games if isTopPage is true

          newSport.leagues.push({
            ...leagueRest,
            countrySlug: country.slug,
            countryName: country.name,
            games: selectedGames,
          })
        }
      }

      newSports.push(newSport)

      return newSports
    }, [])
  }, [ sports, isTopPage ]) // Add isTopPage to dependencies

  return {
    sports: formattedSports,
    loading,
  }
}

export default useSports
