import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const AuthDetailForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.authDetail?.id)
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
          name="nonce"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Nonce
        </Label>
        <TextField
          name="nonce"
          defaultValue={props.authDetail?.nonce}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="nonce" className="rw-field-error" />

        <Label
          name="timestamp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Timestamp
        </Label>
        <TextField
          name="timestamp"
          defaultValue={props.authDetail?.timestamp}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="timestamp" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AuthDetailForm
