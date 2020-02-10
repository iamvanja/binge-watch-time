import React from 'react'
import PropTypes from 'prop-types'

const YouTubeEmbed = ({ video }) =>
  <div className='responsive-embed widescreen'>
    <iframe
      title={video.name || video.id || video.key}
      src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
      frameBorder='0'
      allowFullScreen
    />
  </div>

YouTubeEmbed.propTypes = {
  video: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    key: PropTypes.string.isRequired
  }).isRequired
}

export default YouTubeEmbed
