import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loader from 'components/Loader'
import Image from 'components/Image'
import Icon from 'components/Icon'
import { Grid, Cell } from 'components/Grid'
import StarButtonEpisode from './StarButtonEpisode'
import { IMG_BASE_URL, STILL_SIZES } from 'constants/tmdb'
import { formatDate } from 'utils/date'
import { formatSeasonEpisode } from 'utils/string'
import * as episodes from 'redux/actions/episodes'
import * as selectors from 'redux/reducers/selectors'
import mapValues from 'lodash/mapValues'
import isInTheFuture from './utils/isInTheFuture'

class EpisodeDetailPage extends Component {
  constructor () {
    super()

    this.getData = this.getData.bind(this)
  }

  componentWillMount () {
    if (!this.props.id) {
      this.getData()
    }
  }

  componentDidUpdate (prevProps) {
    if (
      prevProps.seasonNumber !== this.props.seasonNumber ||
      prevProps.episodeNumber !== this.props.episodeNumber
    ) {
      this.getData()
    }
  }

  getData () {
    const { showId, seasonNumber, episodeNumber } = this.props

    return this.props.onLoad(showId, seasonNumber, episodeNumber)
  }

  get isInTheFuture () {
    return isInTheFuture(this.props.airDate)
  }

  getContent () {
    const {
      isPending,
      isErrored,
      id,
      airDate,
      showId,
      seasonNumber,
      episodeNumber,
      showWatchButton,
      ...episode
    } = this.props

    if (isPending) {
      return <Loader />
    }

    if (isErrored) {
      return (
        <p className='text-center subheader'>
          Error...
        </p>
      )
    }

    if (!id) {
      return (
        <p className='text-center subheader'>
          No data found...
        </p>
      )
    }

    return (
      <Fragment>
        <Grid align='middle'>
          <Cell className='auto'>
            <h2>{episode.name}</h2>
            <div className='episode-info'>
              <span>
                {formatSeasonEpisode(seasonNumber, episodeNumber)}
              </span>
              |
              {airDate && (
                <span>
                  {formatDate(airDate, 'dddd, MMMM D, YYYY')}
                </span>
              )}
            </div>
          </Cell>
          {showWatchButton && !this.isInTheFuture && (
            <Cell className='shrink'>
              <StarButtonEpisode
                className='episode-watch-toggle'
                showId={showId}
                episodeId={id}
                seasonNumber={seasonNumber}
                episodeNumber={episodeNumber}
              >
                <Icon icon='eye' />
              </StarButtonEpisode>
            </Cell>
          )}
        </Grid>

        <hr />

        {episode.stillPath && (
          <div className='text-center'>
            <Image
              src={`${IMG_BASE_URL}/${STILL_SIZES.medium}${episode.stillPath}`}
              alt={`${episode.name} still`}
            />
          </div>
        )}

        <h3>Overview</h3>
        <p>{episode.overview || 'N/A'}</p>

      </Fragment>
    )
  }

  render () {
    return (
      <div className='episode-detail-page'>
        {this.getContent()}
      </div>
    )
  }
}

EpisodeDetailPage.propTypes = {
  showId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  episodeNumber: PropTypes.number.isRequired,
  id: PropTypes.number,
  showWatchButton: PropTypes.bool,
  isPending: PropTypes.bool,
  isErrored: PropTypes.bool,
  onLoad: PropTypes.func.isRequired,
  airDate: PropTypes.string

}

const getBaseProps = (state, options) => {
  options = mapValues(options, parseInt)
  const { showId, seasonNumber, episodeNumber } = options

  const action = episodes.one(showId, seasonNumber, episodeNumber)
  const episode = selectors.episodes.getEpisodeByQuery(state, options)

  return {
    ...options,
    isPending: selectors.ui.isRequestPending(state, action),
    isErrored: selectors.ui.isRequestErrored(state, action),
    showWatchButton: selectors.starredShows.isShowStarred(state, showId),
    ...episode
  }
}

const mapDispatchToProps = {
  onLoad: episodes.one
}

export const NextEpisode = connect(
  (state, ownProps) => {
    const showId = ownProps.match.params.showId
    const { seasonNumber, episodeNumber } = selectors
      .getNextEpisode(state, showId)

    return {
      ...getBaseProps(state, {
        showId,
        seasonNumber,
        episodeNumber
      })
    }
  },
  mapDispatchToProps
)(EpisodeDetailPage)

export default connect(
  (state, ownProps) => {
    const { showId, seasonNumber, episodeNumber } = ownProps.match.params

    return {
      ...getBaseProps(state, {
        showId,
        seasonNumber,
        episodeNumber
      })
    }
  },
  mapDispatchToProps
)(EpisodeDetailPage)
