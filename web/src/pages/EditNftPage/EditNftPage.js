import NftsLayout from 'src/layouts/NftsLayout'
import EditNftCell from 'src/components/EditNftCell'

const EditNftPage = ({ id }) => {
  return (
    <NftsLayout>
      <EditNftCell id={id} />
    </NftsLayout>
  )
}

export default EditNftPage
