import React from 'react'
import PropTypes from 'prop-types'
import Image from './Image'
import ImagePlaceholder from './ImagePlaceholder'
import {
  IMG_BASE_URL,
  POSTER_SIZES,
  BACKDROP_SIZES,
  LOGO_SIZES,
  STILL_SIZES
} from 'constants/tmdb'
import get from 'lodash/get'
import * as numberUtils from 'utils/number'

const PLACEHOLDER_COUNT = {
  poster: 15,
  still: 2,
  backdrop: 16
}

const map = {
  poster: POSTER_SIZES,
  backdrop: BACKDROP_SIZES,
  logo: LOGO_SIZES,
  still: STILL_SIZES
}

export const getSrc = (type, size, path) => {
  const sizeFragment = get(map, type + '.' + size)

  return sizeFragment && path
    ? `${IMG_BASE_URL}/${sizeFragment}${path}`
    : null
}

export const getPlaceholderSrc = type => {
  const placeholderType = type === 'logo' ? 'poster' : type
  const number = numberUtils.randomize(1, PLACEHOLDER_COUNT[placeholderType])

  return `/placeholders/${placeholderType}${number}.jpg`
}

const ImageTmdb = props => {
  const {
    path,
    type,
    size,
    name,
    defaultToFallback,
    ...rest
  } = props
  const src = getSrc(type, size, path)
  const Fallback = <ImagePlaceholder {...rest} />

  return (
    src
      ? (
        <Image
          {...rest}
          src={src}
          alt={`${name} ${type}`}
          placeholderSrc={getPlaceholderSrc(type)}
          fallback={Fallback}
        />
      )
      : defaultToFallback
        ? Fallback
        : null
  )
}

ImageTmdb.defaultProps = {
  defaultToFallback: true
}

ImageTmdb.propTypes = {
  path: PropTypes.string,
  type: PropTypes.oneOf([
    'poster',
    'backdrop',
    'logo',
    'still'
  ]).isRequired,
  size: PropTypes.oneOf([
    'thumb',
    'small',
    'medium',
    'large',
    'original'
  ]).isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  defaultToFallback: PropTypes.bool
}

export default ImageTmdb
