import { JsonRpcProvider, InfuraProvider } from '@ethersproject/providers'

export const getProviderByChainId = (chainId) => {
  if (chainId === '100') return new JsonRpcProvider(process.env.XDAI_RPC_URL)
  return new InfuraProvider(Number(chainId), process.env.INFURA_ENDPOINT_KEY)
}
