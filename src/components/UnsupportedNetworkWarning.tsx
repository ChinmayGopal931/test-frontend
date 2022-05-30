import 'twin.macro'
/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { Warning } from 'phosphor-react'
import { useNetwork } from 'wagmi'
import { Txt } from './partials/Txt'
import { allowedChainIds, allowedChainName } from '../shared/const'

export const UnsupportedNetworkWarning = () => {
  const { activeChain } = useNetwork()

  return (
    <>
      {activeChain && allowedChainIds.includes(activeChain.id!) && (
        <div tw='h-16 w-full flex bg-error justify-center items-center space-x-2.5'>
          <Warning tw='text-white-100 h-5 w-5' />

          <Txt.CaptionMedium tw='text-white-100'>
            Unsupported network, please change your network to{' '}
            {allowedChainName}
          </Txt.CaptionMedium>
        </div>
      )}
    </>
  )
}
