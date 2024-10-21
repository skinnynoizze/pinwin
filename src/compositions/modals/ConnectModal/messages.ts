export default {
  connect: {
    en: 'Connect a wallet',
    es: 'Conectar una billetera',
  },
  agree: {
    en: 'By connecting a wallet, you agree to',
    es: 'Al conectar una billetera, aceptas',
  },
  privacyPolicy: {
    en: 'Azuro Protocol’s Privacy Policy',
    es: 'Política de privacidad de Azuro Protocol',
  },
  success: {
    en: 'Wallet has been successfully connected',
    es: 'La billetera se ha conectado con éxito',
  },
  waiting: {
    title: {
      en: 'Waiting for confirmation',
      es: 'Esperando confirmación',
    },
    text: {
      en: 'Open wallet extension or mobile app and confirm the connection.',
      es: 'Abra la extensión de la billetera o la aplicación móvil y confirme la conexión.',
    },
  },
  errors: {
    // 'UserRejectedRequestError': {
    '4001': {
      title: {
        en: 'Connection canceled',
        es: 'Conexión cancelada',
      },
      text: {
        en: 'You have canceled the connection. Click below to try again.',
        es: 'Has cancelado la conexión. Haz clic abajo para intentarlo de nuevo.',
      },
    },
    // in case of injected it may be when it's busy by other user operation
    // 'ResourceUnavailableRpcError': {
    '-32002': {
      title: {
        en: 'Connection failed',
        es: 'Fallo de conexión',
      },
      text: {
        en: 'Your wallet is already waiting for your action. Please complete or cancel it and try again.',
        es: 'Tu billetera ya está esperando tu acción. Por favor, completa o cancela y vuelve a intentarlo.',
      },
    },
    default: {
      title: {
        en: 'Connection failed',
        es: 'Fallo de conexión',
      },
      text: {
        en: 'There was an error, we are already working on it. Click below to try again.',
        es: 'Hubo un error, ya estamos trabajando en ello. Haz clic abajo para intentarlo de nuevo.',
      },
    },
  },
}
