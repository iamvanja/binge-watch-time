import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Form, InputField } from 'informative'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import { login } from 'redux/actions/auth'

import houseSchema from 'shared/houseSchema'
import FieldWrap from 'components/informative/FieldWrap'
import CheckboxWrap from 'components/informative/CheckboxWrap'
import ButtonLoader from 'components/ButtonLoader'
import InlineNotice from 'components/InlineNotice'

const schema = houseSchema.clone(['email', 'password'])

class LoginForm extends Component {
  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (formValues) {
    return Promise.resolve(this.props.onLogin(formValues))
  }

  render () {
    const { noticeMessage, isPending } = this.props
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
              <InlineNotice type='alert'>
                {noticeMessage}
              </InlineNotice>

              <FieldWrap
                label='Email'
                type='email'
                placeholder='Enter your email'
                name='email'
                autoComplete='email'
                component={InputField}
              />

              <FieldWrap
                label='Password'
                name='password'
                placeholder='Enter your password'
                type='password'
                autoComplete='current-password'
                component={InputField}
              />

              <div className='text-right'>
                <CheckboxWrap
                  label='Keep me logged in'
                  name='keepAlive'
                  value
                  checked
                  onChange={({ value }) => {
                    Cookies.set('keepAlive', value === 'true')
                  }}
                />
              </div>

              <ButtonLoader
                type='submit'
                className='expanded large'
                isLoading={isPending}
                disabled={!formState.dirty}
              >
                Login
              </ButtonLoader>
            </form>
          )
        }}
      />
    )
  }
}

LoginForm.propTypes = {
  noticeMessage: PropTypes.string,
  isPending: PropTypes.bool,
  onLogin: PropTypes.func.isRequired
}

export default withRouter(connect(
  state => ({
    isPending: selectors.auth.isAuthPending(state),
    noticeMessage: selectors.auth.getAuthErrorMessage(state)
  }),
  dispatch => ({
    onLogin: credentials => dispatch(login(credentials))
  })
)(LoginForm))
