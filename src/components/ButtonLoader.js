import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Button from './Button'
import Loader from './Loader'

const ButtonLoader = ({ disabled, isLoading, className, ...rest }) => {
  const content = isLoading
    ? <Loader />
    : rest.children

  return (
    <Button
      {...rest}
      disabled={disabled || isLoading}
      className={classnames('button-loader', className, {
        'is-loading': isLoading
      })}
    >
      {content}
    </Button>
  )
}

ButtonLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]).isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
}

export default ButtonLoader
