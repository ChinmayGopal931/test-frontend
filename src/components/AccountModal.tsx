/** @jsxImportSource @emotion/react */
import 'twin.macro'
import { useState, useEffect } from 'react'
import { ArrowSquareOut, Check, Copy } from 'phosphor-react'
import ClipLoader from 'react-spinners/ClipLoader'
import { useNetwork, useDisconnect, etherscanBlockExplorers } from 'wagmi'

import { Txt } from './partials/Txt'
import { showInfoNotification } from './partials/Notification'
import { Wallet } from './partials/Wallet'
import { CenteredModal } from './CenteredModal'

import { getTransactionLabel, getConnectorIcon } from '../shared/utils'

interface IAccountModal {
  modalIsOpen: boolean
  connector: any
  account: any
  chain: any
  onClose(): void
}
/** @jsxImportSource @emotion/react */

export const AccountModal = (props: IAccountModal) => {
  const { disconnect } = useDisconnect()
  const [transactions, setTrans] = useState([]) // TODO get transactions
  const Icon = getConnectorIcon(props.connector.name)
  const [blockExplorer, setBlockExplorer] = useState<any>('')

  const copyToClipboard = () => {
    if (props.account?.address) {
      navigator.clipboard.writeText(props.account.address)
      showInfoNotification('Copied to clipboard')
    }
  }

  useEffect(() => {
    if (props.chain) {
      if (props.chain.id === 4)
        setBlockExplorer(etherscanBlockExplorers.rinkeby)
      else if (props.chain.id === 5)
        setBlockExplorer(etherscanBlockExplorers.goerli)
      else setBlockExplorer(etherscanBlockExplorers.mainnet)
    }
  }, [props.chain])

  return (
    <CenteredModal
      tw='bg-secondary min-width[450]'
      isOpen={props.modalIsOpen}
      onChange={props.onClose}
    >
      <div tw='w-full h-full flex flex-col'>
        <Txt.Heading2 tw='text-center mb-6'>Account</Txt.Heading2>
        <div tw='flex flex-row items-center justify-between mb-4'>
          <Txt.Body2Regular tw='flex-grow text-font-100'>
            Connected with {props.connector.name ?? 'unrecognised'}
          </Txt.Body2Regular>
          <div tw='flex flex-row justify-end'>
            <button
              tw='rounded-md py-1 px-2 border border-primary-400 text-font-100'
              onClick={() => {
                disconnect()
                props.onClose()
              }}
            >
              <Txt.CaptionMedium tw='text-secondary'>
                Disconnect
              </Txt.CaptionMedium>
            </button>
          </div>
        </div>

        <div tw='flex flex-row items-center mb-3'>
          {Icon && <Icon tw='h-6 w-6 mr-2' />}
          <Txt.Body1Bold tw='text-secondary'>
            {props.account && props.account.address && (
              <Wallet address={props.account.address} />
            )}
          </Txt.Body1Bold>
        </div>

        <div tw='flex flex-row items-center justify-center mb-6'>
          <div
            tw='flex items-center cursor-pointer mr-5'
            onClick={() => copyToClipboard()}
          >
            <Copy size={22} tw='text-font-200 mr-2' />
            <Txt.Body2Regular tw='flex-grow text-font-100'>
              Copy address
            </Txt.Body2Regular>
          </div>
          <div
            tw='flex items-center cursor-pointer'
            onClick={() => {
              window.open(
                `${blockExplorer.url}/address/${props.account?.address}`,
                '_blank',
              )
            }}
          >
            <ArrowSquareOut size={22} tw='text-font-200 mr-2' />
            <Txt.Body2Regular tw='flex-grow text-font-100'>
              View on explorer
            </Txt.Body2Regular>
          </div>
        </div>

        <div tw='w-full height[1px] bg-font-200' />
        <Txt.Heading2 tw='mt-6 text-center'>Transactions</Txt.Heading2>
        {transactions.length === 0 ? (
          <Txt.Body2Regular tw='mt-6 mb-5 flex-grow text-font-200 text-center'>
            Your transactions will appear here.
          </Txt.Body2Regular>
        ) : (
          <div></div>
        )}

        {transactions.map((t: any) => {
          return (
            <div key={t.tx} tw='flex flex-row justify-between'>
              <div tw='flex flex-col justify-between'>
                <a
                  tw='mb-1'
                  rel='noreferrer'
                  href={`${blockExplorer.url}/tx/${t.tx}`}
                  target='_blank'
                  title={`View transaction on ${blockExplorer.name}`}
                >
                  <Txt.Body2Bold tw='text-secondary underline'>
                    View Tx
                  </Txt.Body2Bold>
                </a>
                <Txt.Body2Regular tw='text-font-200'>
                  {getTransactionLabel(t)}
                </Txt.Body2Regular>
              </div>
              {t.status === 'pending' ? (
                <div tw='flex flex-col justify-between items-center self-center'>
                  <ClipLoader loading color={'blue'} size={18} tw='mb-1.5' />
                  <Txt.CaptionMedium tw='text-font-200'>
                    Pending
                  </Txt.CaptionMedium>
                </div>
              ) : (
                <div tw='flex flex-col items-center self-center'>
                  <div tw='flex items-center justify-center h-5 w-5 rounded-3xl bg-success'>
                    <Check tw='text-primary w-3 h-3' />
                  </div>
                  <Txt.CaptionMedium tw='text-success'>
                    Finished
                  </Txt.CaptionMedium>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </CenteredModal>
  )
}
