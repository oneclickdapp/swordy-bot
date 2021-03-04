import AuthDetailsLayout from 'src/layouts/AuthDetailsLayout'
import EditAuthDetailCell from 'src/components/EditAuthDetailCell'

const EditAuthDetailPage = ({ id }) => {
  return (
    <AuthDetailsLayout>
      <EditAuthDetailCell id={id} />
    </AuthDetailsLayout>
  )
}

export default EditAuthDetailPage
