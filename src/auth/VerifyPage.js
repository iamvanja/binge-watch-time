import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import classnames from 'classnames'
import api from 'api'
import Loader from 'components/Loader'
import InlineNotice from 'components/InlineNotice'

export class VerifyPage extends React.Component {
  constructor () {
    super()
    this.state = {
      title: 'Verifying Email',
      verified: null,
      error: null
    }
  }

  componentDidMount () {
    const { email, verificationCode } = queryString.parse(
      window.location.search
    )
    if (!email || !verificationCode) {
      this.setState({
        title: 'Verification Failed',
        error: 'This request is not formatted correctly.'
      })
      return
    }

    Promise.resolve(this.props.onVerify({ email, verificationCode })
      .then(() => this.setState({
        title: 'Email Verified',
        verified: true
      }))
      .catch(error =>
        this.setState({
          title: 'Verification Failed',
          error: error.data.message || error.statusText,
          verified: false
        })
      )
    )
  }

  render () {
    const { title, verified, error } = this.state
    const isLoading = verified === null && !error

    return (
      <div className='page verify'>
        <h2>{title}</h2>
        <div className='message-box'>
          {isLoading && <Loader />}
          {error && <InlineNotice type='alert'>{error}</InlineNotice>}
          {verified === true &&
            <InlineNotice type='success'>Success!</InlineNotice>
          }
          <Link
            to='/auth/login'
            className={classnames('button expanded large', {
              disabled: isLoading
            })}
            onClick={e => isLoading ? e.preventDefault() : null}
          >
            {verified === true && 'Go back to '}
            Login Page
          </Link>
        </div>
      </div>
    )
  }
}

VerifyPage.propTypes = {
  onVerify: PropTypes.func
}

export default connect(
  null,
  dispatch => ({
    onVerify: api.auth.verify
  })
)(VerifyPage)
