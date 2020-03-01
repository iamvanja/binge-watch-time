import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as starredMovies from 'redux/actions/starredMovies'
import * as lists from 'redux/actions/movies/lists'
import * as ui from 'redux/actions/ui'
import * as selectors from 'redux/reducers/selectors'
import { Link } from 'react-router-dom'
import Loader from 'components/Loader'
import StarredMovieListItem from './StarredMovieListItem'
import { GridContainer, Grid, Cell } from 'components/Grid'
import get from 'lodash/get'

class StarredMovieList extends Component {
  constructor (props) {
    super(props)

    this.handleListChange = this.handleListChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
  }

  componentDidMount () {
    this.props.loadItemsPerListId(this.props.currentListId)
  }

  sortItems (shows, currentSort) {
    const [path, order] = currentSort.split('-')

    return shows
      .sort((a, b) => {
        const varA = get(a, path, '')
        const varB = get(b, path, '')

        if (path === 'nextEpisodeToAir.airDate') {
          if (!varA) {
            return 1
          }
          if (!varB) {
            return -1
          }
        } else {
          if (!varA || !varB) {
            return 0
          }
        }

        const comparison = varA.localeCompare(varB)

        return order === 'desc'
          ? comparison * -1
          : comparison
      })
  }

  renderContent () {
    const { isPending, isErrored, items = [] } = this.props
    const sortedItems = this.sortItems(items, this.props.currentSort)

    if (isPending) {
      return <Loader />
    }

    if (isErrored) {
      return (
        <div className='text-center'>
          <p className='subheader'>
            Error while loading starred movies...
          </p>
        </div>
      )
    }

    return sortedItems.length
      ? (
        <Fragment>
          {sortedItems.map(item =>
            <StarredMovieListItem key={item.id} {...item} />)
          }
        </Fragment>
      )
      : (
        <p className='text-center subheader lead'>
          No starred movies in this list. <Link to='/discover/movies'>Discover some</Link>.
        </p>
      )
  }

  renderListSelect () {
    return (
      <Cell small={6} medium={3}>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          onChange={this.handleListChange}
          value={this.props.currentListId}
        >
          {Object.keys(this.props.lists || {}).map(listId => (
            <option value={listId} key={listId}>
              {this.props.lists[listId]}
            </option>
          ))}
        </select>

      </Cell>
    )
  }

  renderListOrder () {
    return (
      <Cell small={6} medium={3}>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          onChange={this.handleSortChange}
          value={this.props.currentSort}
        >
          <option value='name-asc'>Name A-Z</option>
          <option value='name-desc'>Name Z-A</option>
          <option value='nextEpisodeToAir.airDate-asc'>Airing next</option>
          <option value='nextEpisodeToAir.airDate-desc'>Airing last</option>
        </select>
      </Cell>
    )
  }

  handleListChange (e) {
    const newListId = parseInt(e.target.value, 10)
    this.props.onListChange(newListId)
    this.props.loadItemsPerListId(newListId)
  }

  handleSortChange (e) {
    this.props.onSortChange(e.target.value)
  }

  render () {
    return (
      <div className='shows-starred-list'>
        <GridContainer>
          <Grid gutters='margin' align='justify'>
            {this.renderListOrder()}
            {this.renderListSelect()}
          </Grid>
        </GridContainer>

        {this.renderContent()}
      </div>
    )
  }
}

StarredMovieList.propTypes = {
  isPending: PropTypes.bool,
  isErrored: PropTypes.bool,
  loadItemsPerListId: PropTypes.func.isRequired,
  lists: PropTypes.objectOf(PropTypes.string),
  onListChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  currentListId: PropTypes.number,
  currentSort: PropTypes.oneOf([
    'name-asc',
    'name-desc',
    'nextEpisodeToAir.airDate-asc',
    'nextEpisodeToAir.airDate-desc'
  ]),
  items: PropTypes.array
}

const getUiState = (methodName, state, listId) => (
  selectors.ui[methodName](state, lists.fetch()) ||
  selectors.ui[methodName](state, starredMovies.fetchByListId(listId))
)

export default connect(
  state => {
    const currentListId = selectors.ui.getCurrentListId(state, 'movies')

    return {
      isPending: getUiState('isRequestPending', state, currentListId),
      isErrored: getUiState('isRequestErrored', state, currentListId),
      lists: selectors.moviesLists.getLists(state),
      currentListId,
      currentSort: selectors.ui.getCurrentSort(state),
      items: selectors.getStarredMoviesByListId(state, currentListId)
    }
  },
  {
    loadItemsPerListId: starredMovies.fetchByListId,
    onListChange: listId => ui.setCurrentList(listId, 'movies'),
    onSortChange: ui.setCurrentSort
  }
)(StarredMovieList)
