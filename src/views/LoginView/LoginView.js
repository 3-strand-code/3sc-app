import React, {Component, PropTypes} from 'react'
import cx from 'classnames'
import {Button, Field, Form, Header, Input, Message} from 'stardust'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {login} from 'services/session'
import classes from './LoginView.scss'
import autobind from 'autobind-decorator'

const mapStateToProps = (state) => ({
  session: state.session,
})

const mapDispatchToProps = (dispatch) => ({
  // TODO why in the hell...
  actions: {
    ...bindActionCreators({
      login,
    }, dispatch),
  },
})

@connect(mapStateToProps, mapDispatchToProps)
class LoginView extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
  }

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
    const {email, password} = this.refs.loginForm.serializeJson()
    this.props.actions.login(email.value, password.value)
  }

  renderErrorMessage() {
    const {error} = this.props.session

    if (error) {
      return (
        <Message className='error'>
          {error.message}
        </Message>
      )
    }
  }

  render() {
    const formClass = cx({
      loading: this.props.session.hasPendingLogin,
      error: this.props.session.error,
    })

    return (
      <div className={classes.loginColumn}>
        <Header.H1 className='center aligned'>
          Welcome to 3 Strand Code
        </Header.H1>
        <Form onSubmit={this.handleSubmit} ref='loginForm' className={formClass}>
          {this.renderErrorMessage()}
          <Field>
            <Input name='email' placeholder='Username' type='text' />
          </Field>
          <Field>
            <Input name='password' placeholder='Password' type='password' />
          </Field>
          <Button type='submit' className='fluid blue'>
            Continue
          </Button>
        </Form>
      </div>
    )
  }
}

export default LoginView
