import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ImageTmdb from 'components/ImageTmdb'

const HorizontalListItem = ({ id, posterPath, name, type }) =>
  <div className='horizontal-item show-item'>
    <div className='image-holder bwt-image-holder'>
      <ImageTmdb
        type='poster'
        size='medium'
        path={posterPath}
        name={name}
        width={100}
        height={150}
      />
    </div>
    <strong className='title'>{name}</strong>
    <Link to={`/${type}/${id}`} className='button expanded hollow'>DETAIL</Link>
  </div>

HorizontalListItem.propTypes = {
  id: PropTypes.number.isRequired,
  posterPath: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['shows', 'movies'])
}

export default HorizontalListItem
