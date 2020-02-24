import React from 'react'
import PropTypes from 'prop-types'
import { stringOrNumber } from 'constants/propTypes'

const Select = ({ onChange, defaultValue, options, value }) => {
  const valueProp = {
    ...value && { value },
    ...!value && { defaultValue: defaultValue || '' }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={onChange} {...valueProp}>
      {options.map(({ value, label }) =>
        <option key={value} value={value}>{label}</option>
      )}
    </select>
  )
}

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: stringOrNumber,
  value: stringOrNumber,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: stringOrNumber.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Select
