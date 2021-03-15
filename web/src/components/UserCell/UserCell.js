import User from 'src/components/User'

export const QUERY = gql`
  query FIND_USER_BY_ID($address: String!) {
    user: user(address: $address) {
      address
      authDetailId
      gamesOwned {
        id
        createdAt
        updatedAt
        playedAt
        mintedAt
        moves
        black
        white
        externalUrl
      }
      gamesMinted {
        id
        createdAt
        updatedAt
        playedAt
        mintedAt
        moves
        black
        white
        externalUrl
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Success = ({ user }) => <User user={user} />
