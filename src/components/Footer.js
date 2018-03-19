import React from 'react'
import { Link } from 'react-router-dom'
import { GridContainer, Grid, Cell } from 'components/Grid'

const Footer = () =>
  <footer className='footer'>
    <GridContainer>
      <Grid align='middle'>
        <Cell small={12} medium={3} className='copy'>
          &copy; Binge Watch Time
        </Cell>
        <Cell small={12} medium={9}>
          <ul className='menu'>
            <li>
              <Link to='/privacy'>PRIVACY POLICY</Link>
            </li>
            <li>
              <Link to='/terms'>TERMS OF USE</Link>
            </li>
            <li>
              <a href='https://vanja.gavric.org/#contact'>CONTACT</a>
            </li>
          </ul>
        </Cell>
      </Grid>
    </GridContainer>
  </footer>

export default Footer
