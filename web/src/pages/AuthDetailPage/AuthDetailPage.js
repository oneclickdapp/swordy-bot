import AuthDetailsLayout from 'src/layouts/AuthDetailsLayout'
import AuthDetailCell from 'src/components/AuthDetailCell'

const AuthDetailPage = ({ id }) => {
  return (
    <AuthDetailsLayout>
      <AuthDetailCell id={id} />
    </AuthDetailsLayout>
  )
}

export default AuthDetailPage
