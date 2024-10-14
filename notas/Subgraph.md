# The Azuro Subgraph
Azuro uses multiple subgraphs for indexing and organizing data from the Azuro smart contracts. These subgraphs are hosted on The Graph hosted service and can be used to query Azuro data.

## Public Endpoints
Polygon: https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-polygon-v3
LiveDataFeed: https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed

## GraphQL query descriptions

The most helpful entities for this hack’s tasks are Game, Condition, Sport, League, and Country.
- The Game entity provides details about game status, participants, and the associated betting conditions. It’s useful for organizing games into categories like live, upcoming, or resolved, and showing detailed game-level data (e.g., participants, turnover).
- Condition entity is helpful for building markets around individual game conditions and fetching the latest odds. You can use this entity to show bettors the markets available within a game.
- Country, League, Sport entities help in organizing betting markets and displaying relevant statistics by region, league, or sport. Great for creating custom market views, where users can explore betting opportunities by region or sport. You can also organize games by league or tournament.

### Sports, Leagues & Countries Entities.
#### SportHub Entity
Description:
Represents a hub for organizing sports in Azuro. It contains metadata about sports and is used to categorize games, countries, and leagues within the betting platform.

Usage:
This entity is key when organizing sports into hubs. Use this entity to categorize sports, making it easier to display related leagues, countries, and games.

Attributes:
Attribute	Type	                Description
id	        ID!	                    Unique identifier for the sport hub.
name	    String!	                Name of the sport hub.
slug	    String!	                URL-friendly slug for the sport hub.
sports	    [Sport!] @derivedFrom	List of sports associated with the sport hub.

#### Sport Entity
Description:
Represents a sport within the betting system. It is linked to a SportHub and is used to group related games, countries, and leagues for betting purposes.

Usage:
When building interfaces that organize games by sport, this entity is essential. It helps filter and categorize games by sport, making it ideal for applications that need to create dynamic menus or filters for sports categories.

Attributes:
Attribute	Type	                    Description
id	        ID!	                        Unique identifier for the sport.
sportId	    BigInt!	                    Numeric ID representing the sport.
name	    String!	                    Name of the sport.
slug	    String!	                    URL-friendly slug for the sport.
sporthub	SportHub!	                Reference to the associated sport hub.
countries	[Country!]! @derivedFrom	List of countries participating in this sport.
games	    [Game!]! @derivedFrom	    List of games related to this sport.

#### League entity
Description:
Represents a sports league in a specific country. It tracks the games within the league and provides data on active games and betting turnover.

Usage:
This entity is useful for organizing games into leagues. If you're building a system that tracks championship brackets or league standings, this is the entity to use for organizing games and displaying league-related information.

Attributes:
Attribute	            Type	                Description
id	                    ID!	                    Unique identifier for the league.
name	                String!	                Name of the league.
slug	                String!	                URL-friendly slug for the league.
country	                Country!	            Reference to the country the league belongs to.
games	                [Game!]! @derivedFrom	List of games associated with the league.
hasActiveGames	        Boolean!	            Indicates if there are active games in the league.
activeGamesEntityIds	[String!]	            List of IDs of active games.
turnover	            BigInt!	                Turnover value for the league based on betting activity.

#### Country entity
Description:
Represents a country in Azuro's ecosystem. It is linked to a sport and contains information about leagues, games, and the betting turnover within the country.

Usage:
Use this entity to group games and leagues by country, and display turnover data for each region. If you're building a market that allows users to explore games based on location, this entity is the one to use.

Attribute	            Type	                    Description
id	                    ID!	                        Unique identifier for the country.
name	                String!	                    Name of the country.
slug	                String!	                    URL-friendly slug for the country.
sport	                Sport!	                    Reference to the sport associated with the country.
leagues	                [League!]! @derivedFrom	    List of leagues in the country.
hasActiveLeagues	    Boolean!	                Indicates if the country has active leagues.
activeLeaguesEntityIds	[String!]	                List of active league IDs.
turnover	            BigInt!	                    Turnover value of the country based on betting activity. Useful for sorting

### Games & Conditions Entities
#### Game entity
Description:
Represents a sports game that users can bet on. It is linked to a league and sport and contains metadata such as status, participants, conditions, and turnover.

Usage:
This entity is essential when you want to build systems that focus on individual sports events. Use it for applications that allow users to view game status, participants, betting conditions, and start times.

Attributes:
Attribute	            Type	                        Description
id	                    ID!	                            Unique identifier for the game (LP contract address + game ID).
liquidityPool	        LiquidityPoolContract!	        Reference to the liquidity pool associated with the game.
gameId	                BigInt!	                        Numeric ID of the game.
title	                String	                        Title of the game.
slug	                String	                        URL-friendly slug for the game.
league	                League!	                        Reference to the league the game belongs to.
sport	                Sport!	                        Reference to the sport the game belongs to.
status	                GameStatus!	                    Status of the game (Created, Resolved, Canceled, or Paused).
participants	        [Participant!]! @derivedFrom	List of participants in the game.
conditions	            [Condition!]! @derivedFrom	    List of conditions related to the game.
hasActiveConditions	    Boolean!	                    Indicates if the game has active betting conditions.
startsAt	            BigInt!	                        Start time of the game (timestamp).
provider	            BigInt!	                        Betting provider associated with the game.
turnover	            BigInt!	                        Turnover value generated by the game.
createdBlockNumber	    BigInt!	                        Block number when the game was created.
createdBlockTimestamp	BigInt!	                        Timestamp of the block when the game was created.
createdTxHash	        String!	                        Transaction hash for the creation of the game.
shiftedBlockNumber	    BigInt	                        Block number of last game shift (if applicable).
shiftedBlockTimestamp	BigInt	                        Timestamp of the game last shift.
shiftedTxHash	        String	                        Transaction hash of last game shift.
resolvedBlockNumber	    BigInt	                        Block number when the game was resolved.
resolvedBlockTimestamp	BigInt	                        Timestamp for game resolution.
resolvedTxHash	        String	                        Transaction hash for game resolution.

#### Participant Entity
Description:
Represents a participant in a game (e.g., a team or player). It tracks participant metadata and is linked to a specific game.

Usage:
This entity is perfect for displaying or organizing game participants, such as teams or players. Use it when building features that need to display participant data in a betting market.

Attributes:
Attribute	Type	Description
id	        ID!	    Unique identifier for the participant (Game entity ID + participant sort order).
game	    Game!	Reference to the game the participant is associated with.
name	    String!	Name of the participant (e.g., a team or individual).
image	    String	Image URL or reference for the participant (optional).
sortOrder	Int!	Sorting order for the participant within the game.

#### Condition Entity
Description:
Represents a betting condition within a game. It defines the possible outcomes for a specific condition and tracks the status, turnover, and other attributes of the condition. List of condition statuses:
- Created: The condition has been created and is available for betting.
- Resolved: The condition has been resolved, and the outcomes have been determined.
- Canceled: The condition has been canceled, and any associated bets may be voided.
- Paused: The condition has been temporarily paused, likely due to game delays or other interruptions.

Usage:
If you need to display or manage betting conditions within a game (e.g., over/under, match-winner), this is the entity to use. It allows you to track the status and outcomes of specific betting conditions.

Attributes:
Attribute	              Type	                      Description
id	                    ID!	                        Unique identifier for the condition (Core contract address + Condition ID).
core	                  CoreContract!	              Reference to the core contract associated with this condition.
coreAddress	            String!	                    Address of the core contract.
conditionId	            BigInt!	                    Numeric identifier of the condition.
game	                  Game!	                      Reference to the game the condition is linked to.
outcomes	              [Outcome!]! @derivedFrom	  List of outcomes related to this condition.
outcomesIds	            [BigInt!]	                  List of outcome IDs associated with this condition.
wonOutcomes	            [Outcome!]	                List of outcomes that have been won.
wonOutcomeIds	          [BigInt!]	                  IDs of the won outcomes.
margin	                BigInt!	                    Margin value for the condition, used in calculating bets.
reinforcement	          BigInt!	                    Reinforcement value used to back the condition.
status	                ConditionStatus!	          Status of the condition (Created, Resolved, Canceled, Paused).
turnover	              BigInt!	                    Total turnover generated by the condition.
provider	              BigInt!	                    Provider associated with the condition.
createdBlockNumber	    BigInt!	                    Block number when the condition was created.
createdBlockTimestamp	  BigInt!	                    Timestamp of the block when the condition was created.
createdTxHash	          String!	                    Transaction hash for the creation of the condition.
resolvedBlockNumber	    BigInt	                    Block number when the condition was resolved (if applicable).
resolvedBlockTimestamp	BigInt	                    Timestamp of the block when the condition was resolved.
resolvedTxHash	        String	                    Transaction hash for the resolution of the condition.
internalStartsAt	      BigInt	                    Internal start time for the condition (timestamp).
isExpressForbidden	    Boolean!	                  Indicates if express betting is forbidden for this condition.
_winningOutcomesCount	  Int!	                      Count of expecting winning outcomes for the condition.


#### Outcome Entity
Description:
Represents an outcome for a specific condition within a game. It stores odds, bets, and the result of the outcome, and is key in determining payouts for users.

Usage:
Use this entity when you need to track or display odds and outcomes for betting conditions. It is useful for applications that allow users to track historical odds or manage updates of betting markets.

Attributes:
Attribute	    Type	                    Description
id	            ID!	                        Unique identifier for the outcome (Condition entity ID + Outcome ID).
core	        CoreContract!	            Reference to the core contract related to the outcome.
outcomeId	    BigInt!	                    Numeric identifier for the outcome.
condition	    Condition!	                Reference to the condition associated with the outcome.
fund	        BigInt!	                    Amount of funds backing this outcome.
rawCurrentOdds	BigInt!	                    Raw odds value for the outcome.
currentOdds	    BigDecimal!	                Formatted odds value for the outcome.
sortOrder	    Int!	                    Sorting order of the outcome in relation to other outcomes.
selections	    [Selection!]! @derivedFrom	List of selections associated with the outcome.

#### LiveCondition Entity
Description:
Represents a live betting condition for a game. It tracks real-time status, outcomes, and turnover, and is associated with a core contract and specific game.

Usage:
Allows you to track conditions in real-time.

Attributes:
Attribute	            Type	                        Description
id	                    ID!	                            Unique identifier for the live condition (Core contract address + Condition ID).
core	                CoreContract!	                Reference to the core contract associated with the condition.
coreAddress	            String!	                        Address of the core contract.
conditionId	            igInt!	                        Numeric identifier of the condition.
gameId	                BigInt!	                        Numeric identifier of the game associated with the condition.
outcomes	            [LiveOutcome!]! @derivedFrom	List of live outcomes related to this condition.
outcomesIds	            [BigInt!]	                    List of outcome IDs related to this condition.
wonOutcomes	            [LiveOutcome!]	                List of outcomes that have been won.
wonOutcomeIds	        [BigInt!]	                    List of IDs for won outcomes.
status	                ConditionStatus!	            Status of the condition (Created, Resolved, Canceled, or Paused).
turnover	            BigInt!	                        Total turnover generated by the condition.
createdBlockNumber	    BigInt!	                        Block number when the condition was created.
createdBlockTimestamp	BigInt!	                        Timestamp of the block when the condition was created.
createdTxHash	        String!	                        Transaction hash for the creation of the condition.
resolvedBlockNumber	    BigInt	                        Block number when the condition was resolved.
resolvedBlockTimestamp	BigInt	                        Timestamp of the block when the condition was resolved.
resolvedTxHash	        String	                        Transaction hash for the resolution of the condition.

#### LiveOutcome Entity
Description:
Represents a live outcome in a betting condition. It tracks bets, selections, and the real-time status of the outcome, allowing the system to calculate live odds and payouts.

Usage:
Use this entity to track real-time outcomes within a live betting condition and update users on current outcomes and odds shifts during live games.

Attributes:

Attribute	    Type	                        Description
id	            ID!	                            Unique identifier for the live outcome (Condition entity ID + Outcome ID).
core	        oreContract!	                Reference to the core contract associated with the outcome.
outcomeId	    BigInt!	                        Numeric identifier for the outcome.
condition	    LiveCondition!	                Reference to the condition associated with the outcome.
sortOrder	    Int!	                        Sorting order for the outcome relative to other outcomes.
_betsEntityIds	[String!]	                    List of bet entity IDs associated with this outcome.
selections	    [LiveSelection!]! @derivedFrom	List of selections related to this outcome.
_updatedAt	    BigInt!	                        Timestamp for the last update to the live outcome.

### Bets (pre-match, live, freebets) & Events
#### Bet Entity
Description:
Represents a user bet in Azuro. It stores details about the bet, such as conditions, odds, amount, and results, and is linked to the core contract for settlement.

Usage:
Use this entity to track and manage individual bets placed by users. It can be used to display betting histories, manage user-specific bets, or track bet results and payouts in your interface.

Attributes:
Attribute	Type	Description
id	ID!	Unique identifier for the bet (Core contract address + Bet ID).
core	CoreContract!	Reference to the core contract associated with the bet.
type	BetType!	Type of bet: either Ordinar (single bet) or Express (multiple bets).
betId	BigInt!	Numeric identifier for the bet.
bettor	String!	Address of the person who placed the bet.
owner	String!	Address of the owner of the bet.
actor	String!	Address of the actor (the account that executed the bet).
affiliate	String	Affiliate linked to the bet.
rawAmount	BigInt!	Raw amount staked in the bet.
amount	BigDecimal!	Formatted value of the amount staked.
rawPotentialPayout	BigInt!	Raw value of the potential payout.
potentialPayout	BigDecimal!	Formatted value of the potential payout.
rawPayout	BigInt	Raw value of the actual payout.
payout	BigDecimal	Formatted value of the actual payout.
rawOdds	BigInt!	Raw odds of the bet.
odds	BigDecimal!	Formatted odds of the bet.
rawSettledOdds	BigInt	Raw odds after settlement of the bet.
settledOdds	BigDecimal	Formatted odds after settlement.
approxSettledAt	BigInt!	Approximate time when the bet is expected to be settled.
selections	[Selection!]! @derivedFrom	List of selections tied to this bet.
createdBlockNumber	BigInt!	Block number when the bet was created.
createdBlockTimestamp	BigInt!	Timestamp of the block when the bet was created.
createdTxHash	String!	Transaction hash of the bet creation.
resolvedBlockNumber	BigInt	Block number when the bet was resolved (if applicable).
resolvedBlockTimestamp	BigInt	Timestamp of the block when the bet was resolved.
resolvedTxHash	String	Transaction hash for the resolution of the bet.
status	BetStatus!	Status of the bet: Accepted, Canceled, or Resolved.
result	BetResult	Result of the bet: Won or Lost.
isRedeemable	Boolean!	Indicates if the bet is redeemable.
isRedeemed	Boolean!	Indicates if the bet has been redeemed.
redeemedBlockNumber	BigInt	Block number when the bet was redeemed.
redeemedBlockTimestamp	BigInt	Timestamp of the block when the bet was redeemed.
redeemedTxHash	String	Transaction hash for the redemption of the bet.
freebet	Freebet	Reference to the freebet details (if applicable).

#### LiveBet Entity
Description:
Represents a live bet placed by a user. It stores real-time betting data such as odds, payout potential, and results, and is linked to live conditions and selections.

Usage:
This entity is useful for managing and displaying live bet details, such as odds changes or potential payouts for ongoing games.

Attributes:
Attribute	Type	Description
id	ID!	Unique identifier for the live bet (Core contract address + Bet ID).
core	CoreContract!	Reference to the core contract associated with the bet.
betId	BigInt!	Numeric identifier for the bet.
bettor	String!	Address of the bettor who placed the live bet.
owner	String!	Address of the owner of the live bet.
actor	String!	Address of the actor (the account that executed the live bet).
affiliate	String	Affiliate information associated with the live bet.
rawAmount	BigInt!	Raw amount staked in the live bet.
amount	BigDecimal!	Formatted value of the amount staked.
rawPotentialPayout	BigInt!	Raw value of the potential payout.
potentialPayout	BigDecimal!	Formatted value of the potential payout.
rawPayout	BigInt	Raw value of the actual payout.
payout	BigDecimal	Formatted value of the actual payout.
rawPayoutLimit	BigInt!	Raw value of the payout limit for the bet.
payoutLimit	BigDecimal!	Formatted payout limit.
rawOdds	BigInt!	Raw odds of the live bet.
odds	BigDecimal!	Formatted odds of the live bet.
rawSettledOdds	BigInt	Raw odds after settlement.
settledOdds	BigDecimal	Formatted odds after settlement.
selections	[LiveSelection!]! @derivedFrom	List of selections tied to this live bet.
createdBlockNumber	BigInt!	Block number when the live bet was created.
createdBlockTimestamp	BigInt!	Timestamp when the live bet was created.
createdTxHash	String!	Transaction hash for the creation of the live bet.
resolvedBlockNumber	BigInt	Block number when the live bet was resolved.
resolvedBlockTimestamp	BigInt	Timestamp for the resolution of the live bet.
resolvedTxHash	String!	Transaction hash for the resolution of the live bet.
status	BetStatus!	Status of the live bet (Accepted, Canceled, or Resolved).
result	BetResult	Result of the live bet (Won or Lost).
isRedeemable	Boolean!	Indicates if the live bet is redeemable.
isRedeemed	Boolean!	Indicates if the live bet has been redeemed.
redeemedBlockNumber	BigInt	Block number when the bet was redeemed.
redeemedBlockTimestamp	BigInt	Timestamp when the bet was redeemed.
redeemedTxHash	String!	Transaction hash for the redemption of the bet.

#### Selection Entity.
Description:
Represents an individual selection in a bet. It is linked to a specific outcome and tracks the odds, result, and other metadata for the selection.

Usage:
This entity helps when you need to track specific selections within a bet, such as individual outcomes within a parlay. Use it to display detailed bet information to users.

Attributes:
Attribute	Type	Description
id	ID!	Unique identifier for the selection.
bet	Bet!	Reference to the associated bet.
rawOdds	BigInt!	Raw odds for the selection.
odds	BigDecimal!	Formatted odds for the selection.
result	SelectionResult	Result of the selection: Won or Lost.
outcome	Outcome!	Reference to the outcome related to the selection.

#### LiveSelection Entity
Description:
Represents a selection within a live bet. It is linked to a live outcome and stores odds, results, and other metadata relevant to live betting.

Usage:
Allows you to display real-time data for specific user selections.

Attributes:
Attribute	Type	Description
id	ID!	Unique identifier for the live selection.
bet	LiveBet!	Reference to the live bet associated with this selection.
rawOdds	BigInt!	Raw odds for the live selection.
odds	BigDecimal!	Formatted odds for the live selection.
result	SelectionResult	Result of the selection (Won or Lost).
outcome	LiveOutcome!	Reference to the live outcome associated with the selection.

#### Bettor data
Description:
Filter bettors by your affiliate address to examine user behavior, betting patterns, and engagement levels. It's a powerful tool to understand the impact of your platform on bettor activity.

Usage:
``
query Bettors {
  bettors(
    where: {
      affiliate: "0x...a6"
    }
  ) {
    _updatedAt
    address
    affiliate
    avgBetAmount
    . . .
  }
}
``

Attributes:
Bettor entity ID = LP Contract address + affiliate address + bettor address

Attribute	Type	Description	Category
id	ID!	Unique identifier for the bettor entity.	ID
address	String!	Bettor's blockchain address.	
affiliate	String!	Frontend or affiliate address.	
betsCount	Int!	Total number of bets (including cancelled and resolved).	Bets Analytics
settledBetsCount	Int!	Number of resolved bets.	
wonBetsCount	Int!	Number of bets won.	
lostBetsCount	Int!	Number of bets lost.	
canceledBetsCount	Int!	Number of bets cancelled.	
redeemedBetsCount	Int!	Number of bets where winnings have been claimed.	
rawTurnover	BigInt!	Total wagered amount in raw format.	Financial Metrics
turnover	BigDecimal!	Total wagered amount in decimal format.	
rawInBets	BigInt!	Locked bet amount in raw format.	
inBets	BigDecimal!	Locked bet amount in decimal format.	
rawToPayout	BigInt!	Amount pending payout in raw format.	
toPayout	BigDecimal!	Amount pending payout in decimal format.	
rawTotalPayout	BigInt!	Total payouts for cancelled/won bets in raw format.	
totalPayout	BigDecimal!	Total payouts for cancelled/won bets in decimal format.	
rawBiggestBetAmount	BigInt!	Largest bet amount in raw format.	Largest Bet and Payout
biggestBetAmount	BigDecimal!	Largest bet amount in decimal format.	
rawBiggestPayout	BigInt!	Largest payout in raw format.	
biggestPayout	BigDecimal!	Largest payout in decimal format.	
rawAvgBetAmount	BigInt!	Average bet amount in raw format.	Averages and Profitability
avgBetAmount	BigDecimal!	Average bet amount in decimal format.	
rawTotalProfit	BigInt!	Gross Gaming Revenue (GGR) in raw format.	
totalProfit	BigDecimal!	GGR in decimal format.	
pnl	BigDecimal!	Profit and Loss (PNL) percentage.	
_updatedAt	BigInt!	Timestamp of the last update to the entity's data.	Metadata


#### Event & FreeBet Entity
Description:
Represents a specific event within the Azuro system, such as new games, bets, or liquidity actions. It stores transaction details, timestamps, and references to related entities like bets and conditions.

List of event names:

NewGame: A new game has been created.
GameShifted: The game’s start time or conditions have been altered.
BettorWin: A bettor has won their bet.
ConditionCreated: A new betting condition has been created.
ConditionResolved: A betting condition has been resolved.
ConditionShifted: The condition has been changed, such as an odds adjustment.
ConditionStopped: A condition has been halted or paused.
NewBet: A new bet has been placed.
NewLiveBet: A new live bet has been placed.
BetSettled: A bet has been settled.
FreeBetMinted: A freebet has been created and issued.
FreeBetReissued: A freebet has been reissued.
FreeBetRedeemed: A freebet has been redeemed.
FreeBetBettorWin: A freebet has resulted in a win.
FreeBetTransfer: A freebet has been transferred.
LiquidityAdded: Liquidity has been added to a liquidity pool.
LiquidityRemoved: Liquidity has been removed from a liquidity pool.
LiquidityTransfer: Liquidity has been transferred between pools or users.
AzuroBetTransfer: An Azuro bet has been transferred.
MarginChanged: The margin on a bet or condition has been altered.
ReinforcementChanged: The reinforcement (backing amount) for a condition has been adjusted.

Usage:
This entity is essential for tracking specific events like new game creations, bets being placed, or conditions being resolved. Use it to build real-time updates or historical event logs in your interface.

Attributes:
Attribute	Type	Description
id	ID!	Unique identifier for the event.
contractAddress	String!	Address of the contract where the event was generated.
name	EventName!	Name of the event (e.g., NewGame, BetSettled, LiquidityAdded, etc.).
blockNumber	BigInt!	Block number where the event occurred.
blockTimestamp	BigInt!	Timestamp of the block when the event occurred.
txHash	String!	Transaction hash associated with the event.
transactionIndex	BigInt!	Transaction index within the block.
logIndex	BigInt!	Log index for the event.
sortOrder	BigInt!	Sort order for the event.
betId	String	ID of the bet related to the event (if applicable).
conditionId	String	ID of the condition related to the event (if applicable).
gameId	String	ID of the game related to the event (if applicable).
freebetId	String	ID of the freebet related to the event (if applicable).
depositId	String	ID of the deposit related to the event (if applicable).
gasPrice	BigInt!	Gas price for the transaction where the event occurred.
gasUsed	BigInt	Amount of gas used during the event.

### Smart Contract Entity
#### LiquidityPoolContract Entity
Description:
Represents the main contract that manages liquidity pools in Azuro. It handles the funds for bets, calculates TVL (Total Value Locked), and is responsible for storing information about the liquidity state.

Usage:
This entity is helpful if you want to manage or display information about the total funds in a liquidity pool, track the number of bets placed, or calculate the current TVL. It's ideal for building dashboards that display liquidity metrics and pool performance over time.

Attributes:
Attribute	Type	Description
id	ID!	Unique identifier for the liquidity pool.
chainId	Int!	Blockchain identifier where the pool resides.
address	String!	On-chain address of the liquidity pool contract.
cores	[CoreContract!]!	References to associated core contracts.
coreAddresses	[String!]	List of core contract addresses.
type	LiquidityPoolContractType!	Type of the liquidity pool, either V1 or V2.
token	String!	Token used in the pool, such as USDT.
tokenDecimals	Int!	Decimal precision of the token.
asset	String!	Asset type, indicating the type of liquidity.
betsAmount	BigInt!	Total value of bets placed.
betsCount	BigInt!	Total number of bets.
wonBetsAmount	BigInt!	Value of bets that won.
wonBetsCount	BigInt!	Number of bets that won.
firstCalculatedBlockNumber	BigInt!	Blockchain block number when calculations started.
lastCalculatedBlockNumber	BigInt!	Block number for the latest calculations.
daysSinceDeployment	BigInt!	Total days since the pool was deployed.
depositedAmount	BigInt!	Total value deposited in the pool.
withdrawnAmount	BigInt!	Total value withdrawn from the pool.
rawTvl	BigInt!	Raw calculation of the TVL (Total Value Locked).
tvl	BigDecimal!	Formatted TVL value for display.
nfts	[LiquidityPoolNft!]!	References to NFTs that represent user positions in the pool.
liquidityManager	String	Address of the pool's liquidity manager.
depositedWithStakingAmount	BigInt!	Amount deposited with staking incentives.
withdrawnWithStakingAmount	BigInt!	Amount withdrawn from staked positions.

#### CoreContract Entity
Description:
Represents a core contract in Azuro, linked to a specific liquidity pool. It manages the logic related to betting and outcomes and is a key component in the betting ecosystem.

Usage:
This entity is essential when working with the core logic of betting systems. If you're developing features that involve interacting with the underlying smart contracts that handle bet placement and settlement, use this to access relevant contract data linked to the liquidity pool.

Attributes:

Attribute	Type	Description
id	ID!	Unique identifier for the core contract.
liquidityPool	LiquidityPoolContract!	Reference to the associated liquidity pool.
address	String!	On-chain address of the core contract.
type	String!	Type of core contract, indicating its function in the protocol.

#### AzuroBetContract Entity
Description:
Represents a contract related to an Azuro betting market. This contract facilitates user bets and interacts with the core contract that handles betting logic.

Usage:
This entity helps manage bets linked to specific Azuro contracts. It can be used when building applications to track and display individual bet contracts and their statuses.

Attributes:
Attribute	Type	Description
id	ID!	Unique identifier for the freebet contract.
liquidityPool	LiquidityPoolContract!	Reference to the associated liquidity pool.
address	String!	On-chain address of the freebet contract.
name	String	Name of the freebet contract.
affiliate	String	Affiliate information linked to the freebet contract.
manager	String	Address of the freebet contract manager.

#### ExpressPrematchRelation Entity
Description:
Stores the relationship between combo bets and prematch contracts. It links express core contract addresses to the respective prematch contracts.

Usage:
Use this entity when you need to create or manage connections between combo bets and prematch contracts. It's useful for developers building applications that allow users to switch between express and prematch betting modes.

Attributes:
Attribute	Type	Description
id	ID!	Express core contract address.
prematchAddress	String!	Address of the prematch contract related to the express bet.

#### FreebetContract Entity
Description:
Created by Azuro ad hoc for the active frontends/affiliates. It manages the details of freebets, including any affiliate programs, and allows end users to place freebets within the system.

Attributes:
Attribute	Type	Description
id	ID!	Unique identifier for the freebet contract.
liquidityPool	LiquidityPoolContract!	Reference to the associated liquidity pool.
address	String!	On-chain address of the freebet contract.
name	String	Name of the freebet contract.
affiliate	String	Affiliate information linked to the freebet contract.
manager	String	Address of the freebet contract manager.

## Request Optimizations
The subgraph collects historical data, and the lookup time for queries increases with more data. To optimize query execution time, consider using simple queries, pagination and direct filters based on timestamps and/or IDs. If your query is complex, it's beneficial to break it down into simpler queries.

### Create simple queries
Avoid creating complex queries. Instead, split entities like game and conditions. First, request games, then retrieve conditions with a filter based on the game ID list. The conditions entity is the heaviest, so by separating them, you can create a progressive UI:

1. Display a full skeleton while loading game info.
2. Show game info and a skeleton instead of markets.
3. Fully render all data once conditions are loaded.

``
// FASTER:
// split requests to game list base info (sport, league, participants, etc),
// then fetch markets for each game
const GameList = () => {
  const { data, loading } = useQuery(GAMES_QUERY)
 
  if (loading) {
    return <Skeleton />
  }
 
  return (
    <div className="space-y-2">
      {
        data?.games?.map((game) => (
          <GameCard key={game.id} data={game} />
        ))
      }
    </>
  )
}
 
const GameCard = ({ data }) => {
  const { id } = data
  const { data: conditions, loading } = useQuery(CONDITIONS_QUERY, {
    variables: {
      where: {
        game: id,
      },
    },
  })
 
  return (
    <div>
      <GameInfo data={data} />
      {
        loading ? (
          <MarketsSkeleton />
        ) : (
          <Markets data={conditions} />
        )
      }
    </div>
  )
}
``

### Filter Data by Timestamps
The subgraph stores all historical data, and for many requests, there's no need to go through it entirely. This significantly speeds up queries.

For example, when requesting upcoming games for pre-match markets, filter them by the start date, ensuring it's greater than the current time:

const nowInSeconds = Math.floor(Date.now() / 1000)
 
const where: Game_filter = {
  startsAt_gt: nowInSeconds,
}

### Use Direct Filters
If you need to filter data, aim for direct filters. The use of nested filters (ending with an underscore, like game_ in Condition_filter) can slow down requests.

For instance, suppose you want to retrieve conditions for specific games, using the gameId (valid across all chains) as part of the URL. In this case, you can easily convert gameId to the TheGraph ID of the game using the formula <lp_address_lowercase>_<gameId>. Read about IDs in Highlights section

const gameId = '12345'
 
// SLOWER
const where: Condition_filter = {
  game_: {
    gameId,
  },
}
 
// FASTER
const where: Condition_filter = {
  game: `${LP_ADDRESS_LOWERCASE}_${gameId}`,
}

## Highlights
### Limits
TheGraph has a limit of returning a maximum of 1000 elements per request, with a default of 100 elements. Keep this limit in mind when building your queries. Read how to paginate. (https://thegraph.com/docs/en/querying/graphql-api/#pagination)

### Indexing errors
In rare cases indexing errors of new data may occur in subgraph nodes. In that case queries will throw an error with no data by default. We're reacting fast on such accidents. But while it isn't fixed, you can add param subgraphError: allow to your queries to ignore these errors and work with existing data.

### Addresses
When working with TheGraph, all address values are stored in lowercase. This means that when passing variables to queries, it's important to convert the transmitted value to lowercase, or use the _contains_nocase postfix.

### IDs
When working with TheGraph, efficiency matters. The secret sauce lies in their unique id: ID! (TheGraph IDs) for @entity directives in schemas. These IDs, when used in queries, speed up request execution time.

To maintain clarity and distinction from TheGraph IDs, Azuro assigns specific prefixes to its entity IDs, such as sportId for sports and gameId for games. To construct a unique TheGraph ID, Azuro merges various entity parameters, ensuring each ID is one of a kind.

Want to use, for example, Game or Condition TheGraph IDs in your code? It's as easy as this:

const gameEntityID = `${liquidityPoolAddress.toLowerCase()}_${gameId}`
const conditionEntityID = `${coreAddress.toLowerCase()}_${conditionId}`

Check out the full list of TheGraph ID getters (https://github.com/Azuro-protocol/Azuro-subgraphs/blob/main/api/src/utils/schema.ts)
Remember, when using these getters, ensure that addresses are converted to lowercase.

### Entity Duplications
There can be several LP contracts within a single blockchain network. There are several reasons for this, such as managing different currency pools or addressing risk management concerns.

Each LP contract can contain multiple Core contracts, with each Core contract differing in terms of the logic used for different casino games or pre-match/live betting. For example, the logic for pre-match/live betting may differ from that used for other casino games.

The presence of multiple identical contracts in the Azuro Protocol can lead to entities with the same Azuro IDs (e.g. gameId, conditionId). This is because entities created on different contracts may share the same ID, which can make it difficult to distinguish between them.

For example, different LPs may have the same games with the same gameId, while conditions created on Core contracts may have the same conditionId.

When interacting with entities in the Azuro Protocol, it's important to use the coreAddress and lpAddress properties to identify the specific contract to which the entity belongs.

For example, when querying for games, you should include the lpAddress as a filter to ensure that you are only retrieving games from the correct LP contract. Similarly, when placing bets, you should include the coreAddress to ensure that the bet is being placed on the correct Core contract.

By using these additional properties to identify the specific contract and entity, you can help prevent issues related to duplicate IDs and ensure that your application is able to function as intended.