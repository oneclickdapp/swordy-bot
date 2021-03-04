import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import NftForm from 'src/components/NftForm'

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
const UPDATE_NFT_MUTATION = gql`
  mutation UpdateNftMutation($id: String!, $input: UpdateNftInput!) {
    updateNft(id: $id, input: $input) {
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

export const Success = ({ nft }) => {
  const { addMessage } = useFlash()
  const [updateNft, { loading, error }] = useMutation(UPDATE_NFT_MUTATION, {
    onCompleted: () => {
      navigate(routes.nfts())
      addMessage('Nft updated.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input, id) => {
    updateNft({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Nft {nft.id}</h2>
      </header>
      <div className="rw-segment-main">
        <NftForm nft={nft} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
