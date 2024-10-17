import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import { userAgent } from 'next/server'
import { cookieToInitialState } from 'wagmi'
import { type ChainId } from '@azuro-org/toolkit'
import { config } from 'wallet'
import { polygon } from 'viem/chains'
import { constants } from 'helpers'

import Providers from 'compositions/Providers/Providers'
import PageLayout from 'compositions/PageLayout/PageLayout'
import SnowBackground from 'compositions/SnowBackground/SnowBackground'

import '../scss/globals.scss'


dayjs.extend(utc)
dayjs.extend(duration)

const inter = Inter({ subsets: [ 'latin' ] })

export const metadata: Metadata = {
  metadataBase: new URL(constants.baseUrl),
  title: 'PinWin: The coolest betting platform for sports, politics, e-sports and more.',
  description: 'PinWin.xyz is the coolest betting platform for sports, politics, e-sports and more. We offer the best odds, live updates, and exclusive promotions.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersList = headers()
  const cookieStore = cookies()

  const initialState = cookieToInitialState(config, headers().get('cookie'))
  const userAgentValue = userAgent({ headers: headersList })
  const _initialChainId = cookieStore.get('appChainId')?.value
  const initialLiveState = JSON.parse(cookieStore.get('live')?.value || 'false')

  const initialChainId = _initialChainId &&
                  (config.chains.find(chain => chain.id === +_initialChainId)?.id as ChainId) || polygon.id

  return (
    <html lang="en">
      <body className={inter.className}>
        <SnowBackground>
          <Providers
            initialState={initialState}
            userAgent={userAgentValue.ua}
            initialLiveState={initialLiveState}
            initialChainId={initialChainId}
          >
            <PageLayout>
              {children}
            </PageLayout>
          </Providers>
        </SnowBackground>
      </body>
    </html>
  )
}
