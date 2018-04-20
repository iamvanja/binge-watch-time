import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import api from 'api'
import ShowHero from './ShowHero'
import ShowDetailOverview from './ShowDetailOverview'
import EpisodesList from './EpisodesList'
import EpisodeDetailPage from './EpisodeDetailPage'
import Loader from 'components/Loader'
import { GridContainer } from 'components/Grid'
import Button from 'components/Button'
import Fetch from 'components/Fetch'

const ShowDetailPage = ({ match }) => {
  const { showId } = match.params

  if (!showId) {
    return null
  }

  return (
    <Fetch api={api.shows.one} apiParams={showId}>
      {(show = {}, isPending, error, api) => {
        const { id, seasons } = show

        if (isPending) {
          return <Loader />
        }

        if (error) {
          return (
            <div className='text-center'>
              <p className='subheader'>
                Error while loading the show...
              </p>
              <Button onClick={api} className='hollow'>
                Try loading again
              </Button>
            </div>
          )
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
      }}
    </Fetch>
  )
}

ShowDetailPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      showId: PropTypes.string
    }),
    isExact: PropTypes.bool,
    url: PropTypes.string,
    path: PropTypes.string
  }).isRequired
}

export default ShowDetailPage
