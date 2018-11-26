import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderable } from 'constants/propTypes'
import classnames from 'classnames'
import Button from './Button'
import omit from 'lodash/omit'
class ButtonToggle extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    const { isActive, onActive, onInactive } = this.props
    const action = isActive ? onInactive : onActive

    return action()
  }

  render () {
    const {
      className,
      isActive,
      activeClass,
      children,
      activeLabel,
      inactiveLabel,
      onActive,
      onInactive,
      ...rest
    } = this.props

    return (
      <Button
        {...omit(rest, ['seasonNumber', 'episodeNumber'])}
        className={classnames('button-toggle', className, {
          [activeClass]: isActive
        })}
        onClick={this.onClick}
      >
        {
          children || (isActive ? inactiveLabel : activeLabel)
        }
      </Button>
    )
  }
}

ButtonToggle.defaultProps = {
  activeLabel: 'ACTIVE',
  inactiveLabel: 'INACTIVE',
  activeClass: 'active'
}

ButtonToggle.propTypes = {
  activeLabel: PropTypes.string,
  inactiveLabel: PropTypes.string,
  className: PropTypes.string,
  activeClass: PropTypes.string,
  onActive: PropTypes.func.isRequired,
  onInactive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  children: renderable
}

export default ButtonToggle
