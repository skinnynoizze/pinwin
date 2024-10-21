import { BetStatus } from '@azuro-org/toolkit'


export default {
  [BetStatus.Accepted]: {
    en: 'Accepted',
    es: 'Aceptado',
  },
  [BetStatus.Canceled]: {
    en: 'Declined',
    es: 'Declinado',
  },
  [BetStatus.Live]: {
    en: 'Live',
    es: 'En vivo',
  },
  [BetStatus.PendingResolution]: {
    en: 'Pending resolution',
    es: 'Pendiente de resolución',
  },
  [BetStatus.Resolved]: {
    en: 'Resolved',
    es: 'Resuelto',
  },
  win: {
    en: 'Won',
    es: 'Ganado',
  },
  lose: {
    en: 'Lost',
    es: 'Perdido',
  },
}
