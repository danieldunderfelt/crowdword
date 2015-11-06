import merge from 'lodash/object/merge'
import { routerStateReducer } from 'redux-router'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	router: routerStateReducer
})

export default rootReducer