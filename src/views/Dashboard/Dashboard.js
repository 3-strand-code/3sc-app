import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as sessionSelectors from 'redux/modules/session'

export default class Dashboard extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
  };

  render() {
    const { currentUser } = this.props
    return (
      <div>
        I am logged in yoooooo
        <hr />
        <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: sessionSelectors.currentUser(state),
  }
}

connect(mapStateToProps)(Dashboard)
