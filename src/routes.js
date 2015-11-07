import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './containers/App'
import Home from './components/Home'

export default (
	<Route component={ App } path="/">
		<IndexRoute component={ Home } />
	</Route>
)