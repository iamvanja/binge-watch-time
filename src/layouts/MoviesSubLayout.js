import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

import MovieDetailPage from 'movies/MovieDetailPage'
import StarredShowList from 'shows/StarredShowList'

const ShowsSubLayout = ({ match }) => {
  return (
    <div className='sub-layout movies'>
      <Switch>
        <Route exact path={`${match.path}`} component={StarredShowList} />
        <Route exact path={`${match.path}/:movieId(\\d+)`} component={MovieDetailPage} />

        <Redirect to={match.url} />
      </Switch>
    </div>
  )
}

ShowsSubLayout.propTypes = {
  match: PropTypes.object.isRequired
}

export default ShowsSubLayout
