import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Icon from './Icon'

const Button = ({ type, icon, onClick, className, children, ...rest }) =>
  <button
    {...rest}
    onClick={onClick}
    type={type || 'button'}
    className={classnames('button', className, { 'icon-text': icon })}>
    {icon && <Icon icon={icon} />}
    {children && <span>{children}</span>}
  </button>

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string
}

export default Button