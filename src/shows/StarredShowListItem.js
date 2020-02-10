import React from 'react'
import PropTypes from 'prop-types'
import { stringOrNumber } from 'constants/propTypes'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import { Link } from 'react-router-dom'
import { GridContainer, Grid, Cell } from 'components/Grid'
import ImageTmdb from 'components/ImageTmdb'
import ShowStatus from './ShowStatus'
import get from 'lodash/get'

const StarredShowListItem = props => {
  const {
    id,
    name,
    status,
    nextEpisodeToAir,
    missedEpisodeCount,
    backdropPath
  } = props

  return (
    <div className='starred-show-list-item overlay-bg'>
      {backdropPath && (
        <ImageTmdb
          className='bwt-background-image'
          type='backdrop'
          size='large'
          path={backdropPath}
          name={name}
        />
      )}
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
                    {missedEpisodeCount}
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
  missedEpisodeCount: 0
}

StarredShowListItem.propTypes = {
  backdropPath: PropTypes.string,
  id: stringOrNumber.isRequired,
  name: PropTypes.string,
  missedEpisodeCount: PropTypes.number,
  status: PropTypes.string,
  nextEpisodeToAir: PropTypes.shape({
    airDate: PropTypes.string
  })
}

export default connect(
  (state, ownProps) => {
    return {
      missedEpisodeCount: selectors.getMissedCountPerShow(
        state, ownProps.id
      )
    }
  }
)(StarredShowListItem)
