import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { stringOrNumber } from 'constants/propTypes'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import * as shows from 'redux/actions/shows'
import { Link } from 'react-router-dom'
import { GridContainer, Grid, Cell } from 'components/Grid'
import { IMG_BASE_URL, BACKDROP_SIZES } from 'constants/tmdb'
import ShowStatus from './ShowStatus'
import Button from 'components/Button'
import Loader from 'components/Loader'
import classnames from 'classnames'
import get from 'lodash/get'

class StarredShowListItem extends Component {
  constructor () {
    super()

    this.getData = this.getData.bind(this)
  }

  componentWillMount () {
    this.getData()
  }

  getData () {
    const { id } = this.props

    this.props.onLoad(id)
  }

  renderItem () {
    const {
      id,
      name,
      numberOfEpisodes,
      watchedEpisodeCount,
      status,
      nextEpisodeToAir
    } = this.props

    return (
      <Link to={`shows/${id}`}>
        <GridContainer>
          <Grid>
            <Cell className='auto' alignSelf='bottom'>
              <h2>{name}</h2>
            </Cell>
            <Cell className='shrink text-right' alignSelf='middle'>
              <h6>
                <span>
                  <span className='stat'>
                    {'' + (numberOfEpisodes - watchedEpisodeCount)}
                  </span> missed
                  <hr />
                </span>

                <ShowStatus
                  tmdbStatus={status}
                  nextAirDate={get(nextEpisodeToAir, 'airDate')}
                />
              </h6>
            </Cell>
          </Grid>
        </GridContainer>
      </Link>
    )
  }

  renderWrap (children) {
    const { backdropPath, isPending, isErrored } = this.props
    const heroStyle = {
      backgroundImage: backdropPath
        ? `url('${IMG_BASE_URL}/${BACKDROP_SIZES.large}${backdropPath}')`
        : undefined
    }

    return (
      <div
        className={classnames('starred-show-list-item overlay-bg', {
          'is-flex': isPending || isErrored
        })}
        style={heroStyle}
      >
        {children}
      </div>
    )
  }

  render () {
    const { isPending, isErrored } = this.props

    if (isErrored) {
      return this.renderWrap(
        <div className='error-container'>
          <p className='subheader'>
            Error while loading the show...
          </p>
          <Button onClick={this.getData} className='hollow'>
            Try loading again
          </Button>
        </div>
      )
    }

    if (isPending) {
      return this.renderWrap(<Loader className='align-self-middle' />)
    }

    return this.renderWrap(this.renderItem())
  }
}

StarredShowListItem.defaultProps = {
  watchedEpisodeCount: 0
}

StarredShowListItem.propTypes = {
  isPending: PropTypes.bool,
  isErrored: PropTypes.bool,
  onLoad: PropTypes.func.isRequired,
  backdropPath: PropTypes.string,
  id: stringOrNumber.isRequired,
  name: PropTypes.string,
  numberOfEpisodes: PropTypes.number,
  watchedEpisodeCount: PropTypes.number,
  status: PropTypes.string,
  nextEpisodeToAir: PropTypes.shape({
    airDate: PropTypes.string
  })
}

export default connect(
  (state, ownProps) => {
    const { id } = ownProps
    const action = shows.one(id)
    const show = selectors.shows.getShow(state, id)

    return {
      isPending: selectors.ui.isRequestPending(state, action),
      isErrored: selectors.ui.isRequestErrored(state, action),
      watchedEpisodeCount: selectors.watchedEpisodes.getWatchedEpisodesByShowId(
        state, id
      ).length,
      ...show
    }
  },
  {
    onLoad: shows.one
  }
)(StarredShowListItem)
