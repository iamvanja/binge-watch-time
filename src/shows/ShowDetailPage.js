import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import api from 'api'
import ShowHero from './ShowHero'
import ShowDetailOverview from './ShowDetailOverview'
import ShowEpisodesList from './ShowEpisodesList'
import Loader from 'components/Loader'
import { GridContainer } from 'components/Grid'

const Stub = () =>
  <div>Stub</div>

class ShowDetailPage extends Component {
  constructor () {
    super()
    this.state = {
      isPending: true,
      isError: false,
      show: {}
    }
  }

  componentDidMount () {
    this.loadData(this.props.match.params.showId)
  }

  componentWillReceiveProps (nextProps) {
    const nextShowId = nextProps.match.params.showId
    if (this.props.match.params.showId !== nextShowId) {
      this.loadData(nextShowId)
    }
  }

  loadData (showId) {
    this.setState({ isPending: true, isError: false })
    api.shows.one(showId)
      .then(show => {
        this.setState({ show, isPending: false })
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        this.setState({ isPending: false, isError: true })
      })
  }

  render () {
    const { show, isPending } = this.state
    const { id, seasons } = show
    const { match } = this.props

    if (isPending) {
      return <Loader />
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
  }
}

ShowDetailPage.propTypes = {
  match: PropTypes.object.isRequired
}

export default ShowDetailPage
