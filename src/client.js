import 'isomorphic-fetch'
import es6Promise from 'es6-promise'
es6Promise.polyfill()

import 'babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from './routes'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { ReduxRouter } from 'redux-router'

const store = configureStore()
const dest = document.getElementById('content')
const component = (
	<ReduxRouter />
)

ReactDOM.render(
	<Provider store={store} key="provider">
		{component}
	</Provider>,
	dest
)

if (process.env.NODE_ENV !== 'production') {
  window.React = React // enable debugger
  const reactRoot = window.document.getElementById('content')

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.')
  }
}

if (__DEVTOOLS__) {
	const DevTools = require('./containers/DevTools');
	ReactDOM.render(
		<Provider store={store} key="provider">
			<div>
				{component}
				<DevTools />
			</div>
		</Provider>,
		dest
	);
}