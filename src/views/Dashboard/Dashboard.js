import autobind from 'autobind-decorator'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Header } from 'stardust'

import * as sessionService from 'services/session'

class Dashboard extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      logout: PropTypes.func.isRequired,
    }),
    currentUser: PropTypes.object,
  };

  @autobind
  handleLogout() {
    this.props.actions.logout()
  }

  render() {
    const { currentUser } = this.props
    return (
      <div>
        <Header.H1>Dashboard</Header.H1>
        <pre>{JSON.stringify(currentUser, null, 2)}</pre>
        <Button onClick={this.handleLogout}>Logout</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.user,
})

const mapDispatchToProps = (dispatch, getState) => ({
  actions: bindActionCreators({
    ...sessionService,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
