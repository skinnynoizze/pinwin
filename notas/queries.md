## GetBets

```
query GetBets($where: Bet_filter!) {
  bets(where: $where, first: 1000, subgraphError: allow) {
    ...BetDetails
    __typename
  }
}

fragment BetDetails on Bet {
  id
  betId
  actor
  affiliate
  amount
  bettor
  core {
    address
    liquidityPool {
      address
      __typename
    }
    __typename
  }
  createdBlockNumber
  createdBlockTimestamp
  createdTxHash
  freebet {
    id
    __typename
  }
  approxSettledAt
  _games {
    id
    league {
      id
    }
    participants {
      id
      name
    }
    __typename
  }
  _conditions {
    id
    game {
      id
      title      
    }
    __typename
  }
  _lostSubBetsCount
  _wonSubBetsCount
  _subBetsCount
  _oddsDecimals
  _tokenDecimals
  _updatedAt
  __typename
}


{
  "where": {
    "betId": "124053"
  }
}
```

## GetEvents

```
query GetFilteredEvents($eventNames: [String!]) {
  events(
    where: {
      name_in: $eventNames
    }
  ) {
    id
    contractAddress
    name
    blockNumber
    blockTimestamp
    txHash
    transactionIndex
    logIndex
    sortOrder
    betId
    conditionId
    gameId
    freebetId
    depositId
    gasPrice
    gasUsed
  }
}

{
  "eventNames": ["NewBet"]
}
``` 








query GetBets($where: Bet_filter!) {
  bets(where: $where, first: 1000, subgraphError: allow) {
    ...BetDetails
    __typename
  }
}

fragment BetDetails on Bet {
  id
  betId
  actor
  affiliate
  amount
  bettor
  core {
    address
    liquidityPool {
      address
      __typename
    }
    __typename
  }
  createdBlockNumber
  createdBlockTimestamp
  createdTxHash
  freebet {
    id
    __typename
  }
  approxSettledAt
  _games {
    id
    league {
      id
    }
    participants {
      id
      name
    }
    __typename
  }
  _conditions {
    id
    game {
      id
      title      
    }
    outcomes{
      selections {
        result
        odds
        outcome {
          result
          condition {
            id
            title
          }
        }
      }
    }
    __typename
  }
  _lostSubBetsCount
  _wonSubBetsCount
  _subBetsCount
  _oddsDecimals
  _tokenDecimals
  _updatedAt
  __typename
}



## NewBetsActivityFeed

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

Variables:

{
  "first": 10
}