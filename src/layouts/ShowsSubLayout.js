import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

import ShowDetailPage from 'shows/ShowDetailPage'

const ShowListPage = () =>
  <div>ShowListPage</div>

const ShowsSubLayout = ({ match }) => {
  return (
    <div className='sub-layout shows'>
      <Switch>
        <Route exact path={`${match.path}`} component={ShowListPage} />
        <Route path={`${match.path}/:showId(\\d+)`} component={ShowDetailPage} />
        <Redirect to={match.url} />
      </Switch>
    </div>
  )
}

ShowsSubLayout.propTypes = {
  match: PropTypes.object.isRequired
}

export default ShowsSubLayout
