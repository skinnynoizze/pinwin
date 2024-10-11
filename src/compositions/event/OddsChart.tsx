import React, { useEffect, useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { TooltipProps } from 'recharts'

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

type TooltipFormatter = (value: number, name: string, props: { payload: ChartDataPoint }) => [string, string];

// Use the TooltipProps from recharts
type CustomTooltipProps = TooltipProps<number, string>;

const formatDate = (dateString: string | number): string => {
  const date = new Date(dateString)

  return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
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
  const [ displayMode, setDisplayMode ] = useState<'odds' | 'percentage'>('odds')

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

  const convertToPercentage = (odds: number): number => {
    return (1 / odds) * 100
  }

  const formatYAxis = (value: number): string => {
    if (displayMode === 'percentage') {
      return `${value.toFixed(1)}%`
    }

    return value.toFixed(3)
  }

  const formatTooltipValue = (value: number, name: string, props: CustomTooltipProps): [string, string] => {
    const formattedValue = displayMode === 'percentage'
      ? `${value.toFixed(1)}%`
      : value.toFixed(3)

    return [ formattedValue, name ]
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

  const extendedChartData = useMemo(() => {
    if (chartData.length === 0) {
      return []
    }

    const today = new Date().toISOString().split('T')[0]

    return [
      ...chartData,
      ...(chartData[chartData.length - 1].date !== today
        ? [ {
          date: today,
          [candidates[0]]: null,
          [candidates[1]]: null,
        } ]
        : []),
    ]
  }, [ chartData, candidates ])

  const dynamicTicks = useMemo(() => {
    return generateDynamicTicks(extendedChartData, 6)
  }, [ extendedChartData ])

  const processedChartData = useMemo(() => {
    return extendedChartData.map(dataPoint => ({
      ...dataPoint,
      [candidates[0]]: dataPoint[candidates[0]] !== null
        ? (displayMode === 'percentage'
          ? convertToPercentage(dataPoint[candidates[0]] as number)
          : dataPoint[candidates[0]])
        : null,
      [candidates[1]]: dataPoint[candidates[1]] !== null
        ? (displayMode === 'percentage'
          ? convertToPercentage(dataPoint[candidates[1]] as number)
          : dataPoint[candidates[1]])
        : null,
    }))
  }, [ extendedChartData, candidates, displayMode ])

  const yAxisDomain = useMemo(() => {
    if (displayMode === 'odds') {
      return [ 'auto', 'auto' ]
    }

    const allValues = processedChartData.flatMap(dataPoint =>
      candidates.map(candidate => dataPoint[candidate])
    ).filter((value): value is number => value !== null)

    const minValue = Math.floor(Math.min(...allValues))
    const maxValue = Math.ceil(Math.max(...allValues))

    // Add some padding to the domain
    const padding = (maxValue - minValue) * 0.1

    return [ Math.max(0, minValue - padding), Math.min(100, maxValue + padding) ]
  }, [ processedChartData, candidates, displayMode ])

  if (isLoading) {
    return <div className="mt-4 p-4 border border-grey-10 rounded">Loading odds data...</div>
  }

  if (error || chartData.length === 0) {
    return null
  }

  return (
    <div className="mt-4 mb-8 p-4 border-t border-b border-grey-10 rounded-none">
      <div className="flex flex-row items-center mb-6 relative">
        {/* Desktop and medium layout */}
        <div className="hidden ds:block flex-grow" />
        <h3 className="text-lg font-bold mb-0 ds:absolute ds:left-1/2 ds:transform ds:-translate-x-1/2">On-Chain Analytics</h3>
        <div className="flex-grow flex justify-end">
          <select
            className="bg-bg-l2 text-white border border-grey-20 rounded-min px-3 py-2 text-caption-14 font-medium appearance-none cursor-pointer hover:bg-bg-l3 focus:outline-none focus:ring-2 focus:ring-brand-50"
            value={displayMode}
            onChange={(e) => setDisplayMode(e.target.value as 'odds' | 'percentage')}
            style={
              {
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'%23999999\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem',
              }
            }
          >
            <option value="odds">Odds</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={processedChartData}
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
            domain={yAxisDomain}
            tick={{ fill: '#fff' }}
            axisLine={false}
            tickSize={0}
            dx={-10}
            width={50}
            className="text-caption-12"
            tickFormatter={formatYAxis}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F1F1F', border: 'none' }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ color: '#fff' }}
            labelFormatter={(label) => formatDate(label)}
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
