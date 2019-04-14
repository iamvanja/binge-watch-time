import React from 'react'
import PropTypes from 'prop-types'
import { stringOrNumber } from 'constants/propTypes'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import classnames from 'classnames'
import { GridContainer, Grid, Cell } from 'components/Grid'
import Rater from 'components/Rater'
import ImageTmdb from 'components/ImageTmdb'
import StarButtonDropdownShow from './StarButtonDropdownShow'
import ShowStatus from './ShowStatus'
import get from 'lodash/get'

const ShowHero = ({
  name,
  isMini,
  voteAverage,
  networks,
  episodeRunTime,
  backdropPath,
  posterPath,
  status,
  id,
  showListName,
  nextEpisodeToAir
}) => {
  return (
    <div className={classnames('show-hero overlay-bg', { 'mini': isMini })}>
      {backdropPath && (
        <ImageTmdb
          className='bwt-background-image'
          type='backdrop'
          size='large'
          path={backdropPath}
          name={name}
        />
      )}
      <GridContainer>
        <Grid gutters='margin'>
          <Cell
            alignSelf='bottom'
            className={classnames(
              'title',
              isMini ? 'auto' : 'small-12 large-auto'
            )}
          >
            <h1>
              {name}
              {isMini && showListName
                ? <small> ({showListName})</small>
                : null
              }
            </h1>
          </Cell>

          {!isMini && (
            <Cell className='auto large-shrink info' alignSelf='middle'>
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
                    showId={id}
                    id='star-button-dropdown'
                  />
                </li>
              </ul>
            </Cell>
          )}

          <Cell className='shrink poster bwt-image-holder' alignSelf='middle'>
            <ImageTmdb
              type='poster'
              size='medium'
              path={posterPath}
              name={name}
              width={176}
              height={260}
            />
          </Cell>

        </Grid>
      </GridContainer>
    </div>
  )
}

ShowHero.defaultProps = {
  networks: [],
  episodeRunTime: []
}

ShowHero.propTypes = {
  name: PropTypes.string.isRequired,
  isMini: PropTypes.bool,
  voteAverage: PropTypes.number,
  networks: PropTypes.array,
  episodeRunTime: PropTypes.array.isRequired,
  backdropPath: PropTypes.string,
  posterPath: PropTypes.string,
  status: PropTypes.string,
  id: stringOrNumber.isRequired,
  showListName: PropTypes.string,
  nextEpisodeToAir: PropTypes.shape({
    airDate: PropTypes.string
  })
}

export default connect(
  (state, ownProps) => {
    const { showId } = ownProps
    const inListId = selectors.starredShows.getListIdByShowId(state, showId)
    const lists = selectors.showsLists.getLists(state)

    return {
      ...selectors.shows.getShow(state, showId),
      showListName: lists[inListId]
    }
  }
)(ShowHero)
