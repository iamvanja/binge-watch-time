import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import * as shows from 'actions/shows'
import ShowHero from './ShowHero'
import { connect } from 'react-redux'
import {
  isRequestPending,
  isRequestErrored,
  getShow
} from 'reducers'
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
    if (!isEqual(prevProps.match, this.props.match)) {
      this.getData()
    }
  }

  getData () {
    const { showId } = this.props.match.params
    this.props.onLoad(parseInt(showId, 10))
  }

  render () {
    const {
      isPending,
      isErrored,
      isLoaded,
      match
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
          isMini={!match.isExact}
          showId={parseInt(showId, 10)}
        />

        <nav className='sub-nav'>
          <ul className='menu expanded grid-container'>
            <li><NavLink to={`${match.url}/next`} exact>Next</NavLink></li>
            <li><NavLink to={match.url} exact>Overview</NavLink></li>
            <li><NavLink to={`${match.url}/episodes`}>Episodes</NavLink></li>
          </ul>
        </nav>

        <GridContainer>
          <Switch>
            <Route
              path={match.path}
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
            <Redirect to={match.url} />
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
  isPending: PropTypes.bool,
  isErrored: PropTypes.bool,
  isLoaded: PropTypes.bool,
  onLoad: PropTypes.func.isRequired
}

export default connect(
  (state, ownProps) => {
    const { showId } = ownProps.match.params
    const action = shows.one(showId)

    return {
      isPending: isRequestPending(state, action),
      isLoaded: !!getShow(state, showId),
      isErrored: isRequestErrored(state, action)
    }
  },
  {
    onLoad: shows.one
  }
)(ShowDetailPage)
