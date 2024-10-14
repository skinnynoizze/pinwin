// src/app/lab/MarketInfo.tsx
import React from 'react'
import { useActiveMarkets } from '@azuro-org/sdk'
import { type GameStatus } from '@azuro-org/toolkit'


const MarketInfo: React.FC<{ gameId: string; gameStatus: GameStatus }> = ({ gameId, gameStatus }) => {
  const { loading, error, markets } = useActiveMarkets({
    gameId,
    gameStatus, // Use the enum value directly
  })

  if (loading) {
    return <p>Loading markets...</p>
  }

  if (error) {
    return <p>Error fetching markets: {error.message}</p>
  }

  return (
    <ul>
      {
        markets.map((market) => (
          <li key={market.name}>
            <strong>{market.name}</strong>: {market.description}
            <ul>
              {
                market.outcomeRows.map((outcomeRow, rowIndex) => (
                  <li key={rowIndex}>
                    {
                      outcomeRow.map((outcome) => (
                        <div key={outcome.outcomeId}>
                          {outcome.selectionName} - Odds: {outcome.odds}
                        </div>
                      ))
                    }
                  </li>
                ))
              }
            </ul>
          </li>
        ))
      }
    </ul>
  )
}

export default MarketInfo
