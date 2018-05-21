import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import * as shows from 'actions/shows'
import ShowHero from './ShowHero'
import { connect } from 'react-redux'
import {
  isRequestPending,
  isRequestErrored,
  getShow,
  getShowSeasons
} from 'reducers'
import ShowDetailOverview from './ShowDetailOverview'
import EpisodesList from './EpisodesList'
import EpisodeDetailPage from './EpisodeDetailPage'
import Loader from 'components/Loader'
import { GridContainer } from 'components/Grid'
import Button from 'components/Button'
import isEqual from 'lodash/isEqual'

class ShowDetailPage extends React.Component {
  constructor () {
    super()

    this.getData = this.getData.bind(this)
  }

  componentDidMount () {
    this.getData()
  }

  componentDidUpdate (prevProps) {
    if (!isEqual(prevProps.match, this.props.match)) {
      this.getData()
    }
  }

  getData () {
    const { showId } = this.props.match.params
    return this.props.onLoad(showId)
  }

  render () {
    const {
      isPending,
      isErrored,
      show,
      match,
      seasons = []
    } = this.props
    const { id, networks } = show || {}

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

    if (isPending || !(seasons.length || networks)) {
      return <Loader />
    }

    if (!id) {
      return (
        <p className='text-center subheader'>
          No data found...
        </p>)
    }

    return (
      <div className='page show-detail'>
        <ShowHero
          {...show}
          isMini={!match.isExact}
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
              component={() => <ShowDetailOverview {...show} />}
            />
            <Route
              path={`${match.path}/episodes`}
              exact
              component={() => <EpisodesList
                showId={id}
                seasons={seasons}
              />}
            />
            <Route
              path={`${match.path}/episodes/s:seasonNumber(\\d+)e:episodeNumber(\\d+)`}
              exact
              component={(props) =>
                <EpisodeDetailPage
                  {...props.match.params}
                />
              }
            />
            <Route
              path={`${match.path}/next`}
              exact
              component={() =>
                <EpisodeDetailPage
                  showId={id}
                  seasonNumber={1}
                  episodeNumber={1}
                />
              }
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
  show: PropTypes.object,
  seasons: PropTypes.array,
  onLoad: PropTypes.func.isRequired
}

export default connect(
  (state, { match }) => {
    const { showId } = match.params

    return {
      isPending: isRequestPending(state, `SHOW_${showId}`),
      isErrored: isRequestErrored(state, `SHOW_${showId}`),
      show: getShow(state, showId),
      seasons: getShowSeasons(state, showId)
    }
  },
  dispatch => ({
    onLoad: showId => dispatch(shows.one(showId))
  })
)(ShowDetailPage)
