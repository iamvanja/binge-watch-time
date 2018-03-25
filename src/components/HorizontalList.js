import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loader from 'components/Loader'
import Image from 'components/Image'
import ImagePlaceholder from 'components/ImagePlaceholder'
import { IMG_BASE_URL, POSTER_SIZES } from 'constants/tmdb'

const Item = ({ id, posterPath, name }) =>
  <div className='horizontal-item'>
    <div className='image-holder'>
      <Image
        src={`${IMG_BASE_URL}/${POSTER_SIZES.medium}${posterPath}`}
        alt={`${name} poster`}
        fallback={<ImagePlaceholder width={100} height={150} />}
      />
    </div>
    <strong className='title'>{name}</strong>
    <Link to={`shows/${id}`} className='button expanded hollow'>DETAIL</Link>
  </div>

Item.propTypes = {
  id: PropTypes.number.isRequired,
  posterPath: PropTypes.string,
  name: PropTypes.string.isRequired
}

// todo: make render props
class HorizontalList extends Component {
  constructor () {
    super()
    this.state = {
      isPending: true,
      list: []
    }
  }

  componentDidMount () {
    this.props.api()
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
  api: PropTypes.func.isRequired
}

export default HorizontalList
