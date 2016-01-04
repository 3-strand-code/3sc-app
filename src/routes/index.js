import React from 'react'
import {Route, Redirect, IndexRoute} from 'react-router'
import requireAuth from './hooks/requireAuth'
import sendToProtectedRoute from './hooks/sendToProtectedRoute'

import PageLayout from 'layouts/PageLayout/PageLayout'
import Dashboard from 'views/Dashboard/Dashboard'
import LoginView from 'views/LoginView/LoginView'
import NotFoundView from 'views/NotFoundView/NotFoundView'

export default (
  <Route path='/' component={PageLayout}>
    <IndexRoute component={LoginView} onEnter={sendToProtectedRoute} />
    <Route path='/login' component={LoginView} />
    <Route path='/404' component={NotFoundView} />
    <Route onEnter={requireAuth}>
      <Route path='/dashboard' component={Dashboard} />
    </Route>
    <Redirect from='*' to='/404' />
  </Route>
)
