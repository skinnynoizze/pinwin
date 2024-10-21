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
        <LocaleProvider> {/* Wrap with LocaleProvider */}
          <InnerProviders initialState={initialState} initialChainId={initialChainId} initialLiveState={initialLiveState}>
            {children}
          </InnerProviders>
        </LocaleProvider>
        <div className="sr-only">
          <SvgSprite />
        </div>
      </SvgProvider>
    </DeviceProvider>
  )
}

// Create a separate component to use the locale
const InnerProviders: React.FC<{ initialState?: State; initialChainId: ChainId; initialLiveState: boolean; children: React.ReactNode }> = ({ initialState, initialChainId, initialLiveState, children }) => {
  const { locale } = useLocale() // Get the current locale from context

  return (
    <IntlProvider key={locale} locale={locale} onError={(error) => console.error(error)}> {/* Use the locale from context */}
      <WagmiProvider initialState={initialState}>
        <AzuroSDKProvider initialChainId={initialChainId} affiliate={process.env.NEXT_PUBLIC_AFFILIATE_ADDRESS as Address} isBatchBetWithSameGameEnabled>
          <LiveProvider initialLiveState={initialLiveState}>
            <OddsViewProvider>
              {children}
            </OddsViewProvider>
          </LiveProvider>
          <NewFreeBetsChecker />
        </AzuroSDKProvider>
      </WagmiProvider>
    </IntlProvider>
  )
}

export default Providers
