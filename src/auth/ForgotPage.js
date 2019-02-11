import React from 'react'
import PropTypes from 'prop-types'
import PasswordResetRequestForm from './PasswordResetRequestForm'
import PasswordResetForm from './PasswordResetForm'
import { Link } from 'react-router-dom'

const ForgotPage = ({ isVerify }) => (
  <div className='page forgot'>
    <h2>Forgot password?</h2>
    <div className='message-box'>
      <p className='message-text'>
        <span>No problem. Get back to your account in no time!</span>
      </p>
    </div>

    {isVerify
      ? <PasswordResetForm />
      : <PasswordResetRequestForm />
    }

    {isVerify
      ? null
      : (
        <div className='message-box'>
          <p className='message-text'>
            Changed your mind? <Link to='/auth/login'>Log in</Link>
          </p>
        </div>
      )
    }
  </div>
)

ForgotPage.propTypes = {
  isVerify: PropTypes.bool
}

export default ForgotPage
