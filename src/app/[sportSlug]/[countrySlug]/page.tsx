'use client'

import { useSports } from 'hooks'
import { useParams } from 'next/navigation'

import { LeagueSkeleton } from 'compositions/events/League/League'
import EmptyContent from 'compositions/events/EmptyContent/EmptyContent'
import Navbar, { NavbarSkeleton } from 'compositions/events/Navbar/Navbar'
import FilteredLeagues from 'compositions/events/FilteredLeagues/FilteredLeagues'
import UniqueEvents from 'compositions/events/UniqueEvents/UniqueEvents'


export default function CountryPage() {
  const { sports, loading } = useSports()
  const params = useParams()
  const sportSlug = params.sportSlug as string
  const countrySlug = params.countrySlug as string

  if (loading) {
    return (
      <>
        <NavbarSkeleton />
        <LeagueSkeleton isPage />
      </>
    )
  }

  if (!sports) {
    return <EmptyContent />
  }

  const sport = sports.find(s => s.slug === sportSlug)

  if (!sport) {
    return <EmptyContent />
  }

  const { leagues } = sport

  // Filter leagues by country
  const countryLeagues = leagues.filter(league =>
    league.games.some(game => game.league.country.slug === countrySlug)
  )

  // If no leagues are found for the country, show empty content
  if (countryLeagues.length === 0) {
    return <EmptyContent />
  }

  return (
    <Navbar>
      {
        sport.slug === 'unique' ? (
          <UniqueEvents leagues={countryLeagues} />
        ) : (
          <FilteredLeagues
            sportSlug={sportSlug}
            leagues={countryLeagues}
            isPage
          />
        )
      }
    </Navbar>
  )
}
