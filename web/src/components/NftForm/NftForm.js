import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const NftForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.nft?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="website"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Website
        </Label>
        <TextField
          name="website"
          defaultValue={props.nft?.website}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="website" className="rw-field-error" />

        <Label
          name="contractAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Contract address
        </Label>
        <TextField
          name="contractAddress"
          defaultValue={props.nft?.contractAddress}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="contractAddress" className="rw-field-error" />

        <Label
          name="tokenId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Token id
        </Label>
        <TextField
          name="tokenId"
          defaultValue={props.nft?.tokenId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="tokenId" className="rw-field-error" />

        <Label
          name="uri"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Uri
        </Label>
        <TextField
          name="uri"
          defaultValue={props.nft?.uri}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="uri" className="rw-field-error" />

        <Label
          name="iconUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Icon url
        </Label>
        <TextField
          name="iconUrl"
          defaultValue={props.nft?.iconUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="iconUrl" className="rw-field-error" />

        <Label
          name="ownerAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Owner address
        </Label>
        <TextField
          name="ownerAddress"
          defaultValue={props.nft?.ownerAddress}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="ownerAddress" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default NftForm
