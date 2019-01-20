import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Loader = ({ className }) => (
  <div className={classnames('loader', className)}>
    <span>&bull;</span>
    <span>&bull;</span>
    <span>&bull;</span>
  </div>
)

Loader.propTypes = {
  className: PropTypes.string
}

export default Loader
