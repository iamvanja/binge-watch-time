import React from 'react'
import PropTypes from 'prop-types'
import Rater from 'components/Rater'
// import StarButtonDropdownShow from './StarButtonDropdownShow'
import moment from 'moment'

const HeroExpandedContent = ({
  voteAverage,
  runtime,
  status
}) => {
  return (
    <div className='hero-expanded-content'>
      <ul className='no-bullet'>
        <li className='status'>
          {status}
        </li>
        <li className='ratings'>
          <Rater total={5} rating={(voteAverage / 10) * 5} />
        </li>
        <li className='runtime'>
          {moment.utc(
            moment.duration(runtime, 'minutes').as('milliseconds')
          ).format('H[h] m[m]')}
        </li>
        {/* <li>
          <StarButtonDropdownShow
            showId={id}
            id='star-button-dropdown'
          />
        </li> */}
      </ul>
    </div>
  )
}

HeroExpandedContent.propTypes = {
  voteAverage: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired
}

export default HeroExpandedContent
