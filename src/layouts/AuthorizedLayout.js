import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import { Switch, Route, Redirect } from 'react-router-dom'
import HeaderPrimary from 'components/HeaderPrimary'
import Footer from 'components/Footer'
import SessionTimeout from 'components/SessionTimeout'
import NotFoundLayout from 'layouts/NotFoundLayout'
import ShowsSubLayout from 'layouts/ShowsSubLayout'
import DiscoverPage from 'discover/DiscoverPage'

export const AuthorizedLayout = ({ timeout }) => {
  return (
    <div className='layout authorized sticky-footer'>
      <HeaderPrimary />
      <main className='primary-content'>
        <Switch>
          <Redirect exact from='/' to='/discover' />
          <Route path='/discover' component={DiscoverPage} />
          <Route path='/shows' component={ShowsSubLayout} />
          <Route component={NotFoundLayout} />
        </Switch>
      </main>
      {Number.isInteger(timeout) && <SessionTimeout timeout={timeout} />}
      <Footer />
    </div>
  )
}

AuthorizedLayout.propTypes = {
  timeout: PropTypes.number
}

export default connect(
  state => ({
    timeout: selectors.auth.getTimeout(state)
  })
)(AuthorizedLayout)
