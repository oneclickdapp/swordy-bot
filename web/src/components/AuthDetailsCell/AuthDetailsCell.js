import { Link, routes } from '@redwoodjs/router'

import AuthDetails from 'src/components/AuthDetails'

export const QUERY = gql`
  query AUTH_DETAILS {
    authDetails {
      id
      nonce
      timestamp
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No authDetails yet. '}
      <Link to={routes.newAuthDetail()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ authDetails }) => {
  return <AuthDetails authDetails={authDetails} />
}
