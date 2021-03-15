import GamesLayout from 'src/layouts/GamesLayout'
import UserCell from 'src/components/UserCell'

const UserPage = ({ address }) => {
  return (
    <GamesLayout>
      <UserCell address={address} />
    </GamesLayout>
  )
}

export default UserPage
