import _ from 'lodash'
import autobind from 'autobind-decorator'
import cx from 'classnames'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Button,
  Field,
  Form,
  Input,
  List,
  ListItem,
  Message,
  Segment,
} from 'stardust'

import { login } from 'services/session'

const FORM_SETTINGS = {
  // stop Semantic UI from submitting form
  onSuccess: () => false,
}

export default class LoginForm extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    className: PropTypes.string,
    session: PropTypes.object.isRequired,
  };

  @autobind
  handleSubmit(e) {
    e.preventDefault()
    if (!this.isFormValid()) return
    const { email, password } = this.getCredentials()
    this.props.actions.login(email, password)
  }

  @autobind
  getCredentials() {
    const { email, password } = this.refs.form.plugin('get values')
    return { email, password }
  }

  @autobind
  isFormValid() {
    return this.refs.form.plugin('is valid')
  }

  renderErrorMessage() {
    const { error } = this.props.session

    const fieldErrors = _.map(_.omit(error, 'non_field_errors'), (val, key) => {
      return (
        <div>
          <b>{key}</b>
          {_.map(val, msg => <div>{msg}</div>)}
        </div>
      )
    })

    return !error ? null : (
      <Message className='error'>
        {_.get(error, 'non_field_errors')}
        {fieldErrors}
      </Message>
    )
  }

  render() {
    const { className, session } = this.props
    const formClasses = cx(className, {
      loading: session.hasPendingLogin,
      error: session.error,
    })

    return (
      <Segment className='stacked'>
        <Form settings={FORM_SETTINGS} onSubmit={this.handleSubmit} className={formClasses} ref='form'>
          {this.renderErrorMessage()}
          <Field>
            <Input
              className='left icon'
              name='email'
              type='text'
              placeholder='Email'
              icon='envelope'
            />
          </Field>
          <Field>
            <Input
              className='left icon'
              name='password'
              type='password'
              placeholder='Password'
              icon='lock'
            />
          </Field>
          <Button type='submit' className='fluid blue'>
            Login
          </Button>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    login,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

