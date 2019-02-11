import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, InputField } from 'informative'
import houseSchema from 'shared/houseSchema'
import FieldWrap from 'components/informative/FieldWrap'
import ButtonLoader from 'components/ButtonLoader'
import api from 'api'
import withNotice from 'components/withNotice'
import InlineNotice from 'components/InlineNotice'

const schema = houseSchema.clone(['email'])

class PasswordResetRequestForm extends Component {
  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (formValues) {
    const { addNotice, clearNotice } = this.props
    clearNotice()

    return api.users.passwordResetRequest(formValues)
      .then(response => {
        addNotice('An instruction email on how to reset your password is sent if the corresponding user account to the provided e-mail address is found.', 'success')
      })
      .catch(_ => {
        addNotice('Error while requesting a new password. Please try again.', 'alert')
      })
  }

  render () {
    const { noticeMessage, noticeType } = this.props

    return (
      <Fragment>
        <InlineNotice type={noticeType}>
          {noticeMessage}
        </InlineNotice>

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
                  type='email'
                  label='Email'
                  placeholder='Enter your email'
                  name='email'
                  autoComplete='email'
                  component={InputField}
                />

                <ButtonLoader
                  type='submit'
                  className='expanded large'
                  isLoading={formState.submitting}
                >
                  Reset Password
                </ButtonLoader>
              </form>
            )
          }}
        />

      </Fragment>
    )
  }
}

PasswordResetRequestForm.propTypes = {
  addNotice: PropTypes.func.isRequired,
  clearNotice: PropTypes.func.isRequired,
  noticeMessage: PropTypes.string,
  noticeType: PropTypes.string
}

export default withNotice(PasswordResetRequestForm)
