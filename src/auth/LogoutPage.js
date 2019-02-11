import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import { Link } from 'react-router-dom'
import { logout } from 'redux/actions/auth'
import LoadingResults from 'components/Loader'
import Icon from 'components/Icon'

export class LogoutPage extends React.Component {
  componentDidMount () {
    this.props.onLogout()
  }

  render () {
    const { isLogged } = this.props
    return (
      <div className='page logout'>
        <h1>{isLogged ? 'Logging Out' : 'Logged Out'}</h1>
        {isLogged
          ? <LoadingResults />
          : (
            <div>
              <div className='message-box'>
                <p className='message-text'>
                  <Icon icon='ok' />
                  <span>You are successfully logged out.</span>
                </p>
              </div>
              <Link className='button expanded large' to='/auth/login'>
                Login Page
              </Link>
            </div>
          )
        }
      </div>
    )
  }
}

LogoutPage.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default connect(
  state => ({
    isLogged: selectors.auth.isLoggedIn(state)
  }),
  dispatch => ({
    onLogout: () => dispatch(logout())
  })
)(LogoutPage)
