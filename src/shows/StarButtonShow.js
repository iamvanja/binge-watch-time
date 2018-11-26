import ButtonToggle from 'components/ButtonToggle'
import { connect } from 'react-redux'
import * as starredShows from 'actions/starredShows'
import { isRequestPending, isShowStarred } from 'reducers'

export default connect(
  (state, { showId }) => ({
    disabled: (
      isRequestPending(state, starredShows.star(showId)) ||
      isRequestPending(state, starredShows.unstar(showId))
    ),
    isActive: isShowStarred(state, showId)
  }),
  (dispatch, { showId }) => ({
    onActive: _ => dispatch(starredShows.star(showId)),
    onInactive: _ => dispatch(starredShows.unstar(showId))
  })
)(ButtonToggle)
