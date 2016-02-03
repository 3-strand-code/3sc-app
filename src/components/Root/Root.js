import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired,
  }

  render() {
    let devTools
    if (__DEBUG__) {
      const DevTools = require('../DevTools/DevTools')
      devTools = <DevTools />
    }

    return (
      <Provider store={this.props.store}>
        <div>
          <Router history={this.props.history}>
            {this.props.routes}
          </Router>
          {devTools}
        </div>
      </Provider>
    )
  }
}

export default Root
