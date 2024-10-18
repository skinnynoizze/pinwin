'use client'

import { cn } from '@/lib/utils'
import { AnimatedList } from '@/components/ui/animated-list'


interface Item {
  betId: number; // For tracking
  user: string; // User who made the bet
  game: string; // Game title
  sport: string; // Sport name
  amount: number; // Amount of the bet
  odds: string; // Odds of the bet
  potentialPayout: number; // Potential payout from the bet
  selection: string; // Selection made by the user
  timestamp: string; // Time of the bet
  icon: string; // Icon representing the bet
  color: string; // Color associated with the bet
}

let notifications = [
  {
    betId: 1,
    user: 'User123',
    game: 'Lakers vs. Warriors',
    sport: 'Basketball',
    amount: 100,
    odds: '+150',
    potentialPayout: 250,
    selection: 'Lakers to win',
    timestamp: '15m ago',
    icon: '🏀', // Icon for basketball
    color: '#00C9A7', // Color for the notification
  },
  {
    betId: 2,
    user: 'User456',
    game: 'Manchester United vs. Chelsea',
    sport: 'Soccer',
    amount: 50,
    odds: '-110',
    potentialPayout: 95.45,
    selection: 'Over 2.5 goals',
    timestamp: '10m ago',
    icon: '⚽', // Icon for soccer
    color: '#FFB800', // Color for the notification
  },
  {
    betId: 3,
    user: 'User789',
    game: 'Nadal vs. Djokovic',
    sport: 'Tennis',
    amount: 75,
    odds: '+200',
    potentialPayout: 225,
    selection: 'Nadal to win',
    timestamp: '5m ago',
    icon: '🎾', // Icon for tennis
    color: '#FF3D71', // Color for the notification
  },
  {
    betId: 4,
    user: 'User135',
    game: 'Chelsea vs. Arsenal',
    sport: 'Soccer',
    amount: 30,
    odds: '+100',
    potentialPayout: 60,
    selection: 'Chelsea to win',
    timestamp: '2m ago',
    icon: '⚽', // Icon for soccer
    color: '#1E86FF', // Color for the notification
  },
]

notifications = Array.from({ length: 2 }, () => notifications).flat()

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

export function AnimatedListDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={
        cn(
          'relative flex h-[555px] w-full flex-col p-6 overflow-hidden bg-background md:shadow-xl',
          className
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
