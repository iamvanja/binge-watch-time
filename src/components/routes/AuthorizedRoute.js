import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import api from 'api'
import LoaderPage from 'components/LoaderPage'

export class AuthorizedRoute extends React.Component {
  componentWillMount () {
    if (this.props.isPending) {
      api.auth.me()
    }
  }

  render () {
    const { component: Component, isPending, isLogged, ...rest } = this.props

    return (
      <Route {...rest} render={props => {
        if (isPending) {
          return <LoaderPage />
        }
        const query = queryString.stringify({
          next: props.location.pathname + props.location.search
        })

        return isLogged
          ? <Component {...props} />
          : <Redirect to={`/auth/login?${query}`} />
      }} />
    )
  }
}

AuthorizedRoute.propTypes = {
  isPending: PropTypes.bool,
  isLogged: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired
}

const stateToProps = ({ loggedUserState }) => ({
  isPending: loggedUserState.isPending,
  isLogged: loggedUserState.isLogged
})

export default connect(stateToProps)(AuthorizedRoute)
