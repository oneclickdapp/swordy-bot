import NftsLayout from 'src/layouts/NftsLayout'
import NftCell from 'src/components/NftCell'

const NftPage = ({ id }) => {
  return (
    <NftsLayout>
      <NftCell id={id} />
    </NftsLayout>
  )
}

export default NftPage
