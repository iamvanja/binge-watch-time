import { connect } from 'react-redux'
import HorizontalList from 'components/HorizontalList'
import ContentBoxSelect from 'components/ContentBoxSelect'
import * as discover from 'redux/actions/discover'
import * as ui from 'redux/actions/ui'
import * as selectors from 'redux/reducers/selectors'
import { GENRES } from 'constants/tmdb'
import {
  DISCOVER_NEW,
  DISCOVER_POPULAR,
  DISCOVER_NOW_PLAYING,
  DISCOVER_TOP_RATED,
  DISCOVER_UPCOMING
} from 'constants/discover'

const getMapState = state =>
  (filterType, contentType) => ({
    isPending: selectors.ui.isRequestPending(
      state,
      contentType === 'shows'
        ? discover.fetchShows(filterType)
        : discover.fetchMovies(filterType)
    ),
    results: contentType === 'shows'
      ? selectors.getDiscoverShows(state, filterType)
      : selectors.getDiscoverMovies(state, filterType)
  })

const getMapDispatch = dispatch =>
  (filterType, contentType) => ({
    onLoad: genreId => dispatch(
      contentType === 'shows'
        ? discover.fetchShows(genreId || filterType)
        : discover.fetchMovies(genreId || filterType)
    )
  })

export const DiscoverNowPlaying = connect(
  (state) => getMapState(state)(DISCOVER_NOW_PLAYING, 'movies'),
  (dispatch) => getMapDispatch(dispatch)(DISCOVER_NOW_PLAYING, 'movies')
)(HorizontalList)

export const DiscoverUpcoming = connect(
  (state) => getMapState(state)(DISCOVER_UPCOMING, 'movies'),
  (dispatch) => getMapDispatch(dispatch)(DISCOVER_UPCOMING, 'movies')
)(HorizontalList)

export const DiscoverNew = connect(
  (state, ownProps) => getMapState(state)(DISCOVER_NEW, ownProps.type),
  (dispatch, ownProps) => getMapDispatch(dispatch)(DISCOVER_NEW, ownProps.type)
)(HorizontalList)

export const DiscoverPopular = connect(
  (state, ownProps) => getMapState(state)(DISCOVER_POPULAR, ownProps.type),
  (dispatch, ownProps) => getMapDispatch(dispatch)(
    DISCOVER_POPULAR,
    ownProps.type
  )
)(HorizontalList)

export const DiscoverTopRated = connect(
  (state, ownProps) => getMapState(state)(DISCOVER_TOP_RATED, ownProps.type),
  (dispatch, ownProps) => getMapDispatch(dispatch)(
    DISCOVER_TOP_RATED,
    ownProps.type
  )
)(HorizontalList)

const genreOptions = GENRES.map(({ id, name }) => ({ value: id, label: name }))
export const DiscoverByGenre = connect(
  (state, ownProps) => {
    const genreId = (
      selectors.ui.getDiscoverGenre(state) ||
      genreOptions[0].value
    )

    return {
      ...getMapState(state)(genreId, ownProps.type),
      selectOptions: genreOptions,
      currentSelectValue: genreId
    }
  },
  (dispatch, ownProps) => ({
    ...getMapDispatch(dispatch)(null, ownProps.type),
    onChange: genreId => dispatch(ui.setDiscoverGenre(genreId))
  })
)(ContentBoxSelect)
