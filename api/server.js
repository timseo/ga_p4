var express   = require('express'),
  	app         = express(),
  	logger      = require('morgan'),
  	bodyParser	= require('body-parser'),
  	mongoose    = require('mongoose'),
  	port        = process.env.PORT || 3000,
  	drinkRoutes  = require('./config/drink_routes.js'),
    userRoutes = require('./config/user_routes.js')

//establish connection to mongo database
mongoose.connect('mongodb://localhost/brewskerdb')

//log requests made to the app
app.use(logger('dev'))

//make json objects available in requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//mount beanRoutes at /api/beans
app.use('/api/drinks', drinkRoutes)
// mounts userRoutes at /api/users
app.use('/api/users', userRoutes)


//run the web server
app.listen(port, function(){
	console.log('Andre', port)
})
