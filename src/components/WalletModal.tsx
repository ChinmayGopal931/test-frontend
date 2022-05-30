import 'twin.macro'
import tw from 'twin.macro'
import { useConnect } from 'wagmi'
import { Txt } from './partials/Txt'
import { CenteredModal } from './CenteredModal'
import { getConnectorIcon } from '../shared/utils'

interface IWalletModal {
  modalIsOpen: boolean
  connectors: any[]
  connect: any
  onClose(): void
}
/** @jsxImportSource @emotion/react */

export const WalletModal = (props: IWalletModal) => {
  return (
    <CenteredModal
      tw='bg-secondary'
      isOpen={props.modalIsOpen}
      onChange={props.onClose}
    >
      <div tw='flex flex-col justify-center items-center'>
        <Txt.Heading2 tw='self-end'>Connect to a wallet</Txt.Heading2>
      </div>
      <Txt.Body2Regular tw='w-96 self-start my-3'>
        {/* TODO ADD LINKS */}
        By connecting a wallet, I agree to Ithil&apos;s{' '}
        <a tw='cursor-pointer'>Terms of Use</a>,{' '}
        <a tw='cursor-pointer'>Cookies Policy</a>
        and <a tw='cursor-pointer'>Privacy Policy</a>.
      </Txt.Body2Regular>
      <div tw='w-full height[1px] bg-primary-300 my-4'></div>
      <div tw='w-full height[384px]'>
        {props.connectors.map((connector) => {
          // @ts-ignore
          const metamaskMissing =
            !window.ethereum && connector.name === 'MetaMask'
          const Icon = getConnectorIcon(connector.name)

          return (
            <button
              key={connector.id}
              tw='w-full flex flex-row justify-between cursor-pointer'
              onClick={() => props.connect(connector)}
              disabled={!connector.ready}
            >
              <div tw='flex flex-row justify-start items-center p-0 my-2 gap-2'>
                <Icon tw='h-9 w-9 m-2' />
                <div tw='flex flex-col justify-start'>
                  <Txt.Body2Bold
                    css={[
                      // @ts-ignore
                      metamaskMissing && tw`text-font-200 text-secondary`,
                    ]}
                  >
                    {connector.name}
                    {metamaskMissing && '(Not installed)'}
                  </Txt.Body2Bold>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </CenteredModal>
  )
}
