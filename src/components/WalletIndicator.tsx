/** @jsxImportSource @emotion/react */
import 'twin.macro'
import { Txt } from './partials/Txt'
import { Wallet } from './partials/Wallet'
import { getConnectorIcon } from '../shared/utils'

interface IWalletIndicator {
  connector: any
  account: any
}
/** @jsxImportSource @emotion/react */

export const WalletIndicator = (props: IWalletIndicator) => {
  const ProviderIcon = getConnectorIcon(props.connector)

  return (
    <div tw='bg-primary-200 border-0 rounded-md cursor-pointer flex flex-row items-center h-9 max-h-9 tablet:h-10 desktop:h-11 desktop:max-h-11 px-2 hover:bg-hover-light dark:hover:bg-hover-dark'>
      <div tw='h-7 max-h-7 tablet:h-8   desktop:h-8 desktop:max-h-8 px-2 rounded-md bg-primary-400 flex flex-row justify-center items-center gap-1 dark:bg-primary-100'>
        {ProviderIcon && <ProviderIcon tw='h-4 w-4' />}
        <Txt.ButtonMedium tw='line-height[0px]'>
          {props.account && <Wallet address={props.account.address} />}
        </Txt.ButtonMedium>
      </div>
    </div>
  )
}
