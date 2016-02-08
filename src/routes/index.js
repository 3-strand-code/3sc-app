import React from 'react'
import { Route, Redirect, IndexRoute } from 'react-router'
import requireAuth from './hooks/requireAuth'
import sendToProtectedRoute from './hooks/sendToProtectedRoute'

import AppLayout from 'layouts/AppLayout/AppLayout'
import Dashboard from 'views/Dashboard/Dashboard'
import HomeView from '../views/HomeView/HomeView'
import NotFoundView from 'views/NotFoundView/NotFoundView'

export default (
  <Route path='/'>
    <IndexRoute component={HomeView} onEnter={sendToProtectedRoute} />
    <Route path='/404' component={NotFoundView} />
    <Route onEnter={requireAuth} component={AppLayout}>
      <Route path='/dashboard' component={Dashboard} />
    </Route>
    <Redirect from='*' to='/404' />
  </Route>
)
