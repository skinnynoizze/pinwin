'use client'

import React from 'react'
import { type State } from 'wagmi'
import { type ChainId } from '@azuro-org/toolkit'
import { type Address } from 'viem'
import { IntlProvider } from '@locmod/intl'
import { SvgProvider, SvgSprite } from 'svg-provider'
import { AzuroSDKProvider, LiveProvider } from '@azuro-org/sdk'
import { WagmiProvider } from 'wallet'
import { DeviceProvider, OddsViewProvider } from 'contexts'
import NewFreeBetsChecker from 'compositions/NewFreeBetsChecker/NewFreeBetsChecker'
import { LocaleProvider, useLocale } from '../../contexts/LocaleContext/LocaleContext'


type Props = {
  userAgent: string
  initialChainId: ChainId
  initialLiveState: boolean
  initialState?: State
}

const Providers: React.CFC<Props> = (props) => {
  const { children, userAgent, initialState, initialChainId, initialLiveState } = props

  return (
    <DeviceProvider userAgent={userAgent}>
      <SvgProvider>
        <LocaleProvider>
          <WagmiProvider initialState={initialState}>
            <InnerProviders initialChainId={initialChainId} initialLiveState={initialLiveState}>
              {children}
            </InnerProviders>
          </WagmiProvider>
        </LocaleProvider>
        <div className="sr-only">
          <SvgSprite />
        </div>
      </SvgProvider>
    </DeviceProvider>
  )
}

// Create a separate component to use the locale
const InnerProviders: React.FC<{ initialChainId: ChainId; initialLiveState: boolean; children: React.ReactNode }> = ({ initialChainId, initialLiveState, children }) => {
  const { locale } = useLocale() // Get the current locale from context

  return (
    <IntlProvider key={locale} locale={locale} onError={(error) => console.error(error)}>
      <AzuroSDKProvider initialChainId={initialChainId} affiliate={process.env.NEXT_PUBLIC_AFFILIATE_ADDRESS as Address} isBatchBetWithSameGameEnabled>
        <LiveProvider initialLiveState={initialLiveState}>
          <OddsViewProvider>
            {children}
          </OddsViewProvider>
        </LiveProvider>
        <NewFreeBetsChecker />
      </AzuroSDKProvider>
    </IntlProvider>
  )
}

export default Providers
