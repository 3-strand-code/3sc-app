import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as SD from 'stardust'

import './HomeView.scss'
import LoginForm from 'components/LoginForm/LoginForm'

class HomeView extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const wasAuthenticated = this.props.session.isAuthenticated
    const isAuthenticated = nextProps.session.isAuthenticated

    if (!wasAuthenticated && isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <SD.Container className='text'>
        <SD.Grid className='middle aligned HomeView--full-height'>
          <SD.Column>
            <LoginForm />
          </SD.Column>
        </SD.Grid>
      </SD.Container>
    )
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
})

export default connect(mapStateToProps)(HomeView)
