import React, { Component } from 'react'
import { Form, InputField } from 'informative'
import houseSchema from 'shared/houseSchema'
import FieldWrap from 'components/informative/FieldWrap'
import ButtonLoader from 'components/ButtonLoader'

const schema = houseSchema.clone(['email', 'password'])

class ForgotForm extends Component {
  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (formValues) {
    return new Promise(resolve => {
      setTimeout(() => {
        // console.log('onSubmit', formValues)
        resolve()
      }, 5000)
    })
  }

  render () {
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
                type='email'
                label='Email'
                name='email'
                component={InputField}
              />

              <ButtonLoader
                type='submit'
                className='expanded large'
                isLoading={formState.submitting}
                disabled={!formState.dirty}
              >
                Reset Password
              </ButtonLoader>
            </form>
          )
        }}
      />
    )
  }
}

export default ForgotForm
