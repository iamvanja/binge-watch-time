import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { formatDate } from 'utils/date'

const ShowStatus = ({ tmdbStatus = '', lastAired }) => {
  let status = tmdbStatus.toLowerCase()
  status = status === 'ended' || status === 'canceled'
    ? 'Dead 😢'
    : formatDate(lastAired, 'dddd') + 's'

  status = status === 's'
    ? null
    : status

  return (
    <Fragment>{status}</Fragment>
  )
}

ShowStatus.propTypes = {
  tmdbStatus: PropTypes.string,
  lastAired: PropTypes.string
}

export default ShowStatus
