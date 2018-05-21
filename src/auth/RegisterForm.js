import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { register } from 'actions/users'
import { Form, InputField } from 'informative'
import houseSchema from 'shared/houseSchema'
import FieldWrap from 'components/informative/FieldWrap'
import ButtonLoader from 'components/ButtonLoader'
import InlineNotice from 'components/InlineNotice'
import withNotice from 'components/withNotice'

const schema = houseSchema.clone(['firstName', 'lastName', 'email', 'password'])

export class RegisterForm extends React.Component {
  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (formValues) {
    const { addNotice, clearNotice, onRegister } = this.props
    clearNotice()

    return Promise.resolve(onRegister(formValues))
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
                label='First Name'
                type='text'
                placeholder='Enter First Name'
                name='firstName'
                autoComplete='given-name'
                component={InputField}
              />

              <FieldWrap
                label='Last Name'
                type='text'
                placeholder='Enter Last Name'
                name='lastName'
                autoComplete='family-name'
                component={InputField}
              />

              <FieldWrap
                label='Email'
                type='email'
                placeholder='Enter Email'
                name='email'
                autoComplete='username'
                component={InputField}
              />

              <FieldWrap
                label='Password'
                type='password'
                placeholder='Enter Password'
                name='password'
                autoComplete='new-password'
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
        {noticeType !== 'success' && this.renderForm()}
      </Fragment>

    )
  }
}

RegisterForm.propTypes = {
  addNotice: PropTypes.func.isRequired,
  clearNotice: PropTypes.func.isRequired,
  noticeMessage: PropTypes.string,
  noticeType: PropTypes.string,
  onRegister: PropTypes.func.isRequired
}

export default connect(
  null,
  dispatch => ({
    onRegister: registerData => dispatch(register(registerData))
  })
)(withNotice(RegisterForm))
