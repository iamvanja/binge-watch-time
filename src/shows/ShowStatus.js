import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const ShowStatus = ({ tmdbStatus = '', nextAirDate }) => {
  let status = tmdbStatus.toLowerCase()
  status = status === 'ended' || status === 'canceled'
    ? 'Dead 😢'
    : nextAirDate
      ? moment(nextAirDate, 'YYYY-MM-DD').diff(moment().startOf('day'), 'days')
      : 'TBA'

  if (typeof status === 'number') {
    if (status === 0) {
      status = 'Today'
    } else if (status === 1) {
      status = 'Tomorrow'
    } else {
      status = status + ' days'
    }
  }

  return (
    <Fragment>{status}</Fragment>
  )
}

ShowStatus.propTypes = {
  tmdbStatus: PropTypes.string,
  nextAirDate: PropTypes.string
}

export default ShowStatus
