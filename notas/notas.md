# Azuro Protocol Notes

## Subgraph Queries

Subgraph documentation: https://gem.azuro.org/subgraph/overview

### Production 3.0 Endpoints

- Polygon: https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-polygon-v3
- LiveDataFeed: https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed

## Useful Queries

### Get Recent Games

GraphQL Query:

```graphql
query GetRecentGames {
  games(first: 10, orderBy: startsAt, orderDirection: desc) {
    id
    startsAt
    participants {
      name
    }
    sport {
      name
    }
  }
}
```

### Get Condition Data for a Specific Game

GraphQL Query (as used in Bookmaker.xyz in Production page):

```graphql
query Conditions($conditionFilter: Condition_filter) {
  conditions(where: $conditionFilter, first: 1000, subgraphError: allow) {
    ...GameCondition
    __typename
  }
}

fragment GameCondition on Condition {
  id
  conditionId
  status
  title
  outcomes {
    id
    outcomeId
    title
    __typename
  }
  core {
    address
    type
    __typename
  }
  game {
    id
    __typename
  }
  wonOutcomeIds
  isExpressForbidden
  __typename
}
```

Query Variables:

```json
{
  "conditionFilter": {
    "game_": {
      "gameId": "1001000000001598084241"
    }
  }
}
```

### Get Recent Finished Games

This query will return the 10 most recent resolved games, ordered by their start time in descending order.

If you need to filter by a specific sport or time range, you can use a query like this:

````graphql
query GetRecentResolvedFootballGames($startTime: BigInt!) {
  games(
    first: 10, 
    orderBy: startsAt, 
    orderDirection: desc, 
    where: { 
      status: Resolved, 
      sport_: { name: "Football" },
      startsAt_gt: $startTime 
    }
  ) {
    id
    startsAt
    participants {
      name
    }
    sport {
      name
    }
    status
  }
}
````

Query Variables:

````json
{
  "startTime": "1727740800" // Unix timestamp for October 1, 2024 12:00:00 AM GMT
}
````

This query filters for resolved Football games that started after a specific time. Adjust the sport name and startTime as needed for your use case.