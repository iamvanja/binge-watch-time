import { connect } from 'react-redux'
import * as starred from 'redux/actions/starred'
import * as lists from 'redux/actions/lists'
import * as watchedEpisodes from 'redux/actions/watchedEpisodes'
import * as ui from 'redux/actions/ui'
import * as selectors from 'redux/reducers/selectors'
import StarredShowListItem from './StarredShowListItem'
import StarredList from 'components/StarredList'

const ENTITY_NAME = 'shows'
const getUiState = (methodName, state, listId) => (
  selectors.ui[methodName](state, lists.fetch(ENTITY_NAME)) ||
  selectors.ui[methodName](state, watchedEpisodes.fetch()) ||
  selectors.ui[methodName](state, starred.fetchByListId(listId, ENTITY_NAME))
)

export default connect(
  state => {
    const currentListId = selectors.ui.getCurrentListId(state, ENTITY_NAME)

    return {
      isPending: getUiState('isRequestPending', state, currentListId),
      isErrored: getUiState('isRequestErrored', state, currentListId),
      lists: selectors.lists.getLists(state, ENTITY_NAME),
      currentListId,
      currentSort: selectors.ui.getCurrentSort(state, ENTITY_NAME),
      items: selectors.getStarredShowsByListId(state, currentListId),
      itemComponent: StarredShowListItem,
      entityNamePlural: ENTITY_NAME,
      sortOptions: [
        { value: 'name-asc', label: 'Name A-Z' },
        { value: 'name-desc', label: 'Name Z-A' },
        { value: 'nextEpisodeToAir.airDate-asc', label: 'Airing next' },
        { value: 'nextEpisodeToAir.airDate-desc', label: 'Airing last' }
      ]
    }
  },
  {
    loadItemsPerListId: (...args) =>
      starred.fetchByListId(...args, ENTITY_NAME),
    onListChange: listId => ui.setCurrentList(listId, ENTITY_NAME),
    onSortChange: sort => ui.setCurrentSort(sort, ENTITY_NAME)
  }
)(StarredList)
