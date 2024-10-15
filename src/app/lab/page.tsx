'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
// Import axios

const Page: React.FC = () => {
  const [ data, setData ] = useState<any>(null) // State to hold the API response
  const [ error, setError ] = useState<string | null>(null) // State to hold any error

  useEffect(() => {
    const fetchTeamsData = async () => {
      const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
        params: {
          league: '140', // Use the league ID you are interested in
          season: '2022', // Specify the season
        },
        headers: {
        //  'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
        //  'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        },
      }

      try {
        const response = await axios.request(options)
        setData(response.data) // Set the data state with the response
        // {{ edit_1 }} Extract team ID and name and create a JSON file
        const teams = response.data.response.map((team: any) => ({
          id: team.team.id,
          name: team.team.name,
        }))
        const blob = new Blob([ JSON.stringify(teams, null, 2) ], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'teams.json'
        a.click()
        URL.revokeObjectURL(url) // Clean up the URL object
      }
      catch (error) {
        setError('Failed to fetch data') // Set the error state
        console.error(error)
      }
    }

    fetchTeamsData() // Call the function to fetch data
  }, []) // Run only once on mount

  return (
    <div>
      <h1>League Data</h1>
      {error && <p>Error: {error}</p>} {/* Display error if any */}
      {
        data && (
          <pre>{JSON.stringify(data, null, 2)}</pre> // Display the JSON response
        )
      }
    </div>
  )
}

export default Page
