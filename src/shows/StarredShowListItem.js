import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { GridContainer, Grid, Cell } from 'components/Grid'
import { IMG_BASE_URL, BACKDROP_SIZES } from 'constants/tmdb'
import ShowStatus from './ShowStatus'

const StarredShowListItem = ({ backdropPath, ...show }) => {
  const heroStyle = {
    backgroundImage: backdropPath
      ? `url('${IMG_BASE_URL}/${BACKDROP_SIZES.large}${backdropPath}')`
      : undefined
  }
  return (
    <div className='starred-show-list-item overlay-bg' style={heroStyle}>
      <Link to={`shows/${show.id}`}>
        <GridContainer>
          <Grid>
            <Cell className='auto' alignSelf='bottom'>
              <h2>{show.name}</h2>
            </Cell>
            <Cell className='shrink text-right' alignSelf='middle'>
              <h6>
                {/* todo: calculate missed episodes count */}
                <span>
                  <span className='stat'>{show.numberOfEpisodes}</span> missed
                  <hr />
                </span>

                {/* todo: show next episode date */}
                <ShowStatus
                  tmdbStatus={show.status}
                  lastAired={show.lastAirDate}
                />
              </h6>
            </Cell>
          </Grid>
        </GridContainer>
      </Link>
    </div>
  )
}

StarredShowListItem.propTypes = {
  backdropPath: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default StarredShowListItem
