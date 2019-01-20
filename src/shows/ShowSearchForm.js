import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import debounce from 'lodash/debounce'
import api from 'api'
import Loader from 'components/Loader'
import Icon from 'components/Icon'

const ShowSearchItem = ({ id, name, originCountry }) => {
  return (
    <Link to={`/shows/${id}`} className='show-search-item'>
      {name}
      {originCountry.length
        ? ` (${originCountry.join(', ')})`
        : null
      }
    </Link>
  )
}

ShowSearchItem.defaultProps = {
  originCountry: []
}

ShowSearchItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  originCountry: PropTypes.array
}

const NoResult = () =>
  <div className='show-search-item no-results'>No shows found</div>

class ShowSearchForm extends Component {
  constructor () {
    super()
    this.state = {
      searchTerm: '',
      isLoading: false,
      results: [],
      areResultsHidden: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.load = debounce(this.load.bind(this), 500)
  }

  handleChange (e) {
    this.load(e.target.value)
  }

  handleBlur (e) {
    this.setState({ areResultsHidden: true })
  }

  handleFocus (e) {
    if (this.state.results.length) {
      this.setState({ areResultsHidden: false })
    }
  }

  load (searchTerm) {
    if (!searchTerm) {
      return this.setState({ results: [], searchTerm })
    }

    if (searchTerm !== this.state.searchTerm) {
      this.setState({
        isLoading: true,
        areResultsHidden: false
      })
      return api.shows.search(searchTerm)
        .then(data => {
          this.setState({
            searchTerm,
            results: data.results,
            isLoading: false
          })
        })
    }
  }

  render () {
    const { isLoading, results, areResultsHidden } = this.state
    return (
      <div className='show-search-form'>
        <div className='input-group'>
          <span className='input-group-label'><Icon icon='search' /></span>
          <input
            type='text'
            placeholder='Search shows...'
            autoComplete='off'
            className='input-group-field'
            onKeyUp={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
        </div>
        <div
          className={classnames('results dropdown-list', {
            'hidden': areResultsHidden,
            'is-loading': isLoading
          })}
        >
          {
            isLoading
              ? <Loader />
              : !results.length
                ? <NoResult />
                : results.map(show =>
                  <ShowSearchItem key={show.id} {...show} />
                )
          }
        </div>
      </div>
    )
  }
}

export default ShowSearchForm
