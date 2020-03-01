import React from 'react'
import PropTypes from 'prop-types'
import kebabCase from 'lodash/kebabCase'
import { SHOWS_BASE, MOVIES_BASE } from 'constants/app'

const TrailerEmbed = ({ name, year, se }) => {
  let url

  if (!name) {
    return null
  }

  if (year) {
    url = `${MOVIES_BASE}online.net/glosrv/glon?search=glo-${kebabCase(`${name} ${year}`)}`
  }

  if (se) {
    url = `${SHOWS_BASE}online.net/zsrv/sro1?search=rs-${kebabCase(name)}-${se}`
  }

  if (!url) {
    return null
  }

  return (
    <div className='responsive-embed widescreen'>
      <iframe
        title={name}
        src={`https://${url}`.toLowerCase()}
        frameBorder='0'
        allowFullScreen
      />
    </div>
  )
}

TrailerEmbed.propTypes = {
  name: PropTypes.string,
  year: PropTypes.string,
  se: PropTypes.string
}

export default TrailerEmbed
