import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { GridContainer, Grid, Cell } from 'components/Grid'
import Rater from 'components/Rater'
import Image from 'components/Image'
import ImagePlaceholder from 'components/ImagePlaceholder'
import {
  IMG_BASE_URL,
  POSTER_SIZES,
  BACKDROP_SIZES
} from 'constants/tmdb'
import { formatDate } from 'utils/date'

const ShowHero = ({
  name,
  isMini,
  voteAverage,
  networks,
  episodeRunTime,
  backdropPath,
  posterPath,
  lastAirDate
}) => {
  const heroStyle = {
    backgroundImage: backdropPath
      ? `url('${IMG_BASE_URL}/${BACKDROP_SIZES.large}${backdropPath}')`
      : undefined
  }
  const classes = classnames('show-hero overlay-bg', isMini && 'mini')
  const titleClasses = classnames(
    'title',
    isMini ? 'auto' : 'small-12 large-auto'
  )
  return (
    <div className={classes} style={heroStyle}>
      <GridContainer>
        <Grid gutters='margin'>
          <Cell className={titleClasses} alignSelf='bottom'>
            <h1>
              {name}
            </h1>
          </Cell>

          {!isMini && (
            <Cell className='auto large-shrink info text-right' alignSelf='middle'>
              <ul className='no-bullet'>
                <li className='airs-day'>
                  {formatDate(lastAirDate, 'dddd')}s
                </li>
                <li className='ratings'>
                  <Rater total={5} rating={(voteAverage / 10) * 5} />
                </li>
                <li className='network' title='Network name'>
                  {networks.map(({ name }) => name).join(', ')}
                </li>
                <li className='runtime'>
                  {episodeRunTime.length
                    ? `${episodeRunTime[0]} minutes/episode`
                    : null
                  }
                </li>
              </ul>
            </Cell>
          )}

          <Cell className='shrink poster' alignSelf='middle'>
            <Image
              src={`${IMG_BASE_URL}/${POSTER_SIZES.medium}${posterPath}`}
              alt={`${name} poster`}
              fallback={<ImagePlaceholder width={176} height={260} />}
            />
          </Cell>

        </Grid>
      </GridContainer>
    </div>
  )
}

ShowHero.propTypes = {
  name: PropTypes.string.isRequired,
  isMini: PropTypes.bool,
  voteAverage: PropTypes.number,
  networks: PropTypes.array.isRequired,
  episodeRunTime: PropTypes.array.isRequired,
  backdropPath: PropTypes.string,
  posterPath: PropTypes.string,
  lastAirDate: PropTypes.string.isRequired
}

export default ShowHero
