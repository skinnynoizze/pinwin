'use client'

import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import OddsChart from '../OddsChart'
// Add this import

type StatisticsProps = {
  gameId: string; // Add gameId prop
  leagueName: string; // Add leagueName prop
  // Define other props here when needed
};

const Statistics: React.FC<StatisticsProps> = ({ gameId, leagueName }) => {
  const [ radarData, setRadarData ] = useState([]) // State for radar data
  const [ totalData, setTotalData ] = useState([]) // State for total data
  const [ error, setError ] = useState<string | null>(null) // State for error handling

  useEffect(() => {
    const fetchStatisticsData = async () => {
      try {
        const response = await fetch('/api/statistics') // Fetch from the new API route

        if (!response.ok) {
          throw new Error('Failed to fetch statistics data')
        }
        const data = await response.json()

        // Filter data based on gameId and leagueName
        const gameData = data.find((item: any) => item.gameId === gameId && item.leagueName === leagueName)

        if (gameData) {
          setRadarData(gameData.radarData)
          setTotalData(gameData.totalData)
        }
        else {
          // Check if the gameId is the specific one to show OddsChart
          if (gameId === '1001000000001596805632') {
            setError(null) // Clear error state
          }
          else {
            setError('No data found for the specified gameId and leagueName')
          }
        }
      }
      catch (error) {
        console.error('Error fetching statistics data:', error)
        setError('Failed to load statistics data')
      }
    }

    fetchStatisticsData()
  }, [ gameId, leagueName ])

  if (error && gameId !== '1001000000001596805632') {
    return <p className="text-center text-red-500">{error}</p> // Display error message if not the specific gameId
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Conditional rendering based on leagueName */}
      {
        leagueName === 'La Liga' ? (
          <>
            {/* Radar Graph */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Detailed Performance Breakdown</h2>
              <p className="text-gray-600 mb-4">Comparative view across all categories</p>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={radarData}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={30} domain={[ 0, 100 ]} />
                    <Radar
                      name="Home Team"
                      dataKey="home"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Away Team"
                      dataKey="away"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Total Performance Bar Chart */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Overall Performance</h2>
              <p className="text-gray-600 mb-4">Total comparison between Home and Away teams</p>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={totalData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[ 0, 100 ]} tickFormatter={(value) => `${value}%`} />
                    <YAxis dataKey="category" type="category" width={80} />
                    <Tooltip
                      formatter={(value) => `${value}%`}
                      labelStyle={{ color: '#333' }}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                    />
                    <Legend />
                    <Bar
                      dataKey="home"
                      fill="#8884d8"
                      name="Home Team"
                      stackId="a"
                    />
                    <Bar
                      dataKey="away"
                      fill="#82ca9d"
                      name="Away Team"
                      stackId="a"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Conditional OddsChart rendering */}
            {
              gameId === '1001000000001596805632' && (
                <OddsChart
                  gameId={gameId}
                  isLoading={false} // Set loading state as needed
                  setIsLoading={() => {}} // Provide a no-op function or handle loading state
                />
              )
            }
          </>
        ) : (
          gameId === '1001000000001596805632' ? (
            <OddsChart
              gameId={gameId}
              isLoading={false} // Set loading state as needed
              setIsLoading={() => {}} // Provide a no-op function or handle loading state
            />
          ) : (
            <p className="text-center text-red-500">Soon more statistics for all kinds of events.</p>
          )
        )
      }
    </div>
  )
}

export default Statistics
