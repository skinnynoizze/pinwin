import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Define more specific types
type OddsDataPoint = {
  timestamp: string;
  odds: number[];
};

export type OddsData = {
  gameId: string;
  odds1Name: string;
  odds2Name: string;
  oddsData: OddsDataPoint[];
};

type ChartDataPoint = {
  date: string;
  [key: string]: string | number | null;
};

type OddsChartProps = {
  gameId: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)

  return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`
}

const formatOdds = (value: string | number): string => {
  if (typeof value === 'number') {
    return value.toFixed(3)
  }

  return value
}

const OddsChart: React.FC<OddsChartProps> = ({ gameId, isLoading, setIsLoading }) => {
  const [ chartData, setChartData ] = useState<ChartDataPoint[]>([])
  const [ error, setError ] = useState<string | null>(null)
  const [ candidates, setCandidates ] = useState<string[]>([])

  const formatXAxis = (tickItem: string): string => {
    const date = new Date(tickItem)

    return date.toLocaleString('default', { day: 'numeric', month: 'short' })
  }

  const generateDynamicTicks = (data: ChartDataPoint[], tickCount: number): string[] => {
    const dataLength = data.length
    const today = new Date().toISOString().split('T')[0]

    const allDates = [ ...new Set([ ...data.map(item => item.date), today ]) ].sort()

    if (allDates.length <= tickCount) {
      return allDates
    }

    const interval = Math.floor((allDates.length - 1) / (tickCount - 1))
    const ticks: string[] = [ allDates[0] ]

    for (let i = interval; i < allDates.length - 1; i += interval) {
      ticks.push(allDates[i])
    }

    ticks.push(allDates[allDates.length - 1])

    return ticks
  }

  const formatTooltipValue = (value: number | string): string => {
    if (typeof value === 'number') {
      return value.toFixed(3)
    }

    return 'N/A'
  }

  useEffect(() => {
    const fetchOddsData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/odds?gameId=${gameId}`)

        if (!response.ok) {
          throw new Error('Failed to fetch odds data')
        }
        const data: OddsData = await response.json()

        if (data.oddsData.length === 0) {
          setChartData([])

          return
        }

        setCandidates([ data.odds1Name, data.odds2Name ])

        const processedData: ChartDataPoint[] = data.oddsData.map(item => ({
          date: item.timestamp,
          [data.odds1Name]: Number(item.odds[0].toFixed(3)),
          [data.odds2Name]: Number(item.odds[1].toFixed(3)),
        }))

        setChartData(processedData)
      }
      catch (error) {
        console.error('Error fetching odds data:', error)
        setError('Failed to load odds data')
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchOddsData()
  }, [ gameId, setIsLoading ])

  if (isLoading) {
    return <div className="mt-4 p-4 border border-grey-10 rounded">Loading odds data...</div>
  }

  if (error || chartData.length === 0) {
    return null
  }

  const today = new Date().toISOString().split('T')[0]
  const extendedChartData: ChartDataPoint[] = [
    ...chartData,
    ...(chartData[chartData.length - 1].date !== today
      ? [ {
        date: today,
        [candidates[0]]: null,
        [candidates[1]]: null,
      } ]
      : []),
  ]

  const dynamicTicks = generateDynamicTicks(extendedChartData, 6)

  return (
    <div className="mt-4 mb-8 p-4 border-t border-b border-grey-10 rounded-none">
      <h3 className="text-lg font-bold mb-6 text-center">On-Chain Analytics</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={extendedChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: '#fff' }}
            axisLine={false}
            tickSize={0}
            dy={10}
            height={50}
            className="text-caption-12"
            tickFormatter={formatXAxis}
            ticks={dynamicTicks}
          />
          <YAxis
            domain={[ 'auto', 'auto' ]}
            tick={{ fill: '#fff' }}
            axisLine={false}
            tickSize={0}
            dx={-10}
            width={50}
            className="text-caption-12"
            tickFormatter={(value: number) => value.toFixed(3)}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F1F1F', border: 'none' }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ color: '#fff' }}
            labelFormatter={(label: string) => formatDate(label)}
            formatter={formatTooltipValue}
          />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={
              {
                paddingTop: 5,
                marginBottom: -10,
              }
            }
          />
          {
            candidates.map((candidate, index) => (
              <Line
                key={candidate}
                type="monotone"
                dataKey={candidate}
                stroke={index === 0 ? '#8884d8' : '#82ca9d'}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 8 }}
                connectNulls
              />
            ))
          }
        </LineChart>
      </ResponsiveContainer>
      <div className="text-center mt-1">
        <span className="text-caption-12 text-grey-60">Powered by Polygon</span>
      </div>
    </div>
  )
}

export default OddsChart
