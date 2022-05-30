import 'twin.macro'

import tw from 'twin.macro'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import { isDesktop } from './shared/utils'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { UnsupportedNetworkWarning } from './components/UnsupportedNetworkWarning'
import { TradePage } from './pages/TradePage'

import { DashboardPage } from './pages/DashboardPage'
import { LeveragedStakingPage } from './pages/LeveragedStakingPage'
import { MarginTradingPage } from './pages/MarginTradingPage'
import { PositionPage } from './pages/PositionPage'
import { StakePage } from './pages/StakePage'

//import { useBlockNumberListener } from './shared/hooks/useBlockNumberListener'
//import { useEagerConnect } from './shared/hooks/useEagerConnect'
//import { useInitSetup } from './shared/hooks/useInitSetup'
//import { useNetworkListener } from './shared/hooks/useNetworkListener'
//import { useVerifyTransaction } from './shared/hooks/useVerifyTransactions'

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const infuraId = '460f40a260564ac4a4f4b3fffb032dad'

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  infuraProvider({ infuraId }),
  publicProvider(),
])

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'ithil',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

/** @jsxImportSource @emotion/react */

export const AppRouter = () => {
  //useEagerConnect()
  //useNetworkListener()
  //useBlockNumberListener()
  //useVerifyTransaction()
  //useInitSetup()

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <WagmiConfig client={client}>
      <UnsupportedNetworkWarning />
      <div css={[tw`flex flex-col bg-primary min-h-screen desktop:flex-row`]}>
        <div tw='flex-grow flex flex-col'>
          <Header />
          <div tw='flex-grow'>
            <Routes>
              <Route path='/trade' element={<TradePage />} />
              <Route
                path='/trade/margin-trading'
                element={<MarginTradingPage />}
              />
              <Route
                path='/trade/leveraged-staking'
                element={<LeveragedStakingPage />}
              />
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route
                path='/:strategy/position/:positionId'
                element={<PositionPage />}
              />
              <Route path='/stake' element={<StakePage />} />
              <Route path='*' element={<Navigate to='/trade' replace />} />
            </Routes>
          </div>
          {!isDesktop && <Footer />}
        </div>
      </div>
    </WagmiConfig>
  )
}
