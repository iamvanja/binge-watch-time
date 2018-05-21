import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

import ShowDetailPage from 'shows/ShowDetailPage'
import StarredShowList from 'shows/StarredShowList'

const ShowsSubLayout = ({ match }) => {
  return (
    <div className='sub-layout shows'>
      <Switch>
        <Route exact path={`${match.path}`} component={StarredShowList} />
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
