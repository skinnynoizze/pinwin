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
  date: string;
  [key: string]: number | string;
};

type OddsChartProps = {
  gameId: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short' });
};

const OddsChart: React.FC<OddsChartProps> = ({ gameId, isLoading, setIsLoading }) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<string[]>([]);

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

        setCandidates([data.odds1Name, data.odds2Name]);
        
        const processedData: ChartDataPoint[] = data.oddsData.map(item => ({
          date: formatDate(item.timestamp),
          [data.odds1Name]: parseFloat((1 / item.odds[0] * 100).toFixed(2)),
          [data.odds2Name]: parseFloat((1 / item.odds[1] * 100).toFixed(2))
        }));
        
        setChartData(processedData);
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
    return null;
  }

  return (
    <div className="mt-4 p-4 border border-grey-10 rounded bg-dark-blue">
      <h3 className="text-lg font-bold mb-6 text-center text-white">Presidential forecast</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="date"
            tick={{ fill: '#fff' }}
            axisLine={{ stroke: '#444' }}
          />
          <YAxis 
            domain={[0, 100]}
            tick={{ fill: '#fff' }}
            axisLine={{ stroke: '#444' }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F1F1F', border: 'none' }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value) => [`${value}%`, '']}
          />
          <Legend />
          {candidates.map((candidate, index) => (
            <Line 
              key={candidate}
              type="monotone" 
              dataKey={candidate} 
              stroke={index === 0 ? '#ff4d4d' : '#ff00ff'} 
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <div className="text-center mt-1">
        <span className="text-caption-12 text-grey-60">Source: Polymarket.com</span>
      </div>
    </div>
  );
};

export default OddsChart;