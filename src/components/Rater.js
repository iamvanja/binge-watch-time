import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'

const RatingIcon = ({ rating }) => {
  let iconName = 'star'
  switch (true) {
    case (rating >= 0.5 && rating < 1):
      iconName = 'star-half'
      break
    case (rating < 0.5):
      iconName = 'star-empty'
      break
  }

  return <Icon icon={iconName} />
}

RatingIcon.propTypes = {
  rating: PropTypes.number
}

const Rater = ({ total, rating }) => {
  rating = parseFloat(rating, 10).toFixed(2)
  const stars = []

  for (let i = 0; i < total; i++) {
    stars.push(<RatingIcon key={i} rating={rating - i} />)
  }

  return (
    <div className='rater' title={`${rating}/${total}`}>
      {stars}
    </div>
  )
}

Rater.propTypes = {
  total: PropTypes.number,
  rating: PropTypes.number
}

export default Rater
