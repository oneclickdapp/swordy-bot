import fetch from 'node-fetch'
import { Contract } from '@ethersproject/contracts'
import CONTRACTS from './contracts'
import { JsonRpcProvider } from '@ethersproject/providers'

export const fetchChievNfts = async (userAddress) => {
  let nfts = []
  const contractAddress = CONTRACTS.chiev.network.xdai.address
  const chainId = CONTRACTS.chiev.network.xdai.chainId
  const chievContract = new Contract(
    contractAddress,
    CONTRACTS.chiev.abi,
    new JsonRpcProvider('https://rpc.xdaichain.com')
    // new JsonRpcProvider(process.env.XDAI_RPC_URL)
  )

  const balanceOf = await chievContract.balanceOfByGen0(userAddress, 3)
  if (balanceOf > 0) {
    console.log(
      `User has Chiev 1UP! Network: xDAI, Token ID: 3, balanceOfByGen0: ${balanceOf}`
    )
    nfts.push({
      website: '',
      contractAddress,
      tokenId: 3,
      uri: '',
      chainId,
      iconUrl: '',
    })
  }
  return nfts
}
