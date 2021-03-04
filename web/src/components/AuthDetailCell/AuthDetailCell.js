import AuthDetail from 'src/components/AuthDetail'

export const QUERY = gql`
  query FIND_AUTH_DETAIL_BY_ID($id: String!) {
    authDetail: authDetail(id: $id) {
      id
      nonce
      timestamp
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>AuthDetail not found</div>

export const Success = ({ authDetail }) => {
  return <AuthDetail authDetail={authDetail} />
}
