import React, { Component, PropTypes } from 'react'

class NotFoundView extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  onReturnToHomepage = () => {
    this.props.history.replaceState(null, '/')
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Page Not Found</h1>
        <button onClick={this.onReturnToHomepage}>
          Return to the Homepage
        </button>
      </div>
    )
  }
}

export default NotFoundView
