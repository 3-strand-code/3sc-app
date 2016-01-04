import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {syncReduxAndRouter} from 'redux-simple-router'
import routes from './routes'
import Root from './components/Root/Root'
import configureStore from './redux/configureStore'

const history = createBrowserHistory()
const store = configureStore()

syncReduxAndRouter(history, store, (state) => state.router)

ReactDOM.render(
  <Root
    history={history}
    routes={routes}
    store={store}
  />,
  document.getElementById('root')
)
