import ButtonToggle from 'components/ButtonToggle'
import { connect } from 'react-redux'
import * as watchedEpisodes from 'actions/watchedEpisodes'
import { isRequestPending, isEpisodeWatched } from 'reducers'

const getArgs = (props) =>
  [props.showId, props.episodeId, props.seasonNumber, props.episodeNumber]

export default connect(
  (state, ownProps) => {
    const { episodeId, showId } = ownProps

    return {
      disabled: (
        isRequestPending(state, watchedEpisodes.watch(...getArgs(ownProps))) ||
        isRequestPending(state, watchedEpisodes.unwatch(...getArgs(ownProps)))
      ),
      isActive: isEpisodeWatched(state, showId, episodeId)
    }
  },
  (dispatch, ownProps) => {
    return {
      onActive: _ => dispatch(watchedEpisodes.watch(...getArgs(ownProps))),
      onInactive: _ => dispatch(watchedEpisodes.unwatch(...getArgs(ownProps)))
    }
  }
)(ButtonToggle)
