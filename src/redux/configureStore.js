import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'

export default function configureStore(initialState) {
  let createStoreWithMiddleware
  const middleware = applyMiddleware(thunk)

  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      require('../components/DevTools/DevTools').instrument()
    )
  } else {
    createStoreWithMiddleware = compose(middleware)
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer,
    initialState
  )
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer')

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
