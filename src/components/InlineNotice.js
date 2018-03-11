import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const InlineNotice = ({ children, active, type, size }) => {
  if (!children || !active) {
    return null
  }
  const componentClasses = classnames(
    'callout', {
      [type]: !!type,
      [size]: !!size
    }
  )

  return (
    <div className={componentClasses}>
      {children}
    </div>
  )
}

InlineNotice.defaultProps = {
  active: true,
  size: 'normal'
}

InlineNotice.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  type: PropTypes.oneOf([
    'warning',
    'alert',
    'success',
    'primary',
    'secondary'
  ]),
  size: PropTypes.oneOf([
    'small',
    'normal',
    'large'
  ])
}

export default InlineNotice
