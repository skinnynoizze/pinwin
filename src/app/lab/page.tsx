// src/app/lab/page.tsx
'use client'

import React from 'react'
import { useApolloClients } from '@azuro-org/sdk'
import useLatestBets from '../../hooks/useLatestBets'


export default function LabPage() {
  const { prematchClient } = useApolloClients()
  const { bets, loading, error } = useLatestBets(10, prematchClient)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Latest Bets</h1>
      {
        bets.length === 0 ? (
          <p>No bets available.</p>
        ) : (
          bets.map(bet => (
            <div key={bet.betId}>
              <h3>Status: {bet.status}</h3>
              <p>Type: {bet.type}</p>
              <p>Amount: {bet.amount}</p>
              <p>Created At: {new Date(Number(bet.createdBlockTimestamp) * 1000).toLocaleString()}</p>
              {/* Add more fields as needed */}
            </div>
          ))
        )
      }
    </div>
  )
}
