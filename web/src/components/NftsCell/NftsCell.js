import { Link, routes } from '@redwoodjs/router'

import Nfts from 'src/components/Nfts'

export const QUERY = gql`
  query NFTS {
    nfts {
      id
      website
      contractAddress
      tokenId
      uri
      iconUrl
      ownerAddress
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No nfts yet. '}
      <Link to={routes.newNft()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ nfts }) => {
  return <Nfts nfts={nfts} />
}
