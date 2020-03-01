import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import * as starredShows from 'redux/actions/starredShows'
import * as ui from 'redux/actions/ui'
import StarButtonDropdown from 'components/StarButtonDropdown'

const ENTITY_NAME = 'shows'
export default connect(
  (state, { entityId }) => ({
    isLoading: (
      selectors.ui.isRequestPending(state, starredShows.star(entityId)) ||
      selectors.ui.isRequestPending(state, starredShows.unstar(entityId))
    ),
    inListId: selectors.starredShows.getListIdByShowId(state, entityId),
    lists: selectors.lists.getLists(state, ENTITY_NAME),
    uiListId: selectors.ui.getCurrentListId(state, ENTITY_NAME)
  }),
  {
    onActive: starredShows.star,
    onInactive: starredShows.unstar,
    onListChange: listId => ui.setCurrentList(listId, ENTITY_NAME)
  }
)(StarButtonDropdown)
