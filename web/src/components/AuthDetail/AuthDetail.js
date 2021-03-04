import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/AuthDetailsCell'

const DELETE_AUTH_DETAIL_MUTATION = gql`
  mutation DeleteAuthDetailMutation($id: String!) {
    deleteAuthDetail(id: $id) {
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

const AuthDetail = ({ authDetail }) => {
  const { addMessage } = useFlash()
  const [deleteAuthDetail] = useMutation(DELETE_AUTH_DETAIL_MUTATION, {
    onCompleted: () => {
      navigate(routes.authDetails())
      addMessage('AuthDetail deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete authDetail ' + id + '?')) {
      deleteAuthDetail({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            AuthDetail {authDetail.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{authDetail.id}</td>
            </tr>
            <tr>
              <th>Nonce</th>
              <td>{authDetail.nonce}</td>
            </tr>
            <tr>
              <th>Timestamp</th>
              <td>{timeTag(authDetail.timestamp)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAuthDetail({ id: authDetail.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(authDetail.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default AuthDetail
