import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import * as starredMovies from 'redux/actions/starredMovies'
import * as ui from 'redux/actions/ui'
import StarButtonDropdown from 'components/StarButtonDropdown'

const ENTITY_NAME = 'movies'
export default connect(
  (state, { entityId }) => ({
    isLoading: (
      selectors.ui.isRequestPending(state, starredMovies.star(entityId)) ||
      selectors.ui.isRequestPending(state, starredMovies.unstar(entityId))
    ),
    inListId: selectors.starredMovies.getListIdByMovieId(state, entityId),
    lists: selectors.lists.getLists(state, ENTITY_NAME),
    uiListId: selectors.ui.getCurrentListId(state, ENTITY_NAME)
  }),
  {
    onActive: starredMovies.star,
    onInactive: starredMovies.unstar,
    onListChange: listId => ui.setCurrentList(listId, ENTITY_NAME)
  }
)(StarButtonDropdown)
