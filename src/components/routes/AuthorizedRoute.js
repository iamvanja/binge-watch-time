import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { me } from 'actions/auth'
import { isAuthPending, isLoggedIn } from 'reducers'
import LoaderPage from 'components/LoaderPage'

export class AuthorizedRoute extends React.Component {
  componentWillMount () {
    if (this.props.isLogged === null) {
      this.props.onCheckAuth()
    }
  }

  render () {
    const { component: Component, isPending, isLogged, ...rest } = this.props

    return (
      <Route {...rest} render={props => {
        if (isPending || isLogged === null) {
          return <LoaderPage />
        }

        if (!isLogged) {
          // todo: page
          return 'You are not authorized.'
        }

        return <Component {...props} />
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
  ]).isRequired,
  onCheckAuth: PropTypes.func.isRequired
}

export default connect(
  state => ({
    isPending: isAuthPending(state),
    isLogged: isLoggedIn(state)
  }),
  dispatch => ({
    onCheckAuth: () => dispatch(me())
  })
)(AuthorizedRoute)
