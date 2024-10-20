'use client'

import React from 'react'
import { useApolloClients } from '@azuro-org/sdk' // Import useApolloClients
import { cn } from '@/lib/utils'
import { AnimatedList } from '@/components/ui/animated-list'
import useLatestBets from '../../hooks/useLatestBets' // Import your useLatestBets hook

// Update the Item interface to match the Bet structure
interface Item {
  betId: string; // For tracking
  user: string; // You may need to derive this from the actor or another field
  game: string; // You may need to derive this from the selections or another field
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
  const { prematchClient } = useApolloClients() // Get the prematch client
  const { bets, loading, error } = useLatestBets(10, prematchClient) // Fetch the latest 10 bets

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  // Transform the fetched bets into the notifications format
  const notifications: Item[] = bets.map(bet => ({
    betId: bet.betId,
    user: bet.actor, // Assuming actor is the user
    game: bet.selections[0]?.outcome.condition.game.title || 'Unknown Game', // Derive game title from selections
    sport: bet.selections[0]?.outcome.condition.game.sport.name || 'Unknown Sport', // Derive sport name from selections
    amount: bet.amount,
    odds: bet.odds,
    potentialPayout: bet.potentialPayout,
    selection: bet.selections[0]?.outcome.outcomeId || 'Unknown Selection', // Derive selection from selections
    timestamp: new Date(Number(bet.createdBlockTimestamp) * 1000).toLocaleString(), // Convert timestamp
    icon: sportIcons[bet.selections[0]?.outcome.condition.game.sport.name] || '🏅', // Use the sport name to get the icon, default to a medal
    color: '#00C9A7', // You can customize this based on the bet type or status
  }))

  return (
    <div
      className={
        cn(
          'relative flex h-auto w-full flex-col p-6 overflow-hidden bg-background md:shadow-xl',
          'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 mb-4',
          // animation styles
          'transition-all duration-200 ease-in-out hover:shadow-lg',
          // light styles
          'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
          // dark styles
          'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
        )
      }
    >
      <AnimatedList>
        {
          notifications.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))
        }
      </AnimatedList>
    </div>
  )
}

const Notification = ({ user, game, sport, amount, odds, potentialPayout, selection, timestamp, icon, color }: Item) => {
  // Construct a URL for the game (this is just an example, adjust as needed)
  const gameUrl = `/games/${game.replace(/\s+/g, '-').toLowerCase()}` // Example URL structure

  return (
    <figure
      className={
        cn(
          'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 mb-4',
          // animation styles
          'transition-all duration-200 ease-in-out hover:shadow-lg',
          // light styles
          'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
          // dark styles
          'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
        )
      }
      style={{ borderColor: color }} // Optional: Use color for border or background
    >
      <a href={gameUrl} className="flex flex-row items-center gap-3"> {/* Wrap the content in an anchor tag */}
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={
            {
              backgroundColor: color, // Use color for the background
            }
          }
        >
          <span className="text-lg">{icon}</span> {/* Display the icon */}
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-sm font-medium dark:text-white ">
            <span className="text-xs sm:text-sm">{user}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{timestamp}</span>
          </figcaption>
          <p className="text-xs font-normal dark:text-white/60">
            {selection} on {game} ({sport}) - Amount: ${amount}, Odds: {odds}, Potential Payout: ${potentialPayout}
          </p>
        </div>
      </a>
    </figure>
  )
}

export default ActivityFeed
