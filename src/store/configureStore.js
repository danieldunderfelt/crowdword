import { createStore, applyMiddleware, compose } from 'redux'
import { reduxReactRouter } from 'redux-router'
import DevTools from '../containers/DevTools'
import routes from '../routes'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import rootReducer from '../reducers'
import ifDev from '../helpers/ifDev'

if (__CLIENT__) var createHistory = require('history/lib/createBrowserHistory')
else var createHistory = require('history/lib/createMemoryHistory')

const finalCreateStore = compose(
    applyMiddleware(thunk, promise),
    reduxReactRouter({createHistory, routes}),
    ifDev(DevTools.instrument())
)(createStore)

export default initialState => {
    const store = finalCreateStore(rootReducer, initialState)

    if (__DEVELOPMENT__ && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}