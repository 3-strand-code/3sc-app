import styles from './LoginView.scss'
import autobind from 'autobind-decorator'
import cx from 'classnames'
import React, { Component, PropTypes } from 'react'
import { Button, Field, Form, Header, Input, Message } from 'stardust'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from 'services/session'

const mapStateToProps = (state) => ({
  session: state.session,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    login,
  }, dispatch),
})

class LoginView extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
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

  @autobind
  handleSubmit(e) {
    e.preventDefault()
    // Problem: loginForm ref is not working...? ref= attribute on form appears right
    // however login prop action points to right function and works!!
    // set state somewhere?
    const { email, password } = this.refs.loginForm.serializeJson()
    this.props.actions.login(email.value, password.value)
  }

  renderErrorMessage() {
    const { error } = this.props.session

    if (error) {
      return <Message className='error'>{error.message}</Message>
    }
  }

  render() {
    const formClass = cx({
      loading: this.props.session.hasPendingLogin,
      error: this.props.session.error,
    })

    return (
      <div className={styles.loginColumn}>
        <Header.H1 className='center aligned'>
          Welcome to 3 Strand Code
        </Header.H1>
        <Form onSubmit={this.handleSubmit} className={formClass} ref='loginForm'>
          {this.renderErrorMessage()}
          <Field>
            <Input name='email' placeholder='Username' type='text' defaultValue='levi' />
          </Field>
          <Field>
            <Input name='password' placeholder='Password' type='password' defaultValue='levi' />
          </Field>
          <Button type='submit' className='fluid blue'>
            Continue
          </Button>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
