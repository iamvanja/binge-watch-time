import React from 'react'
import PropTypes from 'prop-types'
import { renderable } from 'constants/propTypes'
import Loader from 'components/Loader'
import isEqual from 'lodash/isEqual'

class HorizontalListNew extends React.Component {
  componentDidMount () {
    this.getData()
  }

  componentDidUpdate (prevProps) {
    if (
      !isEqual(prevProps.params, this.props.params) ||
      !isEqual(prevProps.type, this.props.type)
    ) {
      this.getData()
    }
  }

  getData () {
    const { results, params } = this.props

    if (!results.length) {
      this.props.onLoad(params)
    }
  }

  render () {
    const { item: Item, results, isPending } = this.props

    return (
      <div className='horizontal-list'>
        {isPending
          ? <Loader />
          : !results.length
            ? (
              <p className='text-center subheader'>
                No data found...
              </p>
            )
            : results.map((show = {}) =>
              <Item key={show.id} {...show} type={this.props.type} />
            )
        }
      </div>
    )
  }
}

HorizontalListNew.defaultProps = {
  onLoad: () => { },
  results: []
}

HorizontalListNew.propTypes = {
  onLoad: PropTypes.func,
  results: PropTypes.array,
  isPending: PropTypes.bool,
  params: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  item: renderable.isRequired,
  type: PropTypes.string
}

export default HorizontalListNew
