import React, {Component, PropTypes} from 'react'
import ReactDOM from '../../node_modules/react-dom/server'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
	static propTypes = {
		assets: PropTypes.object,
		component: PropTypes.object,
		store: PropTypes.object
	}

	render() {
		const {assets, component} = this.props
		const content = ReactDOM.renderToString(component)

		return (
			<html lang="en-us">
			<head>
				<meta charSet="utf-8"/>
				{Helmet.rewind()}

				{/* styles (will be present only in production with webpack extract text plugin) */}
				{Object.keys(assets.styles).map((style, key) =>
						<link href={assets.styles[style]} key={key} media="screen, projection"
						      rel="stylesheet" type="text/css"/>
				)}
			</head>
			<body>
			<div id="content" dangerouslySetInnerHTML={{__html: content}}/>
			<script src={assets.javascript.main}/>
			</body>
			</html>
		)
	}
}
