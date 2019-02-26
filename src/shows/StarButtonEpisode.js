import ButtonToggle from 'components/ButtonToggle'
import { connect } from 'react-redux'
import * as watchedEpisodes from 'redux/actions/watchedEpisodes'
import * as selectors from 'redux/reducers/selectors'

const getArgs = (props) =>
  [props.showId, props.episodeId, props.seasonNumber, props.episodeNumber]
const watch = (props) => watchedEpisodes.watch(...getArgs(props))
const unwatch = (props) => watchedEpisodes.unwatch(...getArgs(props))

export default connect(
  (state, ownProps) => {
    const { episodeId, showId } = ownProps

    return {
      disabled: (
        selectors.ui.isRequestPending(state, watch(ownProps)) ||
        selectors.ui.isRequestPending(state, unwatch(ownProps))
      ),
      isActive: selectors.watchedEpisodes.isEpisodeWatched(
        state, showId, episodeId
      )
    }
  },
  (dispatch, ownProps) => {
    return {
      onActive: _ => dispatch(watch(ownProps)),
      onInactive: _ => dispatch(unwatch(ownProps))
    }
  }
)(ButtonToggle)
