import { connect } from 'react-redux'
import * as starredMovies from 'redux/actions/starredMovies'
import * as lists from 'redux/actions/movies/lists'
import * as ui from 'redux/actions/ui'
import * as selectors from 'redux/reducers/selectors'
import StarredMovieListItem from './StarredMovieListItem'
import StarredList from 'components/StarredList'

const getUiState = (methodName, state, listId) => (
  selectors.ui[methodName](state, lists.fetch()) ||
  selectors.ui[methodName](state, starredMovies.fetchByListId(listId))
)
const ENTITY_NAME = 'movies'

export default connect(
  state => {
    const currentListId = selectors.ui.getCurrentListId(state, ENTITY_NAME)

    return {
      isPending: getUiState('isRequestPending', state, currentListId),
      isErrored: getUiState('isRequestErrored', state, currentListId),
      lists: selectors.moviesLists.getLists(state),
      currentListId,
      currentSort: selectors.ui.getCurrentSort(state, ENTITY_NAME),
      items: selectors.getStarredMoviesByListId(state, currentListId),
      itemComponent: StarredMovieListItem,
      entityNamePlural: ENTITY_NAME,
      sortOptions: [
        { value: 'name-asc', label: 'Name A-Z' },
        { value: 'name-desc', label: 'Name Z-A' },
        { value: 'releaseDate-asc', label: 'Oldest' },
        { value: 'releaseDate-desc', label: 'Newest' }
      ]
    }
  },
  {
    loadItemsPerListId: starredMovies.fetchByListId,
    onListChange: listId => ui.setCurrentList(listId, ENTITY_NAME),
    onSortChange: sort => ui.setCurrentSort(sort, ENTITY_NAME)
  }
)(StarredList)
