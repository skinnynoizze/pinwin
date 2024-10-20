// src/hooks/useLatestBets.ts
import { useQuery, gql } from '@apollo/client'

// Define your GraphQL query
const GET_LATEST_BETS = gql`
  query GetLatestBets($first: Int!) {
    bets(first: $first, orderBy: createdBlockTimestamp, orderDirection: desc) {
      betId
      status
      type
      amount
      createdBlockTimestamp
      actor
      potentialPayout
      odds
      core {
        address
      }
      selections {
        odds
        outcome {
          outcomeId
          condition {
            conditionId
            game {
              title
              sport {
                name
              }
              league {
                name
                country {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`

// Define types within the hook file
type BetOutcome = {
  outcomeId: string;
  condition: {
    conditionId: string;
    game: {
      title: string;
      sport: {
        name: string;
      };
      league: {
        name: string;
        country: {
          name: string;
        };
      };
    };
  };
};

type BetSelection = {
  odds: string;
  outcome: BetOutcome;
};

type BetCore = {
  address: string;
};

type Bet = {
  betId: string;
  status: string;
  type: string;
  amount: string;
  createdBlockTimestamp: string;
  actor: string;
  potentialPayout: string;
  odds: string;
  core: BetCore;
  selections: BetSelection[];
};

// Update the hook to accept the client as a second parameter
const useLatestBets = (first: number, client: any) => {
  const { loading, error, data } = useQuery(GET_LATEST_BETS, {
    variables: { first },
    client, // Use the passed client
  })

  const bets: Bet[] = data?.bets || []

  return {
    bets,
    loading,
    error,
  }
}

export default useLatestBets
