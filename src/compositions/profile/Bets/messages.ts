import { BetType } from '@azuro-org/sdk'


export default {
  single: {
    en: 'Single',
    es: 'Simple',
  },
  combo: {
    en: 'Combo',
    es: 'Combo',
  },
  live: {
    en: 'LIVE BET',
    es: 'APUESTA EN VIVO',
  },
  unique: {
    en: 'Unique Events',
    es: 'Eventos Únicos',
  },
  market: {
    en: 'Market',
    es: 'Mercado',
  },
  outcome: {
    en: 'Outcome',
    es: 'Resultado',
  },
  odds: {
    en: 'Odds',
    es: 'Cuotas',
  },
  betAmount: {
    en: 'Bet amount:',
    es: 'Monto de la apuesta:',
  },
  possibleWin: {
    en: 'Possible win:',
    es: 'Posible ganancia:',
  },
  freebet: {
    en: 'Freebet',
    es: 'Freebet',
  },
  winning: {
    en: 'Winning:',
    es: 'Ganando:',
  },
  loss: {
    en: 'Loss:',
    es: 'Pérdida:',
  },
  redeem: {
    en: 'Redeem',
    es: 'Redimir',
  },
  refund: {
    en: 'Refund',
    es: 'Reembolso',
  },
  gameStatus: {
    declined: {
      en: 'Declined',
      es: 'Declinada',
    },
    win: {
      en: 'Won',
      es: 'Ganada',
    },
    lose: {
      en: 'Lost',
      es: 'Perdida',
    },
    live: {
      en: 'Live\’',
      es: 'En vivo\’',
    },
  },
  empty: {
    title: {
      en: 'No bets to be displayed',
      es: 'No hay apuestas para mostrar',
    },
    text: {
      en: 'You have not placed any bets yet. Place your first bet and it will appear here.',
      es: 'Aún no has realizado ninguna apuesta. Realiza tu primera apuesta y aparecerá aquí.',
    },
  },
  tabs: {
    all: {
      en: 'All',
      es: 'Todas',
    },
    [BetType.Unredeemed]: {
      en: 'Unredeemed',
      es: 'No Redimidas',
    },
    [BetType.Accepted]: {
      en: 'Accepted',
      es: 'Aceptadas',
    },
    [BetType.Settled]: {
      en: 'Settled',
      es: 'Liquidadas',
    },
  },
}
