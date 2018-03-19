import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrimaryHeader from 'components/PrimaryHeader'
import Footer from 'components/Footer'
import SessionTimeout from 'components/SessionTimeout'
import NotFoundLayout from 'layouts/NotFoundLayout'
import { GridContainer } from 'components/Grid'
import DiscoverPage from 'discover/DiscoverPage'

const Shows = () =>
  <div className='page my-shows'>
    <h1>Shows</h1>
  </div>

export const AuthorizedLayout = ({ timeout }) => {
  return (
    <div className='layout authorized'>
      <PrimaryHeader />
      <main className='primary-content'>
        <GridContainer>
          <Switch>
            <Redirect exact from='/' to='/discover' />
            <Route path='/discover' component={DiscoverPage} />
            <Route exact path='/shows' component={Shows} />
            <Route component={NotFoundLayout} />
          </Switch>
        </GridContainer>
      </main>
      { Number.isInteger(timeout) && <SessionTimeout timeout={timeout} /> }
      <Footer />
    </div>
  )
}

AuthorizedLayout.propTypes = {
  timeout: PropTypes.number
}
const stateToProps = ({ loggedUserState }) => ({
  timeout: loggedUserState.timeout
})

export default connect(stateToProps)(AuthorizedLayout)
