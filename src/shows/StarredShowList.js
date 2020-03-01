import { connect } from 'react-redux'
import * as starredShows from 'redux/actions/starredShows'
import * as lists from 'redux/actions/shows/lists'
import * as watchedEpisodes from 'redux/actions/watchedEpisodes'
import * as ui from 'redux/actions/ui'
import * as selectors from 'redux/reducers/selectors'
import StarredShowListItem from './StarredShowListItem'
import StarredList from 'components/StarredList'

const getUiState = (methodName, state, listId) => (
  selectors.ui[methodName](state, lists.fetch()) ||
  selectors.ui[methodName](state, watchedEpisodes.fetch()) ||
  selectors.ui[methodName](state, starredShows.fetchByListId(listId))
)
const ENTITY_NAME = 'shows'

export default connect(
  state => {
    const currentListId = selectors.ui.getCurrentListId(state, ENTITY_NAME)

    return {
      isPending: getUiState('isRequestPending', state, currentListId),
      isErrored: getUiState('isRequestErrored', state, currentListId),
      lists: selectors.showsLists.getLists(state),
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
    loadItemsPerListId: starredShows.fetchByListId,
    onListChange: listId => ui.setCurrentList(listId, ENTITY_NAME),
    onSortChange: sort => ui.setCurrentSort(sort, ENTITY_NAME)
  }
)(StarredList)
