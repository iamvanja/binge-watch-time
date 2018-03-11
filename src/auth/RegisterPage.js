import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'

const LoginPage = () => (
  <div className='page register'>
    <h2>Hi! Register.</h2>
    <RegisterForm />

    <div className='text-center'>
      <strong>
        Already have an account? <Link to='/auth/login'>Login</Link>
      </strong>
    </div>
  </div>
)

export default LoginPage
