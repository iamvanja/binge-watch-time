import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as movies from 'redux/actions/movies'
import DetailHero from 'components/DetailHero'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import Loader from 'components/Loader'
import { GridContainer } from 'components/Grid'
import Button from 'components/Button'
import isEqual from 'lodash/isEqual'
import HeroExpandedContent from './HeroExpandedContent'
import MovieDetailOverview from './MovieDetailOverview'

class ShowDetailPage extends Component {
  constructor () {
    super()

    this.state = {
      isSpecial: false
    }
    this.getData = this.getData.bind(this)
    this.handleSpecial = this.handleSpecial.bind(this)
  }

  componentWillMount () {
    this.getData()
  }

  componentDidUpdate (prevProps) {
    if (
      !isEqual(
        prevProps.match.params.movieId,
        this.props.match.params.movieId
      )
    ) {
      this.getData()
    }
  }

  getData () {
    const { movieId } = this.props.match.params
    this.props.onLoad(parseInt(movieId, 10))
  }

  handleSpecial () {
    this.setState({ isSpecial: true })
  }

  render () {
    const {
      isPending,
      isErrored,
      isLoaded,
      onLoad,
      ...movie
    } = this.props

    if (isErrored) {
      return (
        <div className='text-center'>
          <p className='subheader'>
            Error while loading the show...
          </p>
          <Button onClick={this.getData} className='hollow'>
            Try loading again
          </Button>
        </div>
      )
    }

    if (isPending || !isLoaded) {
      return <Loader />
    }

    return (
      <div className='page detail movie-detail'>
        <DetailHero
          isMini={false}
          {...movie}
          onSpecial={this.handleSpecial}
          showListName='Watching'
        >
          <HeroExpandedContent {...movie} />
        </DetailHero>

        <GridContainer>
          <MovieDetailOverview
            {...movie}
            isSpecial={this.state.isSpecial}
          />
        </GridContainer>
      </div>
    )
  }
}

ShowDetailPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string
    }),
    isExact: PropTypes.bool,
    url: PropTypes.string,
    path: PropTypes.string
  }).isRequired,
  isPending: PropTypes.bool,
  isErrored: PropTypes.bool,
  isLoaded: PropTypes.bool,
  onLoad: PropTypes.func.isRequired
}

export default connect(
  (state, ownProps) => {
    const movieId = parseInt(ownProps.match.params.movieId, 10)
    const action = movies.one(movieId)
    // const inListId = selectors.starredShows.getListIdByShowId(state, movieId)
    // const lists = selectors.showsLists.getLists(state)

    return {
      ...selectors.movies.getMovie(state, movieId),
      // showListName: lists[inListId],
      isPending: selectors.ui.isRequestPending(state, action),
      isLoaded: !!selectors.movies.getMovie(state, movieId),
      isErrored: selectors.ui.isRequestErrored(state, action)
    }
  },
  {
    onLoad: movies.one
  }
)(ShowDetailPage)
