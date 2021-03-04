import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import NftForm from 'src/components/NftForm'

import { QUERY } from 'src/components/NftsCell'

const CREATE_NFT_MUTATION = gql`
  mutation CreateNftMutation($input: CreateNftInput!) {
    createNft(input: $input) {
      id
    }
  }
`

const NewNft = () => {
  const { addMessage } = useFlash()
  const [createNft, { loading, error }] = useMutation(CREATE_NFT_MUTATION, {
    onCompleted: () => {
      navigate(routes.nfts())
      addMessage('Nft created.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input) => {
    createNft({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Nft</h2>
      </header>
      <div className="rw-segment-main">
        <NftForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewNft
