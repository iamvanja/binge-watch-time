import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import api from 'api'
import { Form, InputField } from 'informative'
import houseSchema from 'shared/houseSchema'
import FieldWrap from 'components/informative/FieldWrap'
import ButtonLoader from 'components/ButtonLoader'
import InlineNotice from 'components/InlineNotice'
import withNotice from 'components/withNotice'

const schema = houseSchema.clone(['firstName', 'lastName', 'email', 'password'])

class RegisterForm extends React.Component {
  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (formValues) {
    const { addNotice, clearNotice } = this.props
    clearNotice()
    return api.users.register(formValues)
      .then((response = {}) => {
        if (response.userId) {
          addNotice(`Last step! Please check your ${formValues.email} inbox for verification instructions.`, 'success')
        } else {
          addNotice('Error while registering. Please try again.', 'alert')
        }
      })
      .catch(err => addNotice(err.message, 'alert'))
  }

  renderForm () {
    return (
      <Form onSubmit={this.onSubmit} validate={schema.validate}
        render={(formProps, formState) => {
          return (
            <form
              {...formProps}
              className='common-form'
              noValidate
              method='POST'
            >
              <FieldWrap
                label='First
                Name'
                name='firstName'
                component={InputField}
              />

              <FieldWrap
                label='Last
                Name'
                name='lastName'
                component={InputField}
              />

              <FieldWrap
                type='email'
                label='Email'
                name='email'
                component={InputField}
              />

              <FieldWrap
                label='Password'
                name='password'
                type='password'
                component={InputField}
              />

              <ButtonLoader
                type='submit'
                className='expanded large'
                isLoading={formState.submitting}
              >
                Register
                {/* disabled={!formState.dirty} */}
              </ButtonLoader>
            </form>
          )
        }} />
    )
  }

  render () {
    const { noticeMessage, noticeType } = this.props
    return (
      <Fragment>
        <InlineNotice type={noticeType}>
          {noticeMessage}
        </InlineNotice>
        { noticeType !== 'success' && this.renderForm() }
      </Fragment>

    )
  }
}

RegisterForm.propTypes = {
  addNotice: PropTypes.func.isRequired,
  clearNotice: PropTypes.func.isRequired,
  noticeMessage: PropTypes.string,
  noticeType: PropTypes.string
}

export default withNotice(RegisterForm)
