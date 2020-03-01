import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import * as shows from 'redux/actions/shows'
import DetailHero from 'components/DetailHero'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import ShowDetailOverview from './ShowDetailOverview'
import SeasonList from './SeasonList'
import EpisodeDetailPage, { NextEpisode } from './EpisodeDetailPage'
import Loader from 'components/Loader'
import { GridContainer } from 'components/Grid'
import Button from 'components/Button'
import isEqual from 'lodash/isEqual'
import HeroExpandedContent from './HeroExpandedContent'

class ShowDetailPage extends Component {
  constructor () {
    super()

    this.state = {
      isSpecial: false
    }
    this.getData = this.getData.bind(this)
    this.handleSpecial = this.handleSpecial.bind(this)
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

  handleSpecial () {
    this.setState({ isSpecial: true })
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
      <div className='page detail show-detail'>
        <DetailHero
          isMini={!location.pathname.endsWith('/overview')}
          name={this.props.name}
          backdropPath={this.props.backdropPath}
          posterPath={this.props.posterPath}
          listName={this.props.listName}
          onSpecial={this.handleSpecial}
        >
          <HeroExpandedContent
            voteAverage={this.props.voteAverage}
            networks={this.props.networks}
            episodeRunTime={this.props.episodeRunTime}
            status={this.props.status}
            id={parseInt(showId, 10)}
            nextEpisodeToAir={this.props.nextEpisodeToAir}
          />
        </DetailHero>

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
              component={(props) =>
                <NextEpisode
                  {...props}
                  isSpecial={this.state.isSpecial}
                />
              }
            />
            <Route
              path={`${match.path}/episodes`}
              exact
              component={SeasonList}
            />
            <Route
              path={`${match.path}/episodes/s:seasonNumber(\\d+)e:episodeNumber(\\d+)`}
              exact
              component={(props) =>
                <EpisodeDetailPage
                  {...props}
                  isSpecial={this.state.isSpecial}
                />}
            />

            <Redirect from={match.url} to={this.getRedirectUrl()} />
          </Switch>
        </GridContainer>
      </div>
    )
  }
}

ShowDetailPage.defaultProps = {
  episodeRunTime: [],
  networks: []
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
  defaultToNextRoute: PropTypes.bool,

  name: PropTypes.string,
  voteAverage: PropTypes.number,
  networks: PropTypes.array,
  episodeRunTime: PropTypes.array,
  backdropPath: PropTypes.string,
  posterPath: PropTypes.string,
  status: PropTypes.string,
  listName: PropTypes.string,
  nextEpisodeToAir: PropTypes.shape({
    airDate: PropTypes.string
  })
}

export default connect(
  (state, ownProps) => {
    const showId = parseInt(ownProps.match.params.showId, 10)
    const action = shows.one(showId)
    const inListId = selectors.starredShows.getListIdByShowId(state, showId)
    const lists = selectors.lists.getLists(state, 'shows')

    return {
      ...selectors.shows.getShow(state, showId),
      listName: lists[inListId],
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
