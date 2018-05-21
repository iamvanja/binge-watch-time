import { Component } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'

class Fetch extends Component {
  constructor () {
    super()
    this.state = {
      results: undefined,
      isPending: false,
      error: null
    }
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount () {
    this.refresh()
  }

  componentDidUpdate (prevProps) {
    if (!isEqual(prevProps.apiParams, this.props.apiParams)) {
      this.refresh()
    }
  }

  refresh () {
    this.setState({ isPending: true, error: null })

    Promise.resolve(this.props.api(this.props.apiParams))
      .then(results => this.setState({
        results,
        isPending: false
      }))
      .catch(error => this.setState({
        error,
        isPending: false
      }))
  }

  render () {
    const { results, isPending, error } = this.state

    return this.props.children(results, isPending, error, this.refresh)
  }
}

Fetch.propTypes = {
  api: PropTypes.func.isRequired,
  apiParams: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  children: PropTypes.func.isRequired
}

export default Fetch
