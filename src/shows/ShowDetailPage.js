import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import * as shows from 'redux/actions/shows'
import ShowHero from './ShowHero'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import ShowDetailOverview from './ShowDetailOverview'
import SeasonList from './SeasonList'
import EpisodeDetailPage, { NextEpisode } from './EpisodeDetailPage'
import Loader from 'components/Loader'
import { GridContainer } from 'components/Grid'
import Button from 'components/Button'
import isEqual from 'lodash/isEqual'

class ShowDetailPage extends Component {
  constructor () {
    super()

    this.getData = this.getData.bind(this)
  }

  componentWillMount () {
    this.getData()
  }

  componentDidUpdate (prevProps) {
    if (
      !isEqual(
        prevProps.match.params.showId,
        this.props.match.params.showId
      )
    ) {
      this.getData()
    }
  }

  getData () {
    const { showId } = this.props.match.params
    this.props.onLoad(parseInt(showId, 10))
  }

  getRedirectUrl () {
    const { match, defaultToNextRoute } = this.props

    return `${match.url}/${defaultToNextRoute ? 'next' : 'overview'}`
  }

  render () {
    const {
      isPending,
      isErrored,
      isLoaded,
      match,
      location
    } = this.props
    const { showId } = match.params

    if (isErrored) {
      return (
        <div className='text-center'>
          <p className='subheader'>
            Error while loading the show...
          </p>
          <Button onClick={this.getData} className='hollow'>
            Try loading again
          </Button>
        </div>
      )
    }

    if (isPending || !isLoaded) {
      return <Loader />
    }

    return (
      <div className='page show-detail'>
        <ShowHero
          isMini={!location.pathname.endsWith('/overview')}
          showId={parseInt(showId, 10)}
        />

        <nav className='sub-nav'>
          <ul className='menu expanded grid-container'>
            <li><NavLink to={`${match.url}/next`} exact>Next</NavLink></li>
            <li><NavLink to={`${match.url}/overview`} exact>Overview</NavLink></li>
            <li><NavLink to={`${match.url}/episodes`}>Episodes</NavLink></li>
          </ul>
        </nav>

        <GridContainer>
          <Switch>
            <Route
              path={`${match.path}/overview`}
              exact
              component={ShowDetailOverview}
            />
            <Route
              path={`${match.path}/next`}
              exact
              component={NextEpisode}
            />
            <Route
              path={`${match.path}/episodes`}
              exact
              component={SeasonList}
            />
            <Route
              path={`${match.path}/episodes/s:seasonNumber(\\d+)e:episodeNumber(\\d+)`}
              exact
              component={EpisodeDetailPage}
            />

            <Redirect from={match.url} to={this.getRedirectUrl()} />
          </Switch>
        </GridContainer>
      </div>
    )
  }
}

ShowDetailPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      showId: PropTypes.string
    }),
    isExact: PropTypes.bool,
    url: PropTypes.string,
    path: PropTypes.string
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isPending: PropTypes.bool,
  isErrored: PropTypes.bool,
  isLoaded: PropTypes.bool,
  onLoad: PropTypes.func.isRequired,
  defaultToNextRoute: PropTypes.bool
}

export default connect(
  (state, ownProps) => {
    const showId = parseInt(ownProps.match.params.showId, 10)
    const action = shows.one(showId)

    return {
      isPending: selectors.ui.isRequestPending(state, action),
      isLoaded: !!selectors.shows.getShow(state, showId),
      isErrored: selectors.ui.isRequestErrored(state, action),
      defaultToNextRoute: selectors.starredShows.isShowStarred(state, showId)
    }
  },
  {
    onLoad: shows.one
  }
)(ShowDetailPage)
