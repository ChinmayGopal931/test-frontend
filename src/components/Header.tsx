import 'twin.macro'
import { useState } from 'react'
import { CaretDown } from 'phosphor-react'
import { useAccount, useConnect, useNetwork } from 'wagmi'

import { isDesktop, isTablet } from '../shared/utils'
import { Button } from './partials/Button'
import { Menu } from './Menu'
import { NavigationMenu } from './NavigationMenu'
import { AccountModal } from './AccountModal'
import { WalletIndicator } from './WalletIndicator'
import { ThemeSwitch } from './ThemeSwitch'
import { WalletModal } from './WalletModal'
import { useTheme } from '../state/theme/hooks'

import { ReactComponent as CurrEth } from '../assets/images/currencyEthereum.svg'
import { ReactComponent as LogoFullDark } from '../assets/images/logoFullDark.svg'
import { ReactComponent as LogoFullLight } from '../assets/images/logoFullLight.svg'
import { ReactComponent as LogoSymbolDark } from '../assets/images/logoSymbolDark.svg'
import { ReactComponent as LogoSymbolLight } from '../assets/images/logoSymbolLight.svg'

/** @jsxImportSource @emotion/react */

export const Header = () => {
  const theme = false //useTheme()
  const { data, isError, isLoading } = useAccount()
  const { activeChain } = useNetwork()
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect()
  const [isOpenWallet, setIsOpenWallet] = useState(false)
  const [isOpenAccount, setIsOpenAccount] = useState(false)
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  return (
    <div tw='w-full px-5 desktop:w-[calc(100% - 9rem)] my-6 tablet:mx-auto flex flex-row items-center justify-between'>
      <span tw='flex flex-row items-center'>
        {theme ? (
          isDesktop ? (
            <LogoFullDark />
          ) : (
            <LogoSymbolDark />
          )
        ) : isDesktop ? (
          <LogoFullLight />
        ) : (
          <LogoSymbolLight />
        )}
        {isDesktop && (
          <span tw='ml-24 flex flex-row items-center'>
            <NavigationMenu />
            <ThemeSwitch />
          </span>
        )}
      </span>
      <span tw='flex flex-row items-center gap-2'>
        <Button
          text={isTablet ? 'Ethereum' : ''}
          leftIcon={CurrEth}
          rightIcon={CaretDown}
        />

        {data && data?.address !== null && data?.connector !== null ? (
          <div onClick={() => setIsOpenAccount(true)}>
            <WalletIndicator
              connector={data.connector}
              account={data}
              tw='cursor-pointer'
            />
          </div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          <Button text='Connect' action onClick={() => setIsOpenWallet(true)} />
        )}
        <WalletModal
          modalIsOpen={isOpenWallet}
          onClose={() => setIsOpenWallet(false)}
          connectors={connectors}
          connect={connect}
        />
        <AccountModal
          modalIsOpen={isOpenAccount}
          onClose={() => setIsOpenAccount(false)}
          connector={connectors[0]}
          account={data}
          chain={activeChain}
        />
        <Menu
          menuIsOpen={menuIsOpen}
          onMenuChange={(state) => setMenuIsOpen(state)}
        />
      </span>
    </div>
  )
}
