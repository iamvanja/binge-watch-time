import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Cell } from 'components/Grid'
import Image from 'components/Image'
import ImagePlaceholder from 'components/ImagePlaceholder'
import { IMG_BASE_URL, POSTER_SIZES } from 'constants/tmdb'

const SeasonListItemHeader = ({ name, episodeCount, airDate, posterPath }) => {
  return (
    <div className='season-list-item'>
      <Grid align='middle'>
        <Cell className='shrink'>
          <Image
            className='poster image-holder'
            src={`${IMG_BASE_URL}/${POSTER_SIZES.thumb}${posterPath}`}
            alt={`${name} poster`}
            fallback={<ImagePlaceholder width={55} height={82} />}
          />
        </Cell>
        <Cell className='auto content'>
          <h2 className='title h3'>{name}</h2>
          <span className='episode-count subheader'>{episodeCount} episodes</span>
          {airDate && <span className='air-date subheader'>{airDate}</span>}
        </Cell>
      </Grid>
    </div>
  )
}

SeasonListItemHeader.propTypes = {
  name: PropTypes.string.isRequired,
  episodeCount: PropTypes.number.isRequired,
  airDate: PropTypes.string,
  posterPath: PropTypes.string
}

export default SeasonListItemHeader