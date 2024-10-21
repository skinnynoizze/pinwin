import { BetslipDisableReason } from '@azuro-org/sdk'


export default {
  empty: {
    title: {
      en: 'Betslip is empty',
      es: 'La apuesta está vacía',
    },
    text: {
      en: 'To add a bet to your betslip, choose a market and make your selection',
      es: 'Para agregar una apuesta a tu apuesta, selecciona un mercado y haz tu selección',
    },
  },
  settings: {
    en: 'Settings',
    es: 'Configuraciones',
  },
  single: {
    en: 'Single bet',
    es: 'Apuesta simple',
  },
  batch: {
    en: 'Single bets ({count})',
    es: 'Apuestas simples ({count})',
  },
  combo: {
    en: 'Combo ({count})',
    es: 'Combo ({count})',
  },
  betAmount: {
    en: 'Bet amount',
    es: 'Cantidad de apuesta',
  },
  totalBet: {
    en: 'Total bet',
    es: 'Apuesta total',
  },
  warnings: {
    [BetslipDisableReason.ComboWithForbiddenItem]: {
      en: 'One or more conditions can\'t be used in combo',
      es: 'Una o más condiciones no pueden ser usadas en combo',
    },
    [BetslipDisableReason.BetAmountGreaterThanMaxBet]: {
      en: 'The maximum allowable bet amount is capped at {maxBet} {symbol}.',
      es: 'El monto máximo permitido de apuesta está limitado a {maxBet} {symbol}.',
    },
    [BetslipDisableReason.BetAmountLowerThanMinBet]: {
      en: 'The minimum allowable bet amount is capped at {minBet} {symbol}.',
      es: 'El monto mínimo permitido de apuesta está limitado a {minBet} {symbol}.',
    },
    [BetslipDisableReason.ComboWithLive]: {
      en: 'Live outcome can\'t be used in combo',
      es: 'El resultado en vivo no puede ser usado en combo',
    },
    [BetslipDisableReason.ConditionStatus]: {
      en: 'One or more outcomes have been removed or suspended. Review your betslip and remove them.',
      es: 'Uno o más resultados han sido eliminados o suspendidos. Revisa tu apuesta y elimínalos.',
    },
    [BetslipDisableReason.PrematchConditionInStartedGame]: {
      en: 'Game has started',
      es: 'El juego ha empezado',
    },
    [BetslipDisableReason.ComboWithSameGame]: {
      en: 'Combo with outcomes from same game prohibited, please use Batch bet',
      es: 'Combo con resultados del mismo juego prohibido, por favor usa apuesta por lote',
    },
    [BetslipDisableReason.BatchWithLive]: {
      en: 'Live outcome can\'t be used in batch',
      es: 'El resultado en vivo no puede ser usado en lote',
    },
    [BetslipDisableReason.FreeBetWithLive]: {
      en: 'FreeBet can\'t be used for live',
      es: 'FreeBet no puede ser usada para en vivo',
    },
    [BetslipDisableReason.FreeBetWithCombo]: {
      en: 'FreeBet can\'t be used for combo',
      es: 'FreeBet no puede ser usada para combo',
    },
    [BetslipDisableReason.FreeBetWithBatch]: {
      en: 'FreeBet can\'t be used for batch',
      es: 'FreeBet no puede ser usada para lote',
    },
    [BetslipDisableReason.FreeBetExpired]: {
      en: 'FreeBet is expired',
      es: 'FreeBet ha expirado',
    },
    [BetslipDisableReason.FreeBetMinOdds]: {
      en: 'Odds\'s too low for FreeBet',
      es: 'Las cuotas son demasiado bajas para FreeBet',
    },
  },
}
