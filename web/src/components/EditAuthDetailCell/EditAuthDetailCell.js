import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import AuthDetailForm from 'src/components/AuthDetailForm'

export const QUERY = gql`
  query FIND_AUTH_DETAIL_BY_ID($id: String!) {
    authDetail: authDetail(id: $id) {
      id
      nonce
      timestamp
    }
  }
`
const UPDATE_AUTH_DETAIL_MUTATION = gql`
  mutation UpdateAuthDetailMutation(
    $id: String!
    $input: UpdateAuthDetailInput!
  ) {
    updateAuthDetail(id: $id, input: $input) {
      id
      nonce
      timestamp
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ authDetail }) => {
  const { addMessage } = useFlash()
  const [updateAuthDetail, { loading, error }] = useMutation(
    UPDATE_AUTH_DETAIL_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.authDetails())
        addMessage('AuthDetail updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateAuthDetail({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit AuthDetail {authDetail.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <AuthDetailForm
          authDetail={authDetail}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
