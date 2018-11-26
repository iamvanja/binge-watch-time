import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as starredShows from 'actions/starredShows'
import {
  getStarredShows,
  isRequestPending,
  isRequestErrored,
  getWatchedEpisodesByShowId
} from 'reducers'
import { Link } from 'react-router-dom'
import Loader from 'components/Loader'
import Button from 'components/Button'
import StarredShowListItem from './StarredShowListItem'

class StarredShowList extends Component {
  renderContent () {
    const { isPending, isErrored, shows, onShowsLoad } = this.props
    if (isPending) {
      return <Loader />
    }

    if (isErrored) {
      return (
        <div className='text-center'>
          <p className='subheader'>
            Error while loading starred shows...
          </p>
          <Button onClick={onShowsLoad} className='hollow'>
            Try loading again
          </Button>
        </div>
      )
    }

    return shows.length
      ? (shows.map(show =>
        <StarredShowListItem
          key={show.id}
          {...show}
          watchedEpisodeCount={this.props.getWatchedEpisodesCount(show.id)}
        />
      ))
      : (
        <p className='text-center subheader lead'>
          No starred shows. <Link to='/discover'>Discover some</Link>.
        </p>
      )
  }

  render () {
    return (
      <div className='shows-starred-list'>
        {this.renderContent()}
      </div>
    )
  }
}

StarredShowList.propTypes = {
  isPending: PropTypes.bool,
  isErrored: PropTypes.bool,
  shows: PropTypes.array,
  onShowsLoad: PropTypes.func.isRequired,
  getWatchedEpisodesCount: PropTypes.func.isRequired
}

export default connect(
  state => ({
    isPending: isRequestPending(state, starredShows.fetch()),
    isErrored: isRequestErrored(state, starredShows.fetch()),
    shows: getStarredShows(state),
    getWatchedEpisodesCount: showId =>
      getWatchedEpisodesByShowId(state, showId).length
  }),
  dispatch => ({
    onShowsLoad: () => dispatch(starredShows.fetch())
  })
)(StarredShowList)
