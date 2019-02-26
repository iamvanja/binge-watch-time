import ButtonToggle from 'components/ButtonToggle'
import { connect } from 'react-redux'
import * as watchedEpisodes from 'redux/actions/watchedEpisodes'
import * as selectors from 'redux/reducers/selectors'

const getArgs = (props) => [props.showId, props.seasonNumber]
const watch = (props) => watchedEpisodes.watchSeason(...getArgs(props))
const unwatch = (props) => watchedEpisodes.unwatchSeason(...getArgs(props))
const onClick = (action, dispatch, ownProps) =>
  e => {
    e.stopPropagation()
    const actionToDispatch = action === 'watch'
      ? watch
      : unwatch

    return dispatch(actionToDispatch(ownProps))
  }

export default connect(
  (state, ownProps) => {
    return {
      disabled: (
        selectors.ui.isRequestPending(state, watch(ownProps)) ||
        selectors.ui.isRequestPending(state, unwatch(ownProps))
      ),
      isActive: selectors.isSeasonWatched(state, ownProps.seasonId)
    }
  },
  (dispatch, ownProps) => {
    return {
      onActive: onClick('watch', dispatch, ownProps),
      onInactive: onClick('unwatch', dispatch, ownProps)
    }
  }
)(ButtonToggle)
