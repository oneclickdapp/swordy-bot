import { JsonRpcProvider, InfuraProvider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { Bignumber } from '@ethersproject/units'

import erc721Abi from './erc721Abi'

const getProviderByChainId = (chainId) => {
  if (chainId === '100') return new JsonRpcProvider(process.env.XDAI_RPC_URL)
  return new InfuraProvider(networkName, process.env.INFURA_ENDPOINT_KEY)
}

export const checkWorthiness = async ({ token, balance, userAddress }) => {
  const { contractAddress, chainId, tokenId, type } = token
  let userBalance
  const rpcProvider = getProviderByChainId(chainId)
  if (type === 'erc20')
    userBalance = await getErc20Balance({
      contractAddress,
      rpcProvider,
      userAddress,
    })
  if (type === 'erc721')
    userBalance = await getErc721Balance({
      contractAddress,
      rpcProvider,
      tokenId,
      userAddress,
    })
  return true
  // TODO: uncomment
  // return userBalance.gte(Bignumber.from(balance))
}

const getErc721Balance = async ({
  contractAddress,
  rpcProvider,
  userAddress,
  tokenId,
}) => {
  const contract = new Contract(contractAddress, erc721Abi, rpcProvider)
  const balance = await contract.balanceOf(userAddress, tokenId)
}

const getErc20Balance = async ({
  contractAddress,
  rpcProvider,
  userAddress,
}) => {
  const contract = new Contract(contractAddress, erc20Abi, rpcProvider)
  return await contract.balanceOf(userAddress)
}
