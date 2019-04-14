import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { renderable } from 'constants/propTypes'
import classnames from 'classnames'

class Image extends Component {
  constructor () {
    super()
    this.state = {
      isLoaded: false,
      isFailed: null
    }
  }

  componentDidMount () {
    this.loadImage()
  }

  loadImage () {
    const image = new window.Image()
    image.onload = () => {
      this.setState({ isLoaded: true })
    }
    image.onerror = () => {
      this.setState({ isFailed: true })
    }
    image.src = this.props.src
  }

  renderImage (isLoaded) {
    const { placeholderSrc, src, alt, className, ...rest } = this.props
    const computedProps = {
      src: isLoaded ? src : placeholderSrc,
      className: classnames(className, {
        'bwt-main-image': isLoaded,
        'bwt-preview-image': !isLoaded
      })
    }

    return (
      <img
        {...rest}
        {...computedProps}
        alt={alt}
      />
    )
  }

  render () {
    return (
      <Fragment>
        {this.state.isFailed
          ? this.props.fallback
          : this.renderImage(this.state.isLoaded)
        }
      </Fragment>
    )
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  placeholderSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  fallback: renderable
}

export default Image
