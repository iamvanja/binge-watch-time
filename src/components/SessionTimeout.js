import { Component } from 'react'
import { connect } from 'react-redux'
import { unauthorized } from 'redux/actions/auth'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { getLastCall } from 'utils/xhr'
import { SESSION_TIMEOUT_MESSAGE } from 'constants/app'

export class SessionTimeout extends Component {
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
    if (!this.state.valid) {
      this.props.onTimeout(SESSION_TIMEOUT_MESSAGE)
    }

    return null
  }
}

SessionTimeout.propTypes = {
  timeout: PropTypes.number.isRequired,
  onTimeout: PropTypes.func.isRequired
}

export default connect(
  null,
  dispatch => ({
    onTimeout: message => dispatch(unauthorized({ message }))
  })
)(withRouter(SessionTimeout))
