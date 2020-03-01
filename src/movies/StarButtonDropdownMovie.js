import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import * as starred from 'redux/actions/starred'
import * as ui from 'redux/actions/ui'
import StarButtonDropdown from 'components/StarButtonDropdown'

const ENTITY_NAME = 'movies'
export default connect(
  (state, { entityId }) => {
    const currentListId = selectors.ui.getCurrentListId(state, ENTITY_NAME)

    return {
      isLoading: (
        selectors.ui.isRequestPending(
          state, starred.star(entityId, currentListId, ENTITY_NAME)
        ) ||
        selectors.ui.isRequestPending(
          state, starred.unstar(entityId, currentListId, ENTITY_NAME)
        )
      ),
      inListId: selectors.starred.getListIdById(state, entityId, ENTITY_NAME),
      lists: selectors.lists.getLists(state, ENTITY_NAME),
      uiListId: currentListId
    }
  },
  {
    onActive: (...args) => starred.star(...args, ENTITY_NAME),
    onInactive: (...args) => starred.unstar(...args, ENTITY_NAME),
    onListChange: listId => ui.setCurrentList(listId, ENTITY_NAME)
  }
)(StarButtonDropdown)
