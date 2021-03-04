import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/NftsCell'

const DELETE_NFT_MUTATION = gql`
  mutation DeleteNftMutation($id: String!) {
    deleteNft(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const NftsList = ({ nfts }) => {
  const { addMessage } = useFlash()
  const [deleteNft] = useMutation(DELETE_NFT_MUTATION, {
    onCompleted: () => {
      addMessage('Nft deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete nft ' + id + '?')) {
      deleteNft({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Website</th>
            <th>Contract address</th>
            <th>Token id</th>
            <th>Uri</th>
            <th>Icon url</th>
            <th>Owner address</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {nfts.map((nft) => (
            <tr key={nft.id}>
              <td>{truncate(nft.id)}</td>
              <td>{truncate(nft.website)}</td>
              <td>{truncate(nft.contractAddress)}</td>
              <td>{truncate(nft.tokenId)}</td>
              <td>{truncate(nft.uri)}</td>
              <td>{truncate(nft.iconUrl)}</td>
              <td>{truncate(nft.ownerAddress)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.nft({ id: nft.id })}
                    title={'Show nft ' + nft.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editNft({ id: nft.id })}
                    title={'Edit nft ' + nft.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete nft ' + nft.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(nft.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NftsList
