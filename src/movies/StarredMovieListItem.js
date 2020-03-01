import React from 'react'
import PropTypes from 'prop-types'
import { stringOrNumber } from 'constants/propTypes'
import { Link } from 'react-router-dom'
import { GridContainer, Grid, Cell } from 'components/Grid'
import ImageTmdb from 'components/ImageTmdb'
import { getYearFromDateString } from 'utils/string'

const StarredMovieListItem = props => {
  const {
    id,
    name,
    status,
    releaseDate,
    backdropPath
  } = props

  return (
    <div className='starred-show-list-item overlay-bg'>
      {backdropPath && (
        <ImageTmdb
          className='bwt-background-image'
          type='backdrop'
          size='large'
          path={backdropPath}
          name={name}
        />
      )}
      <Link to={`movies/${id}`}>
        <GridContainer>
          <Grid>
            <Cell className='auto' alignSelf='bottom'>
              <h2>{name}</h2>
            </Cell>
            <Cell className='shrink text-right' alignSelf='middle'>
              <h6>
                <span className='stat'>
                  {getYearFromDateString(releaseDate)}
                </span>

                <hr />

                {status}
              </h6>
            </Cell>
          </Grid>
        </GridContainer>
      </Link>
    </div>
  )
}

StarredMovieListItem.propTypes = {
  backdropPath: PropTypes.string,
  id: stringOrNumber.isRequired,
  name: PropTypes.string,
  status: PropTypes.string,
  releaseDate: PropTypes.string
}

export default StarredMovieListItem
