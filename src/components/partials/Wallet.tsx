import { useEnsName } from 'wagmi'

export const Wallet = (address: any) => {
  const addr = address.address // TODO fix it

  const { data, error, isLoading, refetch } = useEnsName({
    address: addr,
    enabled: true,
  })

  if (data !== null) return isLoading ? 'Loading...' : data

  return addr.substring(0, 5).concat('...').concat(addr.substring(38, 42))
}
