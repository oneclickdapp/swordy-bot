import { parseUnits, formatUnits } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import toast from 'react-hot-toast'

import CONTRACTS from './contracts'

import { getErrorResponse } from './general'
import { unlockBrowser } from './connect'

export const mint = async ({ id }) => {
  try {
    toast('Connecting to your wallet...')
    const { walletProvider, walletAddress, network } = await unlockBrowser({
      debug: true,
    })
    if (network?.chainId !== 100) throw Error('Please switch to xDAI network')
    const niftyChess = new Contract(
      CONTRACTS.niftyChess.xdai,
      CONTRACTS.niftyChess.abi,
      walletProvider.getSigner()
    )

    if (
      walletAddress.toLowerCase() ===
      '0xe4b420F15d6d878dCD0Df7120Ac0fc1509ee9Cab'.toLowerCase()
    ) {
      const tx = await niftyChess.minterMint(
        '0xe4b420F15d6d878dCD0Df7120Ac0fc1509ee9Cab',
        'https://NiftyChess.com/games/' + id + ".json",
        id
      )
      return { tx }
    }

    const price = await walletProvider.getStorageAt(
      CONTRACTS.niftyChess.xdai,
      16
    )
    const xdaiBalance = await walletProvider.getBalance(walletAddress)
    if (xdaiBalance.lt(price))
      throw Error(
        `Insufficient funds. ${formatUnits(price, 18)} xDAI is needed`
      )
    const overrides = {
      gasLimit: 350000,
      value: price,
    }
    const tx = await niftyChess.mintBoard(walletAddress, 'https://NiftyChess.com/games/' + id + ".json", id, overrides)
    return { tx }
  } catch (err) {
    console.log(err)
    console.log(err?.data?.message)
    return {
      ...getErrorResponse(err, 'mint'),
    }
  }
}
