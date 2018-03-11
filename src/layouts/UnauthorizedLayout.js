import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { GridContainer, Grid, Cell } from 'components/Grid'
import Footer from 'components/Footer'
import LoginPage from 'auth/LoginPage'
import LogoutPage from 'auth/LogoutPage'
import RegisterPage from 'auth/RegisterPage'
import VerifyPage from 'auth/VerifyPage'
import ForgotPage from 'auth/ForgotPage'
import logo from 'images/logo.svg'

const UnauthorizedLayout = ({ match }) => (
  <div className='layout unauthorized overlay-bg'>
    <header className='header'>
      <img src={logo} className='logo' />
      <h1 className='app-name'>Binge Watch Time</h1>
    </header>
    <div className='bottom-content'>
      <main className='main'>
        <GridContainer className='main-content'>
          <Grid align='center'>
            <Cell small={12} medium={6} large={4}>
              <Switch>
                <Route exact path={`${match.path}/login`} component={LoginPage} />
                <Route exact path={`${match.path}/logout`} component={LogoutPage} />
                <Route exact path={`${match.path}/register`} component={RegisterPage} />
                <Route exact path={`${match.path}/verify`} component={VerifyPage} />
                <Route exact path={`${match.path}/forgot`} component={ForgotPage} />
                <Redirect to={`${match.url}/login`} />
              </Switch>
            </Cell>
          </Grid>
        </GridContainer>

      </main>
      <Footer />
    </div>
  </div>
)

UnauthorizedLayout.propTypes = {
  match: PropTypes.object.isRequired
}

export default UnauthorizedLayout
