import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrimaryHeader from 'components/PrimaryHeader'
import Footer from 'components/Footer'
import SessionTimeout from 'components/SessionTimeout'
import NotFoundLayout from 'layouts/NotFoundLayout'
import { GridContainer } from 'components/Grid'

const DiscoverPage = () =>
  <div className='page browse'>
    <h1>Discover</h1>

    <h2>New</h2>
    <h2>Popular</h2>
    <h2>Action</h2>
    <h2>Comedy</h2>
    .....

  </div>

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
            <Route path='/shows' component={Shows} />
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
