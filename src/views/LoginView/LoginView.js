import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Header,
  Image,
} from 'stardust'

import './LoginView.scss'
import LoginForm from 'components/LoginForm/LoginForm'
import logoUrl from 'assets/images/android-icon-192x192.png'

class LoginView extends Component {
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
    const logo = <Image src={logoUrl} className='mini' />
    return (
      <Grid className='middle aligned center aligned very relaxed equal width LoginView__grid'>
        <Grid.Column className='LoginView__formColumn'>
          <Header.H1 className='blue center aligned' image={logo}>
            3 Strand Code
          </Header.H1>
          <LoginForm />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
})

export default connect(mapStateToProps)(LoginView)
