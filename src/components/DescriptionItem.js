import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const DescriptionItem = ({ term, definition }) =>
  <Fragment>
    <dt>{term}</dt>
    <dd>{definition || 'N/A'}</dd>
  </Fragment>

DescriptionItem.propTypes = {
  term: PropTypes.string.isRequired,
  definition: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default DescriptionItem
