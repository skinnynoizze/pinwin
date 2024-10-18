'use client'

import React from 'react'
import { Coins, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'


const BetCard = ({ userId, amount, odds, potentialPayout, selection, gameTitle, sportName, timestamp }) => (
  <Card className="mb-2 mt-2 text-[#b9fdfd] hover:bg-[#2d3748] transition-colors">
    <CardContent className="p-2 text-xs">
      <div className="flex justify-between items-center">
        <span className="font-semibold truncate max-w-[150px]" title={gameTitle}>{gameTitle}</span>
        <span className="opacity-70">{new Date(timestamp).toLocaleTimeString()}</span>
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="truncate max-w-[150px]" title={selection}>{selection}</span>
        <span className="text-[#b9fdfd] font-bold">{sportName}</span>
      </div>
      <div className="flex justify-between items-center mt-1">
        <div className="flex items-center space-x-1">
          <Coins className="h-3 w-3" />
          <span>${amount.toFixed(2)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <TrendingUp className="h-3 w-3" />
          <span>{odds}</span>
        </div>
        <span className="text-[#b9fdfd]">${potentialPayout.toFixed(2)}</span>
      </div>
      <div className="mt-1 text-[10px] opacity-70">
        ID: {userId}
      </div>
    </CardContent>
  </Card>
)

const CompactSportsBetsActivityFeed = () => {
  // Mock data for demonstration
  const bets = [
    {
      id: 1,
      userId: 'U12345',
      amount: 100,
      odds: '+150',
      potentialPayout: 250,
      selection: 'Lakers to win',
      gameTitle: 'Lakers vs. Warriors',
      sportName: 'Basketball',
      timestamp: new Date(Math.random() * new Date().getTime()).toISOString(),
    },
    {
      id: 2,
      userId: 'U67890',
      amount: 50,
      odds: '-110',
      potentialPayout: 95.45,
      selection: 'Over 2.5 goals',
      gameTitle: 'Manchester United vs. Chelsea',
      sportName: 'Soccer',
      timestamp: new Date(Math.random() * new Date().getTime()).toISOString(),
    },
    {
      id: 3,
      userId: 'U24680',
      amount: 75,
      odds: '+200',
      potentialPayout: 225,
      selection: 'Nadal to win',
      gameTitle: 'Nadal vs. Djokovic',
      sportName: 'Tennis',
      timestamp: new Date(Math.random() * new Date().getTime()).toISOString(),
    },
    // Add more mock data as needed
  ]

  return (
    <div className="w-full max-w-md mx-auto p-4 mt-2 text-center">
      <h2 className="text-xl font-bold mb-3">Recent Bets</h2>
      <ScrollArea className="flex flex-col items-center">
        {
          bets.map((bet) => (
            <BetCard key={bet.id} {...bet} />
          ))
        }
      </ScrollArea>
    </div>
  )
}

export default CompactSportsBetsActivityFeed
