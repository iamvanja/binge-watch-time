import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { getLastCall } from 'utils/xhr'

class SessionTimeout extends Component {
  constructor () {
    super()
    this.state = {
      valid: true
    }
    this.createWatcher = this.createWatcher.bind(this)
  }

  createWatcher (timeout) {
    if (this._interval) {
      clearInterval(this._interval)
    }
    this._interval = setInterval(() => {
      if (getLastCall() > timeout) {
        this.setState({ valid: false })
      }
    }, 1000)
  }

  componentWillMount () {
    this.createWatcher(this.props.timeout)
  }

  componentWillReceiveProps (nextProps) {
    this.createWatcher(nextProps.timeout)
  }

  componentWillUnmount () {
    clearInterval(this._interval)
  }

  render () {
    if (this.state.valid) {
      return null
    }
    const { pathname, search } = this.props.location
    const query = queryString.stringify({ next: pathname + search })
    return <Redirect to={`/auth/login?${query}`} />
  }
}

SessionTimeout.propTypes = {
  timeout: PropTypes.number.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(SessionTimeout)
