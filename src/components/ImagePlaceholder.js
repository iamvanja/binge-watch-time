import React from 'react'
import PropTypes from 'prop-types'

const ImagePlaceholder = ({ width, height, fontSize }) => {
  const style = { width, height, fontSize }

  if (!fontSize && width && height) {
    style.fontSize = parseInt((width + height) / 8, 10)
  }
  return (
    <div className='image-placeholder' style={style} />
  )
}

ImagePlaceholder.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fontSize: PropTypes.number
}

export default ImagePlaceholder
