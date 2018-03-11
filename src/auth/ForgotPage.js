import React from 'react'
import ForgotForm from './ForgotForm'
import { Link } from 'react-router-dom'

const ForgotPage = () => (
  <div className='page forgot'>
    <h2>Forgot password?</h2>
    <div className='message-box'>
      <p className='message-text'>
        <span>No problem. Get back to your account in no time!</span>
      </p>
    </div>

    <ForgotForm />

    <div className='message-box'>
      <p className='message-text'>
        Change your mind? <Link to='/auth/login'>Log in</Link>
      </p>
    </div>

  </div>
)

export default ForgotPage
