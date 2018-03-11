import React from 'react'
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
              <a href='#'>
                PRIVACY POLICY
              </a>
            </li>
            <li>
              <a href='#'>
                TERMS OF USE
              </a>
            </li>
            <li>
              <a href='#'>
                CONTACT US
              </a>
            </li>
          </ul>
        </Cell>
      </Grid>
    </GridContainer>
  </footer>

export default Footer
