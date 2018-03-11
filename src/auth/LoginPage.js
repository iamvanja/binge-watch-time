import React from 'react'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'

const LoginPage = () => (
  <div className='page login'>
    <h2>Hi. Sign in.</h2>
    <LoginForm />

    <div className='message-box'>
      <p className='message-text'>
        <Link to='/auth/forgot'>Forgot your password?</Link>
      </p>
      <p className='message-text'>
        Don't have an account? <Link to='/auth/register'>Register</Link>
      </p>
    </div>
  </div>
)

export default LoginPage
