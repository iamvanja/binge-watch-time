import React from 'react'
import PropTypes from 'prop-types'
import { stringOrNumber } from 'constants/propTypes'
import { Link } from 'react-router-dom'
import { GridContainer, Grid, Cell } from 'components/Grid'
import { IMG_BASE_URL, BACKDROP_SIZES } from 'constants/tmdb'
import ShowStatus from './ShowStatus'

const StarredShowListItem = ({
  backdropPath,
  id,
  name,
  numberOfEpisodes,
  watchedEpisodeCount,
  status,
  lastAirDate
}) => {
  const heroStyle = {
    backgroundImage: backdropPath
      ? `url('${IMG_BASE_URL}/${BACKDROP_SIZES.large}${backdropPath}')`
      : undefined
  }
  return (
    <div className='starred-show-list-item overlay-bg' style={heroStyle}>
      <Link to={`shows/${id}`}>
        <GridContainer>
          <Grid>
            <Cell className='auto' alignSelf='bottom'>
              <h2>{name}</h2>
            </Cell>
            <Cell className='shrink text-right' alignSelf='middle'>
              <h6>
                {/* todo: calculate missed episodes count */}
                <span>
                  <span className='stat'>
                    {numberOfEpisodes - watchedEpisodeCount}
                  </span> missed
                  <hr />
                </span>

                {/* todo: show next episode date */}
                <ShowStatus
                  tmdbStatus={status}
                  lastAired={lastAirDate}
                />
              </h6>
            </Cell>
          </Grid>
        </GridContainer>
      </Link>
    </div>
  )
}

StarredShowListItem.defaultProps = {
  watchedEpisodeCount: 0
}

StarredShowListItem.propTypes = {
  backdropPath: PropTypes.string,
  id: stringOrNumber.isRequired,
  name: PropTypes.string.isRequired,
  numberOfEpisodes: PropTypes.number.isRequired,
  watchedEpisodeCount: PropTypes.number,
  status: PropTypes.string,
  lastAirDate: PropTypes.string
}

export default StarredShowListItem
