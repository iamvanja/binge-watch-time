import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Icon from './Icon'
import omit from 'lodash/omit'

export const buttonize = handlerFn => ({
  role: 'button',
  onClick: handlerFn,
  onKeyDown: event => {
    if (event.keycode === 13) {
      handlerFn(event)
    }
  }
})

const Button = ({ type, icon, onClick, className, children, ...rest }) =>
  <button
    {...omit(rest, ['showId', 'episodeId', 'seasonId'])}
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
