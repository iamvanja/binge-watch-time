import React from 'react'
import { GridContainer, Cell } from 'components/Grid'

const ErrorLayout = () =>
  <div className='page error'>
    <GridContainer>
      <Cell>
        <h1>Error</h1>
        <p>Our server is experiencing errors.</p>
      </Cell>
    </GridContainer>
  </div>

export default ErrorLayout
