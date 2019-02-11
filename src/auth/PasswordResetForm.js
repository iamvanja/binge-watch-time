import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, InputField } from 'informative'
import houseSchema from 'shared/houseSchema'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import api from 'api'
import FieldWrap from 'components/informative/FieldWrap'
import ButtonLoader from 'components/ButtonLoader'
import withNotice from 'components/withNotice'
import InlineNotice from 'components/InlineNotice'

const schema = houseSchema.clone(['password'])

class PasswordResetForm extends Component {
  constructor () {
    super()

    this.state = {
      isQueryVerified: null,
      isPasswordReset: false
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.verifyQuery()
  }

  get query () {
    return queryString.parse(window.location.search)
  }

  verifyQuery () {
    const { addNotice } = this.props
    const { email, token } = this.query
    const isQueryVerified = email && token

    if (!isQueryVerified) {
      addNotice('This request is not formatted correctly', 'alert')
    }

    this.setState({ isQueryVerified })
  }

  validate (formValues) {
    let errors = schema.validate(formValues)

    if (formValues.password !== formValues.repeatPassword) {
      errors.repeatPassword = 'Passwords need to match.'
    }

    return errors
  }

  onSubmit (formValues) {
    const { addNotice, clearNotice } = this.props
    const { email, token } = this.query
    const { password } = formValues
    let isPasswordReset = false
    clearNotice()

    return api.users.passwordReset({ email, token, password })
      .then(response => {
        isPasswordReset = true
        addNotice('Password changed! Login with your new password.', 'success')
      })
      .catch(err => {
        addNotice(err.data.message || err.statusText, 'alert')
      })
      .then(() => {
        this.setState({ isPasswordReset })
      })
  }

  render () {
    const { noticeMessage, noticeType } = this.props
    const { isQueryVerified, isPasswordReset } = this.state

    return (
      <Fragment>
        <InlineNotice type={noticeType}>
          {noticeMessage}
        </InlineNotice>

        {isQueryVerified && !isPasswordReset && (
          <Form onSubmit={this.onSubmit} validate={this.validate}
            render={(formProps, formState) => {
              return (
                <form
                  {...formProps}
                  className='common-form'
                  noValidate
                  method='POST'
                >
                  <FieldWrap
                    type='password'
                    label='New Password'
                    placeholder='Enter your new password'
                    name='password'
                    autoComplete='new-password'
                    component={InputField}
                  />
                  <FieldWrap
                    type='password'
                    label='Repeat New Password'
                    placeholder='Repeat your new password'
                    name='repeatPassword'
                    autoComplete='new-password'
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
        )}

        {isPasswordReset && (
          <Link
            to='/auth/login'
            className='button expanded large'
          >
            Login Page
          </Link>
        )}

      </Fragment>
    )
  }
}

PasswordResetForm.propTypes = {
  addNotice: PropTypes.func.isRequired,
  clearNotice: PropTypes.func.isRequired,
  noticeMessage: PropTypes.string,
  noticeType: PropTypes.string
}

export default withNotice(PasswordResetForm)
