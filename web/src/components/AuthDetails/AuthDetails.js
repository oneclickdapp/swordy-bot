import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/AuthDetailsCell'

const DELETE_AUTH_DETAIL_MUTATION = gql`
  mutation DeleteAuthDetailMutation($id: String!) {
    deleteAuthDetail(id: $id) {
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

const AuthDetailsList = ({ authDetails }) => {
  const { addMessage } = useFlash()
  const [deleteAuthDetail] = useMutation(DELETE_AUTH_DETAIL_MUTATION, {
    onCompleted: () => {
      addMessage('AuthDetail deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete authDetail ' + id + '?')) {
      deleteAuthDetail({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nonce</th>
            <th>Timestamp</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {authDetails.map((authDetail) => (
            <tr key={authDetail.id}>
              <td>{truncate(authDetail.id)}</td>
              <td>{truncate(authDetail.nonce)}</td>
              <td>{timeTag(authDetail.timestamp)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.authDetail({ id: authDetail.id })}
                    title={'Show authDetail ' + authDetail.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAuthDetail({ id: authDetail.id })}
                    title={'Edit authDetail ' + authDetail.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete authDetail ' + authDetail.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(authDetail.id)}
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

export default AuthDetailsList
