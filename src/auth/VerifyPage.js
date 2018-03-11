import React from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import api from 'api'
import Loader from 'components/Loader'
import InlineNotice from 'components/InlineNotice'

class VerifyPage extends React.Component {
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

    api.auth.verify({ email, verificationCode })
      .then(() => this.setState({
        title: 'Email Verified',
        verified: true
      }))
      .catch(error =>
        this.setState({
          title: 'Verification Failed',
          error: error.message,
          verified: false
        })
      )
  }

  render () {
    const { title, verified, error } = this.state

    return (
      <div className='page verify'>
        <h2>{title}</h2>
        <div className='message-box'>
          {verified === null && !error && <Loader />}
          {error && <InlineNotice type='alert'>{error}</InlineNotice>}
          <Link to='/auth/login' className='button expanded large'>Login Page</Link>
        </div>
      </div>
    )
  }
}

export default VerifyPage
