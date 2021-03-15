import { Link, routes } from '@redwoodjs/router'
import Markdown from 'react-markdown'
import markdownFile from './text.md'

// {" "}<a className="underline text-gray-600"rticle className="prose prose-lg">
// <Markdown children={markdown} />
// </article>

const Detail = ({ title, text }) => (
  <>
    <h3 className="text-1xl text-gray-800 font-bold leading-none mb-3">
      {title}
    </h3>
    <p className="mb-3" className="mb-5">
      {text}
    </p>
  </>
)

const AboutPage = () => {
  return (
    <>
      <div className="pt-6">
        <h1 className="text-3xl text-gray-800 font-bold leading-none mb-6">
          About Nifty Chess
        </h1>
        <h2
          className="text-xl font-bold text-gray-800 mb-3"
          id="what-is-nifty-chess"
        >
          What is Nifty Chess
        </h2>
        <p className="mb-3">
          Nifty Chess is an app that lets you save, collect, trade, and marvel
          at unique games of chess by saving them as ownable NFTs. Each token
          represents a completely unique game, no two can represent the same
          sequence of moves, and its other attributes are a reflection of those
          particular moves.
        </p>
        <h2
          className="text-xl font-bold text-gray-800 mb-3"
          id="what-are-nfts-"
        >
          What are NFTs?
        </h2>
        <p className="mb-3">
          Non-fungible tokens (NFTs) are unique, digital items with
          blockchain-managed ownership. Check out the{' '}
          <a
            className="underline text-gray-600"
            href="https://opensea.io/blog/guides/non-fungible-tokens/"
          >
            NFT Bible
          </a>{' '}
          for a very deep dive on them.
        </p>
        <h2
          className="text-xl font-bold text-gray-800 mb-3"
          id="how-do-i-mint-a-new-token-on-nifty-chess-"
        >
          How do I mint a new token on Nifty Chess?
        </h2>
        <p className="mb-3">
          To mint a new game you&#39;ll just need to paste a link to a lichess
          game at{' '}
          <a
            className="underline text-gray-600"
            href="https://niftychess.com/games/new"
          >
            https://niftychess.com/games/new
          </a>
          , and sign a transaction with your Ethereum wallet on the xDAI
          network. Then a unique token will instantly be minted for you, which
          only you own.
        </p>
        <p className="mb-3">
          To mint a new NFT on Nifty Chess you will need an Ethereum wallet
          connected to the xDAI chain, and some xDAI tokens.
        </p>
        <h2
        class="text-xl font-bold text-gray-800 mb-3"
        id="what-is-a-wallet-and-where-do-i-get-one-">
          What is a Wallet and where do I get one?
        </h2>
        <p className="mb-3">
          A wallet is an access point to a blockchain. In the case of Nifty
          Chess, we like the Ethereum blockchain so you will need a wallet that
          works with that. We suggest the browser extension and mobile app{' '}
          <a className="underline text-gray-600" href="https://metamask.io/">
            MetaMask
          </a>
          ,{' '}
          <a
            className="underline text-gray-600"
            href="https://youtu.be/6Gf_kRE4MJU?t=6"
          >
            here&#39;s a great video
          </a>{' '}
          on it.
        </p>
        <h3 className="text-xl font-bold text-gray-800 mb-3" id="what-is-xdai-and-where-do-i-get-some-">
          What is xDAI and where do I get some?
        </h3>
        <p className="mb-3">
          xDAI-Chain is a blockchain built on a layer above Ethereum (Layer 2,
          or L2), which we use to make our app fast and cheap to use. The native
          currency of the xDAI chain is xDAI, which is pegged to $1, so no need
          to worry about volatility. There are several ways to get xDAI to use
          in apps. You can ask a friend who has some, get a tiny amount (enough
          for many simple transactions) from{' '}
          <a
            className="underline text-gray-600"
            href="https://www.xdaichain.com/for-users/get-xdai-tokens"
          >
            the free faucet
          </a>
          , get some on a centralized exchange, or convert DAI from mainnet
          Ethereum using the{' '}
          <a
            className="underline text-gray-600"
            href="https://bridge.xdaichain.com/"
          >
            Bridge
          </a>
          . To learn more about xDAI and other ways to get some check out{' '}
          <a
            className="underline text-gray-600"
            href="https://www.xdaichain.com/for-users/get-xdai-tokens"
          >
            this guide
          </a>
          .
        </p>
        <h3
        className="text-xl font-bold text-gray-800 mb-3"
        id="how-do-i-connect-my-ethereum-wallet-to-the-xdai-network-">
          How do I connect my Ethereum wallet to the xDAI network?
        </h3>
        <p className="mb-3">
          You&#39;ll need to copy and paste these items into your wallet&#39;s
          &quot;Custom RPC&quot; settings. A full guide can be found{' '}
          <a
            className="underline text-gray-600"
            href="https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup"
          >
            here
          </a>
          .
        </p>
        <p className="mb-3">
          <strong>Network Name</strong>: xDai <br/>
          <strong>New RPC URL</strong>:{' '}
          <a
            className="underline text-gray-600"
            href="https://rpc.xdaichain.com/"
          >
            https://rpc.xdaichain.com/
          </a><br/>
          <strong>Chain ID</strong>: 0x64 (100)<br/>
          <strong>Symbol</strong>: xDai <br/>
          <strong>Block Explorer URL</strong>:{' '}
          <a
            className="underline text-gray-600"
            href="https://blockscout.com/xdai/mainnet"
          >
            https://blockscout.com/xdai/mainnet
          </a><br/>
        </p>
        <h2
          className="text-xl font-bold text-gray-800 mb-3"
          id="how-do-i-see-my-tokens-"
        >
          How do I see my tokens?
        </h2>
        <p className="mb-3">
          You can add our token smart contract address to your list of tokens in
          your wallet. The address is
          <code>0xAe7ca55Ce4511C848ac4F9C0F26abD9ecaaee2c6</code>.
        </p>
        <p className="mb-3">
          Any individual token can be found by going to
          <i>https://niftychess.com/games/[game]</i> 
          For example: {' '}
          <a
            className="underline text-gray-600"
            href="https://niftychess.com/games/0x2d6109db2f31512f16ecc0caae6706b56027f713ee6fbc9e06cf4170419d3411"
          >
            https://niftychess.com/games/0x2d6109db2f31512f16ecc0caae6706b56027f713ee6fbc9e06cf4170419d3411
          </a>
        </p>
        <p className="mb-3">
          User profiles are coming soon. OpenSea integration is also under
          development.
        </p>
        <h2
          className="text-xl font-bold text-gray-800 mb-3"
          id="how-do-i-transfer-my-nifty-chess-token-to-someone-else-"
        >
          How do I transfer my Nifty Chess token to someone else?
        </h2>
        <p className="mb-3">
          Transfers are built into our ERC-721 standard contracts. page on our
          site for doing this coming soon.
        </p>
        <h2
          className="text-xl font-bold text-gray-800 mb-3"
          id="how-do-i-redeem-my-nifty-chess-token-on-xdai-for-one-on-mainnet-ethereum-"
        >
          How do I redeem my Nifty Chess token on xDAI for one on Mainnet
          Ethereum?
        </h2>
        <p className="mb-3">
          Our mainnet bridge is built and we are currently working on deploying
          it in the best possible way to reduce fees for our users. Coming soon,
          ETA March 2021.
        </p>
        <h2
          className="text-xl font-bold text-gray-800 mb-3"
          id="is-the-contract-deployed-on-any-test-networks-"
        >
          Is the contract deployed on any test networks?
        </h2>
        <p className="mb-3">Not currently.</p>
        <h2
          className="text-xl font-bold text-gray-800 mb-3"
          id="where-can-i-keep-up-with-development-"
        >
          Where can I keep up with development?
        </h2>
        <p className="mb-3">
          Discord or a forum coming soon, please follow us on twitter:{' '}
          <a
            className="underline text-gray-600"
            href="https://twitter.com/NiftyChess"
          >
            https://twitter.com/NiftyChess
          </a>
        </p>
        <h2
          className="text-xl font-bold text-gray-800 mb-3"
          id="how-are-gifs-created-and-stored-"
        >
          How are gifs created and stored?
        </h2>
        <p className="mb-3">
          Gifs are NOT stored on any centralized server. They are generated on
          the spot based on the moves played in the game which each token
          represents.
        </p>
        <h2
          className="text-xl font-bold text-gray-800 mb-3"
          id="is-there-an-official-opensea-collection-"
        >
          Is there an official OpenSea collection?
        </h2>
        <p className="mb-3">
          Our OpenSea integration is currently under development. ETA March
          2021.
        </p>
        <h2
          className="text-xl font-bold text-gray-800 mb-3"
          id="how-did-nifty-chess-come-to-be-"
        >
          How did Nifty Chess come to be?
        </h2>
        <p className="mb-3">
          Nifty Chess was created by Patrick Gallagher and Joseph Schiarizzi,
          and first presented to the world in February, 2021.
        </p>
        <p className="mb-3">
          At the buildathon, EthDenver 2020, a solidity developer named Joseph
          Schiarizzi brought a chess set. Having found it a great way to meet
          and interact with people at the conference, he aimed to one day build
          an app on Ethereum that involved chess. A year later at EthDenver 2021
          Joseph teamed up with dApp developer extraordinaire Patrick Gallagher
          to create Nifty Chess, with the goals of creating something that was
          easy to use, could potentially onboard many new people to Ethereum,
          and most importantly was fun to use. Nifty Chess won second place at
          the buildathon and we have been building and growing it since.
        </p>
        <h2
          className="text-xl font-bold text-gray-800 mb-3"
          id="what-other-features-are-coming-soon-"
        >
          What other features are coming soon?
        </h2>
        <p className="mb-3">In the works:</p>
        <ul className="list-disc">
          <li>User profiles</li>
          <li>Easier to use xDAI to Mainnet Ethereum bridge</li>
          <li>Collections of certain openings or games by certain players</li>
          <li>Partnerships with top chess streamers and players</li>
          <li>Nifty Chess sponsored tournaments</li>
          <li>NFT airdrops for our early contributors and users</li>
          <li>Gif hosting on IPFS</li>
        </ul>
        <br/>
        <p className="mb-3">
          Got another suggestion or need some more help? Ask us on{' '}
          <a
            className="underline text-gray-600"
            href="https://twitter.com/NiftyChess"
          >
            Twitter
          </a>
          .
        </p>
      </div>
    </>
  )
}

export default AboutPage
