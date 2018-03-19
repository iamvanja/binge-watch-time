import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'informative'

const CheckboxWrap = ({
  label,
  name,
  value,
  disabled,
  checked: originalChecked,
  ...rest
}) =>
  <Field {...rest} name={name} value={value} checked={originalChecked}
    render={(events, fieldState) => {
      const { value: stateValue } = fieldState
      const checked = stateValue !== ''

      return (
        <label htmlFor={name}>
          <input type='checkbox' name={name} value={value} checked={checked} disabled={disabled} {...events} />
          {label}
        </label>
      )
    }}
  />

CheckboxWrap.defaultProps = {
  disabled: false
}

CheckboxWrap.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool
}

export default CheckboxWrap
