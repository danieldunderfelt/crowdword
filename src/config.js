module.exports = {
	development: {
		isProduction: false,
		port: process.env.PORT,
		app: {
			name: 'Onemetric development'
		}
	},
	production: {
		isProduction: true,
		port: process.env.PORT,
		app: {
			name: 'Onemetric production'
		}
	}
}[process.env.NODE_ENV || 'development'];