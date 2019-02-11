import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as seasons from 'redux/actions/seasons'
import * as selectors from 'redux/reducers/selectors'
import EpisodeListItem from './EpisodeListItem'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { formatSeasonEpisode } from 'utils/string'

export class SeasonEpisodeList extends Component {
  constructor () {
    super()

    this.getData = this.getData.bind(this)
  }

  componentWillMount () {
    if (!this.props.episodes.length) {
      this.getData()
    }
  }

  getData () {
    return this.props.onLoad(this.props.showId, this.props.seasonNumber)
  }

  render () {
    const {
      showId,
      isShowStarred,
      baseEpisodeUrl,
      episodes,
      isPending,
      isErrored
    } = this.props

    if (isPending) {
      return <Loader />
    }

    if (isErrored) {
      return (
        <div className='text-center'>
          <p className='subheader'>
            Error while loading episodes...
          </p>
          <Button onClick={this.getData} className='hollow'>
            Try loading again
          </Button>
        </div>
      )
    }

    return episodes.length
      ? (episodes.map(episode =>
        <EpisodeListItem
          key={episode.id}
          link={`${baseEpisodeUrl}/${formatSeasonEpisode(episode.seasonNumber, episode.episodeNumber)}`}
          name={episode.name}
          showId={showId}
          episodeId={episode.id}
          seasonNumber={episode.seasonNumber}
          episodeNumber={episode.episodeNumber}
          firstAired={episode.airDate}
          showWatchButton={isShowStarred}
        />
      ))
      : <p className='text-center subheader'>
        No episodes...
      </p>
  }
}

SeasonEpisodeList.propTypes = {
  episodes: PropTypes.array,
  showId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  onLoad: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
  isErrored: PropTypes.bool,
  isShowStarred: PropTypes.bool,
  baseEpisodeUrl: PropTypes.string.isRequired
}

export default connect(
  (state, ownProps) => {
    const { showId, seasonNumber, id } = ownProps
    const action = seasons.seasonEpisodes(showId, seasonNumber)
    const season = selectors.getShowSeason(state, id)

    return {
      ...season,
      isPending: selectors.ui.isRequestPending(state, action),
      isErrored: selectors.ui.isRequestErrored(state, action)
    }
  },
  {
    onLoad: seasons.seasonEpisodes
  }
)(SeasonEpisodeList)
