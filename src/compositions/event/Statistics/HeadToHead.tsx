import React from 'react';
import { OpponentLogo } from 'components/dataDisplay';
import headToHeadData from 'src/data/head2head.json';

type Match = {
  fixture: { date: string };
  teams: {
    home: { name: string; image: string };
    away: { name: string; image: string };
  };
  goals: { home: number; away: number };
};

const HeadToHead: React.FC = () => {
  // Extract head-to-head data
  const headToHeadMatches: Match[] = headToHeadData.response
    .sort((a, b) => new Date(b.fixture.date).getTime() - new Date(a.fixture.date).getTime()) // Sort by date descending
    .slice(0, 5); // Get the most recent 5 matches

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold text-center text-white mb-2">Head-to-Head</h3>
      <div className="max-w-3xl mx-auto px-4">
        <div className="space-y-2">
          {
            headToHeadMatches.reduce((acc, match) => {
              const matchDate = new Date(match.fixture.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
              const lastDate = acc.length > 0 ? acc[acc.length - 1].date : null;

              // If the date is different, create a new header row
              if (matchDate !== lastDate) {
                acc.push({ date: matchDate, matches: [match] });
              } else {
                acc[acc.length - 1].matches.push(match);
              }

              return acc;
            }, []).map((group, index) => (
              <div key={index} className="rounded-md bg-bg-l2 p-2 mb-1 shadow-md">
                <div className="date-header text-gray-400 text-center text-sm mb-1 font-semibold">
                  {group.date}
                </div>
                {group.matches.map((match, matchIndex) => (
                  <div key={matchIndex} className="match flex justify-between items-center py-1">
                    <div className="team team-left flex items-center w-1/2 justify-end text-right">
                      <OpponentLogo image={match.teams.home.image} size={28} />
                      <span className="ml-1 text-white">{match.teams.home.name}</span>
                    </div>
                    <div className="score font-bold text-center w-1/4 text-white">
                      <span className={match.goals.home > match.goals.away ? 'win' : match.goals.home < match.goals.away ? 'lose' : ''}>{match.goals.home}</span> - 
                      <span className={match.goals.home < match.goals.away ? 'win' : match.goals.home > match.goals.away ? 'lose' : ''}>{match.goals.away}</span>
                    </div>
                    <div className="team team-right flex items-center w-1/2 justify-start text-left">
                      <span className="mr-1 text-white">{match.teams.away.name}</span>
                      <OpponentLogo image={match.teams.away.image} size={28} />
                    </div>
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default HeadToHead;