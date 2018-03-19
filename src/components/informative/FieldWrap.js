import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'informative'
import classnames from 'classnames'

const FieldWrap = ({
  label,
  component: Component,
  children,
  name,
  value,
  required,
  ...rest
}) => {
  return (
    <Field
      {...rest}
      name={name}
      value={value}
      render={(events, fieldState, formState) => {
        const { validField, error, touched } = fieldState
        const { submitFailed } = formState

        // Error message logic
        const errorMessage = (submitFailed || touched) && !validField
          ? error
          : ''

        // Classes
        const labelClass = classnames({ 'is-invalid-label': errorMessage.length, required })
        const componentClass = classnames({ 'is-invalid-input': errorMessage.length, required })
        const errorMessageClass = classnames('form-error', { 'is-visible': errorMessage.length })

        return (
          <label className={labelClass} htmlFor={name}>
            {label}
            <Component
              {...rest}
              className={componentClass}
              originalValue={value}
              name={name}
              fieldState={fieldState}
              formState={formState}
              events={events}>
              {children}
            </Component>
            <span className={errorMessageClass}>{errorMessage}</span>
          </label>
        )
      }
      } />
  )
}

FieldWrap.propTypes = {
  label: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
  children: PropTypes.node,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool
}

export default FieldWrap
