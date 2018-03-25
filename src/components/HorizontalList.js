import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderable } from 'constants/propTypes'
import isEqual from 'lodash/isEqual'
import Loader from 'components/Loader'

class HorizontalList extends Component {
  constructor () {
    super()
    this.state = {
      isPending: true,
      list: []
    }

    this.fetch = this.fetch.bind(this)
  }

  componentDidMount () {
    this.fetch()
  }

  componentDidUpdate (prevProps, prevState) {
    if (!isEqual(prevProps.params, this.props.params)) {
      this.fetch()
    }
  }

  fetch () {
    this.setState({ isPending: true })
    this.props.api(this.props.params)
      .then(data => {
        this.setState({
          list: data.results,
          isPending: false
        })
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        this.setState({
          isPending: false
        })
      })
  }

  render () {
    const { isPending, list } = this.state
    const { item: Item } = this.props
    return (
      <div className='horizontal-list'>
        {
          isPending
            ? <Loader />
            : list.length
              ? list
                .map(show =>
                  <Item
                    key={show.id}
                    {...show}
                  />)
              : 'No data'
        }
      </div>
    )
  }
}

HorizontalList.propTypes = {
  api: PropTypes.func.isRequired,
  params: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  item: renderable.isRequired

}

export default HorizontalList
