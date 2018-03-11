import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Form, InputField } from 'informative'
import Cookies from 'js-cookie'
import queryString from 'query-string'
import houseSchema from 'shared/houseSchema'
import api from 'api'
import FieldWrap from 'components/informative/FieldWrap'
import CheckboxWrap from 'components/informative/CheckboxWrap'
import ButtonLoader from 'components/ButtonLoader'
import InlineNotice from 'components/InlineNotice'
import withNotice from 'components/withNotice'

const schema = houseSchema.clone(['email', 'password'])

class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      errorMessage: null
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (formValues) {
    const { addNotice, clearNotice, history } = this.props

    clearNotice()
    return api.auth.login(formValues)
      .then(loggedUser => {
        const next = queryString.parse(window.location.search).next || '/'
        history.push(next)
      })
      .catch(err => addNotice(err.message, 'alert'))
  }

  render () {
    const { noticeMessage, noticeType } = this.props
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
              <InlineNotice type={noticeType}>
                {noticeMessage}
              </InlineNotice>

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
                isLoading={formState.submitting}
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
  addNotice: PropTypes.func.isRequired,
  clearNotice: PropTypes.func.isRequired,
  noticeMessage: PropTypes.string,
  noticeType: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(withNotice(LoginForm))
