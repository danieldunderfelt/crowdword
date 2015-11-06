import { createStore, applyMiddleware, compose } from 'redux'
import { reduxReactRouter } from 'redux-router'
import DevTools from '../containers/DevTools'
import createHistory from 'history/lib/createBrowserHistory'
import routes from '../routes'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import rootReducer from '../reducers'
import ifDev from '../helpers/ifDev'

const finalCreateStore = compose(
	applyMiddleware(thunk, promise),
	reduxReactRouter({ createHistory, routes }),
	ifDev(applyMiddleware(createLogger())),
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