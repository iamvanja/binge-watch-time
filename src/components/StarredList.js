import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { renderable, stringOrNumber } from 'constants/propTypes'
import { Link } from 'react-router-dom'
import Loader from 'components/Loader'
import { GridContainer, Grid, Cell } from 'components/Grid'
import get from 'lodash/get'
import Select from './Select'

class StarredList extends Component {
  constructor (props) {
    super(props)

    this.handleListChange = this.handleListChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
  }

  componentDidMount () {
    this.props.loadItemsPerListId(this.props.currentListId)
  }

  sortItems (items, currentSort) {
    const [path, order] = currentSort.split('-')

    return items
      .sort((a, b) => {
        const varA = get(a, path, '')
        const varB = get(b, path, '')

        if (
          path === 'nextEpisodeToAir.airDate' ||
          path === 'releaseDate'
        ) {
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

  handleListChange (e) {
    const newListId = parseInt(e.target.value, 10)
    this.props.onListChange(newListId)
    this.props.loadItemsPerListId(newListId)
  }

  handleSortChange (e) {
    this.props.onSortChange(e.target.value)
  }

  get listOptions () {
    const { lists } = this.props

    return Object.keys(lists)
      .reduce((options, id) => {
        return options.concat({ value: id, label: lists[id] })
      }, [])
  }

  render () {
    const { listOptions } = this

    return (
      <div className='starred-list'>
        <GridContainer>
          <Grid gutters='margin' align='justify'>
            <Cell small={6} medium={3}>
              <Select
                onChange={this.handleSortChange}
                value={this.props.currentSort}
                options={this.props.sortOptions}
              />
            </Cell>

            <Cell small={6} medium={3}>
              <Select
                onChange={this.handleListChange}
                value={this.props.currentListId}
                options={listOptions}
              />
            </Cell>
          </Grid>
        </GridContainer>

        {(() => {
          const {
            isPending,
            isErrored,
            items = [],
            itemComponent: ItemComponent,
            entityNamePlural
          } = this.props
          const sortedItems = this.sortItems(items, this.props.currentSort)

          if (isPending) {
            return <Loader />
          }

          if (isErrored) {
            return (
              <div className='text-center'>
                <p className='subheader'>
                  Error while loading starred {entityNamePlural}...
                </p>
              </div>
            )
          }

          return sortedItems.length
            ? sortedItems.map(item => <ItemComponent key={item.id} {...item} />)
            : (
              <p className='text-center subheader lead'>
                No starred {entityNamePlural} in this list. <Link to={`/discover/${entityNamePlural}`}>Discover some</Link>.
              </p>
            )
        })()}
      </div>
    )
  }
}

StarredList.propTypes = {
  isPending: PropTypes.bool,
  isErrored: PropTypes.bool,
  loadItemsPerListId: PropTypes.func.isRequired,
  lists: PropTypes.objectOf(PropTypes.string),
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: stringOrNumber.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  onListChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  currentListId: PropTypes.number,
  currentSort: PropTypes.oneOf([
    'name-asc',
    'name-desc',
    'nextEpisodeToAir.airDate-asc',
    'nextEpisodeToAir.airDate-desc',
    'releaseDate-asc',
    'releaseDate-desc'
  ]),
  items: PropTypes.array,
  itemComponent: renderable.isRequired,
  entityNamePlural: PropTypes.string.isRequired
}

export default StarredList
