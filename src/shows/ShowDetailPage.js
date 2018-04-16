import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import api from 'api'
import ShowHero from './ShowHero'
import ShowDetailOverview from './ShowDetailOverview'
import ShowEpisodesList from './ShowEpisodesList'
import Loader from 'components/Loader'
import { GridContainer } from 'components/Grid'
import Button from 'components/Button'
import Fetch from 'components/Fetch'

const Stub = () =>
  <div>Stub</div>

const ShowDetailPage = ({ match }) => {
  let { showId } = match.params
  if (!showId) {
    return null
  }

  showId = parseInt(showId, 10)

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
                <li><NavLink to={`${match.url}/episodes/next`} exact>Next</NavLink></li>
                <li><NavLink to={match.url} exact>Overview</NavLink></li>
                <li><NavLink to={`${match.url}/episodes`} exact>Episodes</NavLink></li>
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
                  component={() => <ShowEpisodesList
                    showId={id}
                    seasons={seasons}
                  />}
                />
                <Route
                  path={`${match.path}/episodes/next`}
                  exact
                  component={Stub}
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
  match: PropTypes.object.isRequired
}

export default ShowDetailPage
