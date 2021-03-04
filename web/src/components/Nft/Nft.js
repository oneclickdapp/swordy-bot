import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/NftsCell'

const DELETE_NFT_MUTATION = gql`
  mutation DeleteNftMutation($id: String!) {
    deleteNft(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Nft = ({ nft }) => {
  const { addMessage } = useFlash()
  const [deleteNft] = useMutation(DELETE_NFT_MUTATION, {
    onCompleted: () => {
      navigate(routes.nfts())
      addMessage('Nft deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete nft ' + id + '?')) {
      deleteNft({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Nft {nft.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{nft.id}</td>
            </tr>
            <tr>
              <th>Website</th>
              <td>{nft.website}</td>
            </tr>
            <tr>
              <th>Contract address</th>
              <td>{nft.contractAddress}</td>
            </tr>
            <tr>
              <th>Token id</th>
              <td>{nft.tokenId}</td>
            </tr>
            <tr>
              <th>Uri</th>
              <td>{nft.uri}</td>
            </tr>
            <tr>
              <th>Icon url</th>
              <td>{nft.iconUrl}</td>
            </tr>
            <tr>
              <th>Owner address</th>
              <td>{nft.ownerAddress}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editNft({ id: nft.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(nft.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Nft
