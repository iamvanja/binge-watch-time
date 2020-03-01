import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import * as starredMovies from 'redux/actions/starredMovies'
import * as ui from 'redux/actions/ui'
import StarButtonDropdown from 'components/StarButtonDropdown'

export default connect(
  (state, { entityId }) => ({
    isLoading: (
      selectors.ui.isRequestPending(state, starredMovies.star(entityId)) ||
      selectors.ui.isRequestPending(state, starredMovies.unstar(entityId))
    ),
    inListId: selectors.starredMovies.getListIdByMovieId(state, entityId),
    lists: selectors.moviesLists.getLists(state),
    uiListId: selectors.ui.getCurrentListId(state, 'movies')
  }),
  {
    onActive: starredMovies.star,
    onInactive: starredMovies.unstar,
    onListChange: listId => ui.setCurrentList(listId, 'movies')
  }
)(StarButtonDropdown)
