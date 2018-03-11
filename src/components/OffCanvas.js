import { connect } from 'react-redux'
import actions from 'actions'
import OffCanvasLayout, { OffCanvasToggleButton } from 'layouts/OffCanvasLayout'

const stateToProps = ({ offCanvasState }) => ({
  isSideVisible: offCanvasState.isActive
})

export const ConnectedButton = connect(
  stateToProps,
  dispatch => ({ onToggle: () => dispatch(actions.offCanvas.toggle()) })
)(OffCanvasToggleButton)

export default connect(
  stateToProps,
  dispatch => ({
    onToggle: () => dispatch(actions.offCanvas.toggle()),
    onClose: () => dispatch(actions.offCanvas.inactive())
  })
)(OffCanvasLayout)
