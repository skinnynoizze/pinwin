import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  timestamp: number;
  odds1: number | null;
  odds2: number | null;
};

type OddsChartProps = {
  gameId: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
    .split(' ')
    .reverse()
    .join(' ');
};

const generateEquallySpacedDates = (startDate: Date, endDate: Date, count: number): Date[] => {
  const dates: Date[] = [];
  const interval = (endDate.getTime() - startDate.getTime()) / (count - 1);
  
  return Array.from({ length: count }, (_, i) => 
    new Date(startDate.getTime() + interval * i)
  );
};

const OddsChart: React.FC<OddsChartProps> = ({ gameId, isLoading, setIsLoading }) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [gridDates, setGridDates] = useState<Date[]>([]);
  const [odds1Name, setOdds1Name] = useState<string>('');
  const [odds2Name, setOdds2Name] = useState<string>('');

  useEffect(() => {
    const fetchOddsData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/odds?gameId=${gameId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch odds data');
        }
        const data: OddsData = await response.json();
        
        if (data.oddsData.length === 0) {
          setChartData([]);
          return;
        }

        setOdds1Name(data.odds1Name);
        setOdds2Name(data.odds2Name);
        
        // Sort the data by timestamp
        const sortedData = data.oddsData.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        
        // Get the start date from the first data point and end date (today)
        const startDate = new Date(sortedData[0].timestamp);
        const endDate = new Date();
        
        // Generate 7 equally spaced dates for the grid
        const gridDates = generateEquallySpacedDates(startDate, endDate, 7);
        
        // Process all data points
        const chartData: ChartDataPoint[] = sortedData.map(item => ({
          timestamp: new Date(item.timestamp).getTime(),
          odds1: item.odds[0],
          odds2: item.odds[1]
        }));
        
        setChartData(chartData);
        setGridDates(gridDates);
      } catch (error) {
        console.error('Error fetching odds data:', error);
        setError('Failed to load odds data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOddsData();
  }, [gameId]);

  if (isLoading) {
    return <div className="mt-4 p-4 border border-grey-10 rounded">Loading odds data...</div>;
  }

  if (error || chartData.length === 0) {
    return null; // Don't render anything if there's an error or no data
  }

  return (
    <div className="mt-4 p-4 border border-grey-10 rounded">
      <h3 className="text-lg font-bold mb-6 text-center">On-Chain Analytics</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }} // Reduced bottom margin from 20 to 5
        >
          <CartesianGrid strokeDasharray="3 3" vertical={true} />
          <XAxis 
            dataKey="timestamp"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(timestamp) => formatDate(new Date(timestamp).toISOString())}
            ticks={gridDates.map(date => date.getTime())}
            tick={{ fill: '#fff' }}
            axisLine={false} // This removes the X-axis line
            tickSize={0}
            dy={10}
            height={50}
            className="text-caption-12" // Apply the smaller font size
          />
          <YAxis 
            domain={['auto', 'auto']}
            tick={{ fill: '#fff' }}
            axisLine={false} // This removes the Y-axis line
            tickSize={0}
            dx={-10}
            width={50}
            className="text-caption-12" // Apply the smaller font size
          />
          <Tooltip 
            labelFormatter={(label) => `Date: ${formatDate(new Date(label).toISOString())}`}
            formatter={(value) => [`${value}`, 'Odds']}
            contentStyle={{ backgroundColor: '#1F1F1F', border: 'none' }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend 
            layout="horizontal" // Change from 'vertical' to 'horizontal'
            align="center"      // Center align the legend
            verticalAlign="bottom" // Position at the bottom
            wrapperStyle={{ 
              paddingTop: 5,   // Add some padding at the top of the legend
              marginBottom: -10 // Adjust if needed to bring it closer to the bottom
            }}
          />
          <Line 
            type="monotone" 
            dataKey="odds1" 
            stroke="#8884d8" 
            name={odds1Name}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 8 }}
            connectNulls={true}
          />
          <Line 
            type="monotone" 
            dataKey="odds2" 
            stroke="#82ca9d" 
            name={odds2Name}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 8 }}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-center mt-1">
        <span className="text-caption-12 text-grey-60">Powered by Polygon</span>
      </div>
    </div>
  );
};

export default OddsChart;