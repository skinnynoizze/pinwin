'use client'

import React, { useState, useMemo } from 'react'
import { useApolloClients } from '@azuro-org/sdk' // Import useApolloClients
import { cn } from '@/lib/utils'
import { AnimatedList } from '@/components/ui/animated-list'
import { Icon } from 'components/ui' // Assuming you have an Icon component
import useLatestBets from '../../hooks/useLatestBets' // Import your useLatestBets hook
import shortenAddress from '../../helpers/shortenAddress'

// Update the Item interface to match the Bet structure
interface Item {
  betId: string; // For tracking
  user: string; // You may need to derive this from the actor or another field
  game: {
    title: string;
    sport: {
      name: string;
    };
    league: {
      name: string;
      country: {
        name: string;
      };
    };
  };
  sport: string; // You may need to derive this from the selections or another field
  amount: string; // Amount of the bet
  odds: string; // Odds of the bet
  potentialPayout: string; // Potential payout from the bet
  selection: string; // Selection made by the user
  timestamp: string; // Time of the bet
  icon: string; // Icon representing the bet
  color: string; // Color associated with the bet
}

// Define a mapping of sport names to icons
const sportIcons: { [key: string]: string } = {
  'Football': '⚽', // Soccer
  'Basketball': '🏀',
  'Tennis': '🎾',
  'Baseball': '⚾',
  'Hockey': '🏒',
  'Golf': '⛳',
  'Rugby': '🏉',
  'Cricket': '🏏',
  // Add more sports and their corresponding icons as needed
}

// Component to display the activity feed
const ActivityFeed = () => {
  const [ isCollapsed, setIsCollapsed ] = useState(false)
  const { prematchClient } = useApolloClients() // Get the prematch client
  const { bets, loading, error } = useLatestBets(5, prematchClient) // Fetch the latest 5 bets

  // Update the transformation of bets to notifications
  const notifications: Item[] = useMemo(() => {
    if (!bets) {
      return []
    }

    return bets.map(bet => ({
      betId: bet.betId,
      user: bet.actor, // Assuming actor is the user
      game: {
        title: bet.selections[0]?.outcome.condition.game.title || 'Unknown Game',
        sport: {
          name: bet.selections[0]?.outcome.condition.game.sport.name || 'Unknown Sport',
        },
        league: {
          name: bet.selections[0]?.outcome.condition.game.league.name || 'Unknown League',
          country: {
            name: bet.selections[0]?.outcome.condition.game.league.country.name || 'Unknown Country',
          },
        },
      },
      sport: bet.selections[0]?.outcome.condition.game.sport.name || 'Unknown Sport',
      amount: bet.amount,
      odds: bet.odds,
      potentialPayout: bet.potentialPayout,
      selection: bet.selections[0]?.outcome.outcomeId || 'Unknown Selection', // Derive selection from selections
      timestamp: new Date(Number(bet.createdBlockTimestamp) * 1000).toLocaleString(), // Convert timestamp
      icon: sportIcons[bet.selections[0]?.outcome.condition.game.sport.name] || '🏅', // Use the sport name to get the icon, default to a medal
      color: '', // You can customize this based on the bet type or status
    })).reverse() // Reverse the order here
  }, [ bets ])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div
      className={
        cn(
          'relative flex flex-col overflow-hidden bg-background md:shadow-xl',
          'relative mx-auto w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl mb-4',
          isCollapsed ? 'h-16' : 'h-auto'
        )
      }
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold">Recent Bets</h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="focus:outline-none"
        >
          <Icon
            name={isCollapsed ? 'interface/chevron_down' : 'interface/chevron_up'}
            className="h-6 w-6 text-gray-500"
          />
        </button>
      </div>
      <div className={cn('overflow-hidden transition-all duration-300', isCollapsed ? 'max-h-0' : 'max-h-[1000px]')}>
        <AnimatedList>
          {
            notifications.map((item, idx) => (
              <Notification {...item} key={item.betId || idx} />
            ))
          }
        </AnimatedList>
      </div>
    </div>
  )
}

const Notification = ({ user, game, sport, amount, odds, potentialPayout, selection, timestamp, icon, color }: Item) => {
  const sportUrl = sport?.toLowerCase().replace(/\s+/g, '-') || 'unknown-sport'
  const leagueUrl = game?.league?.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown-league'
  const gameId = game?.title?.toLowerCase().replace(/\s+/g, '-') || 'unknown-game'
  const gameUrl = `/${sportUrl}/${leagueUrl}/${gameId}`

  const shortenedUser = shortenAddress(user)

  // Format odds and potentialPayout to 2 decimal places
  const formattedOdds = parseFloat(odds || '0').toFixed(2)
  const formattedPayout = parseFloat(potentialPayout || '0').toFixed(2)

  return (
    <figure
      className={
        cn(
          'relative w-full cursor-pointer overflow-hidden rounded-lg p-2 mb-2',
          'transition-all duration-200 ease-in-out hover:shadow-md',
          'bg-white dark:bg-gray-800',
          'border border-gray-200 dark:border-gray-700'
        )
      }
    >
      <a href={gameUrl} className="flex items-center gap-2">
        <div
          className="flex size-8 items-center justify-center rounded-full"
          style={{ backgroundColor: color }}
        >
          <span className="text-sm">{icon}</span>
        </div>
        <div className="flex-grow overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-900 dark:text-white">{shortenedUser}</span>
            <span className="text-xs text-gray-500">{timestamp}</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
            {game?.title || 'Unknown Game'} ({sport || 'Unknown Sport'})
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ${amount} @ {formattedOdds} | Payout: ${formattedPayout}
          </p>
        </div>
      </a>
    </figure>
  )
}

export default ActivityFeed
