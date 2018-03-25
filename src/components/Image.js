import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Image extends Component {
  constructor () {
    super()
    this.state = {}
    this.handleError = this.handleError.bind(this)
  }

  handleError () {
    if (this.props.fallback) {
      this.setState({ isFailed: true })
    }
  }

  render () {
    const { fallback, ...props } = this.props
    const { isFailed } = this.state

    return (
      isFailed
        ? fallback
        // alt is a required prop of this component so the rule
        // that eslint complains about is actually satisfied
        // eslint-disable-next-line jsx-a11y/alt-text
        : <img {...props} onError={this.handleError} />
    )
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  fallback: PropTypes.any
}

export default Image
