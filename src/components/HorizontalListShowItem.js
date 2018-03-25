import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Image from 'components/Image'
import ImagePlaceholder from 'components/ImagePlaceholder'
import { IMG_BASE_URL, POSTER_SIZES } from 'constants/tmdb'

const HorizontalListShowItem = ({ id, posterPath, name }) =>
  <div className='horizontal-item show-item'>
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

HorizontalListShowItem.propTypes = {
  id: PropTypes.number.isRequired,
  posterPath: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default HorizontalListShowItem
