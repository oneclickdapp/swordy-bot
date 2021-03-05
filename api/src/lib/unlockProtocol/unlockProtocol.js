import fetch from 'node-fetch'
import { Contract } from '@ethersproject/contracts'
import CONTRACTS from './contracts'
import { JsonRpcProvider, InfuraProvider } from '@ethersproject/providers'

const URL_COLLAB_LAND_AUTH =
  'https://api-qa.collab.land/client-applications/login-as-user?ttl=500'

const getProviderByNetworkName = (networkName) => {
  if (networkName === 'xdai')
    return new JsonRpcProvider(process.env.XDAI_RPC_URL)
  return new InfuraProvider(networkName, process.env.INFURA_ENDPOINT_KEY)
}

export const fetchUnlockProtocolNfts = async (userAddress) => {
  let nfts = []
  await Promise.all(
    Object.keys(CONTRACTS.lock.network).map(async (networkName) => {
      const contractAddress = CONTRACTS.lock.network[networkName].address
      const lockContract = new Contract(
        contractAddress,
        CONTRACTS.lock.abi,
        getProviderByNetworkName(networkName)
      )

      const hasValidKey = await lockContract.getHasValidKey(userAddress)
      if (hasValidKey) {
        const tokenId = await lockContract.getTokenIdFor(userAddress)
        console.log(`Valid NFT found! Network: ${networkName}, Token ID: ${tokenId.toNumber()}`);
        nfts.push({
          website: '',
          contractAddress,
          tokenId: tokenId.toNumber(),
          uri: '',
          chainId: CONTRACTS.lock.network[networkName].chainId,
          iconUrl: '',
        })
      }
    })
  )
  return nfts
}
