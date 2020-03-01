import React from 'react'
import PropTypes from 'prop-types'
import Rater from 'components/Rater'
import StarButtonDropdownMovie from './StarButtonDropdownMovie'
import moment from 'moment'

const HeroExpandedContent = ({
  voteAverage,
  runtime,
  status,
  id
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
          {runtime
            ? moment.utc(
              moment.duration(runtime, 'minutes').as('milliseconds')
            ).format('H[h] m[m]')
            : 'Unknown duration'
          }
        </li>
        <li>
          <StarButtonDropdownMovie
            entityId={id}
            id='star-button-dropdown'
          />
        </li>
      </ul>
    </div>
  )
}

HeroExpandedContent.propTypes = {
  id: PropTypes.number.isRequired,
  voteAverage: PropTypes.number.isRequired,
  runtime: PropTypes.number,
  status: PropTypes.string.isRequired
}

export default HeroExpandedContent
