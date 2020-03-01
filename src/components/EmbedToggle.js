import React, { Component } from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import Button from 'components/Button'
import YouTubeEmbed from 'components/YouTubeEmbed'

class EmbedToggle extends Component {
  constructor () {
    super()
    this.state = {
      isEmbedShown: false
    }

    this.showEmbed = this.showEmbed.bind(this)
  }

  showEmbed () {
    this.setState({ isEmbedShown: true })
  }

  render () {
    const { videos } = this.props
    const { isEmbedShown } = this.state
    const youtubeVideo = videos.length && find(videos, {
      site: 'YouTube'
    })

    if (!youtubeVideo) {
      return null
    }

    return (
      isEmbedShown
        ? <YouTubeEmbed video={youtubeVideo} />
        : (
          <Button
            icon='cinema'
            className='expanded hollow'
            onClick={this.showEmbed}
          >
            Play Trailer
          </Button>
        )
    )
  }
}

EmbedToggle.defaultProps = {
  videos: []
}

EmbedToggle.propTypes = {
  videos: PropTypes.array
}

export default EmbedToggle
