import ButtonToggle from 'components/ButtonToggle'
import { connect } from 'react-redux'
import * as watchedEpisodes from 'redux/actions/watchedEpisodes'
import * as selectors from 'redux/reducers/selectors'

const getArgs = (props) =>
  [props.showId, props.episodeId, props.seasonNumber, props.episodeNumber]

export default connect(
  (state, ownProps) => {
    const { episodeId, showId } = ownProps

    return {
      disabled: (
        selectors.ui.isRequestPending(
          state, watchedEpisodes.watch(...getArgs(ownProps))
        ) ||
        selectors.ui.isRequestPending(
          state, watchedEpisodes.unwatch(...getArgs(ownProps))
        )
      ),
      isActive: selectors.watchedEpisodes.isEpisodeWatched(
        state, showId, episodeId
      )
    }
  },
  (dispatch, ownProps) => {
    return {
      onActive: _ => dispatch(watchedEpisodes.watch(...getArgs(ownProps))),
      onInactive: _ => dispatch(watchedEpisodes.unwatch(...getArgs(ownProps)))
    }
  }
)(ButtonToggle)
