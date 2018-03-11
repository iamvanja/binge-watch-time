import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Icon = ({ className, icon }) =>
  <i className={classnames('icon', `icon-${icon}`, className)} />

Icon.propTypes = {
  icon: PropTypes.oneOf([
    'eye',
    'menu',
    'cancel',
    'picture',
    'search',
    'ok',
    'user',
    'cog',
    'help',
    'tv',
    'home',
    'edit',
    'plus',
    'ok-circle',
    'cancel-circle',
    'cinema',
    'attention-circle',
    'attention',
    'star',
    'star-empty',
    'logout',
    'star-half',
    'lock-open'
  ]).isRequired,
  className: PropTypes.string
}

export default Icon
