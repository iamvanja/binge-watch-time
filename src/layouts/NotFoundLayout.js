import React from 'react'
import PropTypes from 'prop-types'
import { GridContainer, Cell } from 'components/Grid'

const NotFoundLayout = ({ location }) => (
  <div className='page not-found'>
    <GridContainer>
      <Cell>
        <h1>404 Not Found</h1>
        <p>No match found for <code>{location.pathname}</code></p>
      </Cell>
    </GridContainer>
  </div>
)

NotFoundLayout.propTypes = {
  location: PropTypes.object.isRequired
}

export default NotFoundLayout
