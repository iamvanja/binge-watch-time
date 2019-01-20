import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as starredShows from 'actions/starredShows'
import * as ui from 'actions/ui'
import {
  getStarredIdsByListId,
  isRequestPending,
  isRequestErrored,
  getShowLists,
  getCurrentListId
} from 'reducers'
import { Link } from 'react-router-dom'
import Loader from 'components/Loader'
import Button from 'components/Button'
import StarredShowListItem from './StarredShowListItem'
import Infinite from 'react-infinite'
import { GridContainer, Grid, Cell } from 'components/Grid'

class StarredShowList extends Component {
  constructor (props) {
    super(props)

    this.handleListChange = this.handleListChange.bind(this)
  }

  renderContent () {
    const { isPending, isErrored, onShowsLoad, getIds } = this.props
    const ids = getIds(this.props.currentListId)

    if (isPending) {
      return <Loader />
    }

    if (isErrored) {
      return (
        <div className='text-center'>
          <p className='subheader'>
            Error while loading starred shows...
          </p>
          <Button onClick={onShowsLoad} className='hollow'>
            Try loading again
          </Button>
        </div>
      )
    }

    return ids.length
      ? (
        <Infinite useWindowAsScrollContainer elementHeight={140}>
          {ids.map(id => <StarredShowListItem key={id} id={id} />)}
        </Infinite>
      )
      : (
        <p className='text-center subheader lead'>
          No starred shows in this list. <Link to='/discover'>Discover some</Link>.
        </p>
      )
  }

  renderShowsListSelect () {
    return (
      <GridContainer>
        <Grid align='right'>
          <Cell small={12} medium={3}>
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
        </Grid>
      </GridContainer>
    )
  }

  handleListChange (e) {
    this.props.onListChange(parseInt(e.target.value, 10))
  }

  render () {
    return (
      <div className='shows-starred-list'>
        {this.renderShowsListSelect()}
        {this.renderContent()}
      </div>
    )
  }
}

StarredShowList.propTypes = {
  isPending: PropTypes.bool,
  isErrored: PropTypes.bool,
  onShowsLoad: PropTypes.func.isRequired,
  getIds: PropTypes.func.isRequired,
  lists: PropTypes.objectOf(PropTypes.string),
  onListChange: PropTypes.func.isRequired,
  currentListId: PropTypes.number
}

export default connect(
  state => ({
    isPending: isRequestPending(state, starredShows.fetch()),
    isErrored: isRequestErrored(state, starredShows.fetch()),
    getIds: listId => getStarredIdsByListId(state, listId),
    lists: getShowLists(state),
    currentListId: getCurrentListId(state)
  }),
  dispatch => ({
    onShowsLoad: () => dispatch(starredShows.fetch()),
    onListChange: listId => dispatch(ui.setCurrentList(listId))
  })
)(StarredShowList)
