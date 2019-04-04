import React from 'react'
import PropTypes from 'prop-types'
import { stringOrNumber } from 'constants/propTypes'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import { Link } from 'react-router-dom'
import { GridContainer, Grid, Cell } from 'components/Grid'
import { IMG_BASE_URL, BACKDROP_SIZES } from 'constants/tmdb'
import ShowStatus from './ShowStatus'
import get from 'lodash/get'

const StarredShowListItem = props => {
  const {
    id,
    name,
    numberOfEpisodes,
    watchedEpisodeCount,
    status,
    nextEpisodeToAir,
    backdropPath
  } = props
  const heroStyle = {
    backgroundImage: backdropPath
      ? `url('${IMG_BASE_URL}/${BACKDROP_SIZES.large}${backdropPath}')`
      : undefined
  }
  const missedCount = numberOfEpisodes - watchedEpisodeCount

  return (
    <div
      className='starred-show-list-item overlay-bg'
      style={heroStyle}
    >
      <Link to={`shows/${id}`}>
        <GridContainer>
          <Grid>
            <Cell className='auto' alignSelf='bottom'>
              <h2>{name}</h2>
            </Cell>
            <Cell className='shrink text-right' alignSelf='middle'>
              <h6>
                <span>
                  <span className='stat'>
                    {'' + (missedCount < 0 ? 0 : missedCount)}
                  </span> missed
                  <hr />
                </span>

                <ShowStatus
                  tmdbStatus={status}
                  nextAirDate={get(nextEpisodeToAir, 'airDate')}
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
  name: PropTypes.string,
  numberOfEpisodes: PropTypes.number,
  watchedEpisodeCount: PropTypes.number,
  status: PropTypes.string,
  nextEpisodeToAir: PropTypes.shape({
    airDate: PropTypes.string
  })
}

export default connect(
  (state, ownProps) => {
    return {
      watchedEpisodeCount: selectors.watchedEpisodes.getWatchedEpisodesByShowId(
        state, ownProps.id
      ).length
    }
  }
)(StarredShowListItem)
