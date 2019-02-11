import { connect } from 'react-redux'
import HorizontalList from 'components/HorizontalList'
import ContentBoxSelect from 'components/ContentBoxSelect'
import * as discover from 'redux/actions/discover'
import * as ui from 'redux/actions/ui'
import * as selectors from 'redux/reducers/selectors'
import { GENRES } from 'constants/tmdb'
import { DISCOVER_NEW, DISCOVER_POPULAR } from 'constants/discover'

const getMapState = state =>
  type => ({
    isPending: selectors.ui.isRequestPending(state, discover.fetch(type)),
    results: selectors.getDiscoverShows(state, type)
  })

const getMapDispatch = dispatch =>
  type => ({
    onLoad: genreId => dispatch(discover.fetch(genreId || type))
  })

export const DiscoverNew = connect(
  state => getMapState(state)(DISCOVER_NEW),
  dispatch => getMapDispatch(dispatch)(DISCOVER_NEW)
)(HorizontalList)

export const DiscoverPopular = connect(
  state => getMapState(state)(DISCOVER_POPULAR),
  dispatch => getMapDispatch(dispatch)(DISCOVER_POPULAR)
)(HorizontalList)

const genreOptions = GENRES.map(({ id, name }) => ({ value: id, label: name }))
export const DiscoverByGenre = connect(
  state => {
    const genreId = (
      selectors.ui.getDiscoverGenre(state) ||
      genreOptions[0].value
    )

    return {
      ...getMapState(state)(genreId),
      selectOptions: genreOptions,
      currentSelectValue: genreId
    }
  },
  dispatch => ({
    ...getMapDispatch(dispatch)(),
    onChange: genreId => dispatch(ui.setDiscoverGenre(genreId))
  })
)(ContentBoxSelect)
