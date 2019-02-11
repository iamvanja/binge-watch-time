import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import * as selectors from 'redux/reducers/selectors'
import { setMobileMenuOpen } from 'redux/actions/ui'
import classnames from 'classnames'
import Button from 'components/Button'
import { GridContainer, Grid, Cell } from 'components/Grid'
import logo from 'images/logo.svg'
import ShowSearchForm from 'shows/ShowSearchForm'

class HeaderPrimary extends Component {
  constructor () {
    super()

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu () {
    this.props.onMobileMenuChange(!this.props.isMobileMenuActive)
  }

  render () {
    const { isMobileMenuActive } = this.props

    return (
      <div className='header-primary'>
        <GridContainer>
          <Grid align='middle'>
            <Cell small={6} medium='shrink' className='main-content-container'>
              <Link to='/' title='Home'>
                <img src={logo} alt='Logo' className='logo' />
              </Link>
            </Cell>
            <Cell small={6} className='hide-for-medium text-right'>
              <Button
                className='menu-button hollow'
                onClick={this.toggleMenu}
                icon={isMobileMenuActive ? 'cancel' : 'menu'}
              >
                MENU
              </Button>
            </Cell>
            <Cell
              small={12}
              medium='auto'
              className={classnames('menu-container', {
                'is-mobile-active': isMobileMenuActive
              })}
            >
              <nav>
                <ul className='menu'>
                  <li className='border'>
                    <NavLink to='/discover' title='Discover'>Discover</NavLink>
                  </li>
                  <li className='border'>
                    <NavLink to='/shows' title='Shows'>Shows</NavLink>
                  </li>
                  <li className='search'>
                    <ShowSearchForm />
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

HeaderPrimary.propTypes = {
  isMobileMenuActive: PropTypes.bool,
  onMobileMenuChange: PropTypes.func.isRequired
}

export default withRouter(connect(
  state => ({
    isMobileMenuActive: selectors.ui.isMobileMenuOpen(state)
  }),
  {
    onMobileMenuChange: setMobileMenuOpen
  }
)(HeaderPrimary))
