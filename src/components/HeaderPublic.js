import React from 'react'
import logo from 'images/logo.svg'
import { Link } from 'react-router-dom'

const HeaderPublic = () =>
  <header className='header-public'>
    <Link to='/'>
      <img src={logo} alt='Logo' className='logo' />
    </Link>
    <h1 className='app-name'>Binge Watch Time</h1>
  </header>

export default HeaderPublic
