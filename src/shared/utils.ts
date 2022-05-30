import { format } from 'date-fns'
import { BigNumberish, utils } from 'ethers'

import { ReactComponent as MetaMaskIcon } from '../assets/images/metamask.svg'
import { ReactComponent as WalletConnectIcon } from '../assets/images/walletconnect.svg'
import { ReactComponent as CoinbaseIcon } from '../assets/images/coinbase.svg'

interface IFormatDateOptions {
  dateFormat?: string
  uppercase?: boolean
}

export const formatDate = (date: Date, options?: IFormatDateOptions): any => {
  const { dateFormat = 'yyyy-MM-dd', uppercase = false } = options || {}
  const startDate = format(date, dateFormat)

  return uppercase ? startDate.toUpperCase() : startDate
}

export const getConnectorIcon = (
  connectorName: string,
): React.FunctionComponent => {
  if (connectorName === 'Coinbase Wallet') return CoinbaseIcon
  else if (connectorName === 'WalletConnect') return WalletConnectIcon
  else return MetaMaskIcon
}

export const getTransactionLabel = (t: any) => {
  return ''
}

export const formatEth = (value: BigNumberish, format: string | undefined) =>
  utils.formatUnits(value, format)

export const parseUnits = (value: string) => utils.parseUnits(value.toString())

export const TABLET_BREAKPOINT = 480
export const DESKTOP_BREAKPOINT = 1024
export const isDesktop = window.screen.width >= DESKTOP_BREAKPOINT
export const isTablet = window.screen.width >= TABLET_BREAKPOINT
export const isMobile = !isDesktop && !isTablet
