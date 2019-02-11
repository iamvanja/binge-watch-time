import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import { Switch, Route } from 'react-router-dom'
import { GridContainer } from 'components/Grid'
import HeaderPrimary from 'components/HeaderPrimary'
import HeaderPublic from 'components/HeaderPublic'
import Footer from 'components/Footer'
import PagePrivacy from 'components/PagePrivacy'
import PageTerms from 'components/PageTerms'

export const PublicLayout = ({ isLogged }) => {
  return (
    <div className='layout public sticky-footer'>
      {isLogged ? <HeaderPrimary /> : <HeaderPublic />}
      <main className='primary-content'>
        <GridContainer>
          <Switch>
            <Route exact path={`/privacy`} component={PagePrivacy} />
            <Route exact path={`/terms`} component={PageTerms} />
          </Switch>
        </GridContainer>
      </main>
      <Footer />
    </div>
  )
}

PublicLayout.propTypes = {
  isLogged: PropTypes.bool
}

export default connect(
  state => ({
    isLogged: selectors.auth.isLoggedIn(state)
  })
)(PublicLayout)
