import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import debounce from 'lodash/debounce'
import api from 'api'
import Loader from 'components/Loader'
import Icon from 'components/Icon'
import { getYearFromDateString } from 'utils/string'

const iconNameByType = {
  movie: 'cinema',
  show: 'tv'
}

const SearchItem = ({ type, id, name, year }) => (
  <Link
    to={`/${type}s/${id}`}
    className='search-item'
    title={type.toUpperCase()}
  >
    <Icon icon={iconNameByType[type]} />
    {name} {year ? `(${year})` : ''}
  </Link>
)

SearchItem.propTypes = {
  type: PropTypes.oneOf(['movie', 'show']),
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.string
}

const NoResult = () =>
  <div className='search-item no-results'>Nothing found</div>

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

  mergeShowsAndMovies (shows, movies) {
    return [
      ...shows.map(show => ({
        ...show,
        year: getYearFromDateString(show.firstAirDate),
        type: 'show'
      })),
      ...movies.map(movie => ({
        ...movie,
        name: movie.title,
        year: getYearFromDateString(movie.releaseDate),
        type: 'movie'
      }))
    ]
      .sort((a, b) => b.popularity - a.popularity)
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

      return Promise.all([
        api.shows.search(searchTerm),
        api.movies.search(searchTerm)
      ])
        .then(([showData, movieData]) => {
          this.setState({
            searchTerm,
            results: this.mergeShowsAndMovies(
              showData.results,
              movieData.results
            ),
            isLoading: false
          })
        })
    }
  }

  render () {
    const { isLoading, results, areResultsHidden } = this.state
    return (
      <div className='search-form'>
        <div className='input-group'>
          <span className='input-group-label'><Icon icon='search' /></span>
          <input
            type='text'
            placeholder='Search...'
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
          {isLoading
            ? <Loader />
            : !results.length
              ? <NoResult />
              : results.map(item => <SearchItem key={item.id} {...item} />)
          }
        </div>
      </div>
    )
  }
}

export default ShowSearchForm
