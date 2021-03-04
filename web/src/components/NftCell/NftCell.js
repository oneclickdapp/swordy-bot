import Nft from 'src/components/Nft'

export const QUERY = gql`
  query FIND_NFT_BY_ID($id: String!) {
    nft: nft(id: $id) {
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

export const Empty = () => <div>Nft not found</div>

export const Success = ({ nft }) => {
  return <Nft nft={nft} />
}
