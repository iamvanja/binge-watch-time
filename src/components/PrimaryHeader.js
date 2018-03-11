import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import classnames from 'classnames'
import Button from 'components/Button'
import { GridContainer, Grid, Cell } from 'components/Grid'
import logo from 'images/logo.svg'

class PrimaryHeader extends Component {
  constructor () {
    super()
    this.state = {
      isMobileActive: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu () {
    this.setState(({ isMobileActive }) => ({
      isMobileActive: !isMobileActive
    }))
  }
  render () {
    const { isMobileActive } = this.state
    return (
      <div className='primary-header'>
        <GridContainer>
          <Grid align='middle'>
            <Cell className='small-6 medium-shrink main-content-container'>
              <Link to='/' title='Home'>
                <img src={logo} className='logo' />
              </Link>
            </Cell>
            <Cell className='small-6 hide-for-medium text-right'>
              <Button
                className='menu-button hollow'
                onClick={this.toggleMenu}
                icon={isMobileActive ? 'cancel' : 'menu'}
              >
                MENU
              </Button>
            </Cell>
            <Cell
              className={classnames('small-12 medium-auto menu-container', {
                'is-mobile-active': isMobileActive
              })}
            >
              <nav>
                <ul className='menu'>
                  <li>
                    <NavLink to='/discover' title='Discover'>Discover</NavLink>
                  </li>
                  <li>
                    <NavLink to='/shows' title='Shows'>Shows</NavLink>
                  </li>
                  <li className='logout'>
                    <NavLink to='/auth/logout'>Logout</NavLink>
                  </li>
                </ul>
              </nav>
            </Cell>
          </Grid>
        </GridContainer>
      </div>
    )
  }
}

export default PrimaryHeader
