import React from 'react'
import PropTypes from 'prop-types'
import { stringOrNumber } from 'constants/propTypes'
import Rater from 'components/Rater'
import StarButtonDropdownShow from './StarButtonDropdownShow'
import ShowStatus from './ShowStatus'
import get from 'lodash/get'

const HeroExpandedContent = ({
  voteAverage,
  networks,
  episodeRunTime,
  status,
  id,
  nextEpisodeToAir
}) => {
  return (
    <div className='hero-expanded-content'>
      <ul className='no-bullet'>
        <li className='airs-day'>
          <ShowStatus
            tmdbStatus={status}
            nextAirDate={get(nextEpisodeToAir, 'airDate')}
          />
        </li>
        <li className='ratings'>
          <Rater total={5} rating={(voteAverage / 10) * 5} />
        </li>
        <li className='network' title='Network name'>
          {networks.map(({ name }) => name).join(', ')}
        </li>
        <li className='runtime'>
          {episodeRunTime.length
            ? `${episodeRunTime[0]} minutes/episode`
            : null
          }
        </li>
        <li>
          <StarButtonDropdownShow
            entityId={id}
            id='star-button-dropdown'
          />
        </li>
      </ul>
    </div>
  )
}

HeroExpandedContent.defaultProps = {
  networks: []
}

HeroExpandedContent.propTypes = {
  voteAverage: PropTypes.number,
  networks: PropTypes.array,
  episodeRunTime: PropTypes.array.isRequired,
  status: PropTypes.string,
  id: stringOrNumber.isRequired,
  nextEpisodeToAir: PropTypes.shape({
    airDate: PropTypes.string
  })
}

export default HeroExpandedContent
