import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import AuthDetailForm from 'src/components/AuthDetailForm'

import { QUERY } from 'src/components/AuthDetailsCell'

const CREATE_AUTH_DETAIL_MUTATION = gql`
  mutation CreateAuthDetailMutation($input: CreateAuthDetailInput!) {
    createAuthDetail(input: $input) {
      id
    }
  }
`

const NewAuthDetail = () => {
  const { addMessage } = useFlash()
  const [createAuthDetail, { loading, error }] = useMutation(
    CREATE_AUTH_DETAIL_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.authDetails())
        addMessage('AuthDetail created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createAuthDetail({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New AuthDetail</h2>
      </header>
      <div className="rw-segment-main">
        <AuthDetailForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAuthDetail
