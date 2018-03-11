import React from 'react'

const withNoticeHoc = Component => {
  return class WithNotice extends React.Component {
    constructor () {
      super()
      this.state = {
        noticeMessage: null,
        noticeType: null
      }
      this._timeout = null
      this.addNotice = this.addNotice.bind(this)
      this.clearNotice = this.clearNotice.bind(this)
    }

    addNotice (noticeMessage, noticeType = null, ms = 0) {
      this.setState({ noticeMessage, noticeType })
      ms = parseInt(ms)
      clearTimeout(this._timeout)
      if (ms > 0) this._timeout = setTimeout(this.clearNotice, parseInt(ms))
    }

    clearNotice () {
      this.addNotice(null, null)
    }

    render () {
      let { noticeMessage, noticeType } = this.state
      return <Component
        {...this.props}
        noticeMessage={noticeMessage}
        noticeType={noticeType}
        addNotice={this.addNotice}
        clearNotice={this.clearNotice}
      />
    }
  }
}

export default withNoticeHoc
