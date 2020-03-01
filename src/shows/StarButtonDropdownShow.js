import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import * as selectors from 'redux/reducers/selectors'
import * as starredShows from 'redux/actions/starredShows'
import * as ui from 'redux/actions/ui'
import Button from 'components/Button'
import Icon from 'components/Icon'
import { Grid, Cell } from 'components/Grid'

class StarButtonDropdownShow extends Component {
  constructor () {
    super()

    this.state = {
      isOpen: false
    }

    this.toggleOpen = this.toggleOpen.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount () {
    document.addEventListener('click', this.handleClickOutside, false)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClickOutside, false)
  }

  toggleOpen (forceState) {
    this.setState((state, props) => ({
      isOpen: forceState !== undefined ? forceState : !state.isOpen
    }))
  }

  handleClickOutside (e) {
    if (!this.node.contains(e.target)) {
      this.toggleOpen(false)
    }
  }

  handleClick (listId) {
    const { isActive } = this
    const { showId, inListId, onActive, onInactive, onListChange } = this.props
    this.toggleOpen(false)

    if (isActive && inListId === listId) {
      onInactive(showId, listId)
    } else {
      onActive(showId, listId)

      onListChange(listId)
    }
  }

  get isActive () {
    return !!this.props.inListId
  }

  get mainId () {
    const { inListId, uiListId, lists } = this.props

    return parseInt(inListId || uiListId || Object.keys(lists)[0], 10)
  }

  render () {
    const { id, inListId, lists, isLoading } = this.props
    const { isOpen } = this.state
    const { isActive } = this

    return (
      <div
        ref={node => { this.node = node }}
        className={classnames('button-dropdown', {
          'is-loading': isLoading
        })}
      >

        <div className='button-group' id={id}>
          <Button
            className={classnames('main-button', {
              'is-active': isActive,
              'hollow': !isActive
            })}
            onClick={() => this.handleClick(this.mainId)}
            disabled={isLoading}
          >
            <Grid>
              <Cell
                alignSelf='middle'
                className='shrink show-for-medium'
              >
                <div className='icon-wrap'>
                  <Icon icon='star' />
                </div>
              </Cell>
              <Cell
                alignSelf='middle'
                className='auto'
              >
                {isActive
                  ? lists[inListId]
                  : (

                    <Fragment>
                      Add To List
                      <br />
                      <i>{lists[this.mainId]}</i>
                    </Fragment>

                  )
                }
              </Cell>
            </Grid>
          </Button>
          <Button
            className='dropdown arrow-only hollow'
            onClick={() => this.toggleOpen()}
            disabled={isLoading}
          >
            <span className='show-for-sr'>Show menu</span>
          </Button>

        </div>
        <div className={classnames('dropdown-content dropdown-list', {
          'hidden': !isOpen
        })}
        >
          <ul
            role='menu'
            className='no-bullet'
            aria-labelledby={id}
          >
            {Object.keys(lists).map(listId =>
              parseInt(listId, 10) !== this.mainId
                ? (
                  <li
                    role='presentation'
                    onClick={() => this.handleClick(listId)}
                    onKeyDown={() => this.handleClick(listId)}
                    key={listId}
                    className='search-item'
                  >
                    <span role='menuitem'>{lists[listId]}</span>
                  </li>
                )
                : null
            )}
          </ul>
        </div>
      </div>
    )
  }
}

StarButtonDropdownShow.propTypes = {
  inListId: PropTypes.number,
  uiListId: PropTypes.number,
  showId: PropTypes.number,
  onActive: PropTypes.func.isRequired,
  onInactive: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, // component element ID
  isLoading: PropTypes.bool,
  lists: PropTypes.objectOf(PropTypes.string).isRequired,
  onListChange: PropTypes.func.isRequired
}

export default connect(
  (state, { showId }) => ({
    isLoading: (
      selectors.ui.isRequestPending(state, starredShows.star(showId)) ||
      selectors.ui.isRequestPending(state, starredShows.unstar(showId))
    ),
    inListId: selectors.starredShows.getListIdByShowId(state, showId),
    lists: selectors.showsLists.getLists(state),
    uiListId: selectors.ui.getCurrentListId(state)
  }),
  {
    onActive: starredShows.star,
    onInactive: starredShows.unstar,
    onListChange: ui.setCurrentList
  }
)(StarButtonDropdownShow)
