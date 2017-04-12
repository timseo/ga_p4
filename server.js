var express      = require('express'),
    path         = require('path'),
  	app          = express(),
    cors         = require('cors'),
  	logger       = require('morgan'),
  	bodyParser	 = require('body-parser'),
  	mongoose     = require('mongoose'),
  	port         = process.env.PORT || 8080,
    routes       = require('./config/routes.js')

require('dotenv').config();
//establish connection to mongo database
var dbUri = process.env.MONGODB_URI || 'mongodb://localhost/brewskerdb'
mongoose.connect(dbUri)

app.use(cors())

//log requests made to the app
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

//make json objects available in requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(validateContentType)

//mount beanRoutes at /api/beans
app.use(routes)
// mounts userRoutes at /api/users
// app.use('/api/users', routes)

app.use(addFailedAuthHeader)


//run the web server
// app.listen(port, function(){
// 	console.log('Andre', port)
// })

module.exports = app


// for authentication

function validateContentType(req, res, next) {
  var methods = ['PUT', 'PATCH', 'POST'];
  if (                                    // If the request is
    methods.indexOf(req.method) !== -1 && // one of PUT, PATCH or POST, and
    Object.keys(req.body).length !== 0 && // has a body that is not empty, and
    !req.is('json')                       // does not have an application/json
  ) {                                     // Content-Type header, then …
    var message = 'Content-Type header must be application/json.';
    res.status(400).json(message);
  } else {
    next();
  }
}

// When there is a 401 Unauthorized, the repsonse shall include a header
// WWW-Authenticate that tells the client how they must authenticate
// their requests.
function addFailedAuthHeader(err, req, res, next) {
  var header = {'WWW-Authenticate': 'Bearer'};
  if (err.status === 401) {
    if (err.realm) header['WWW-Authenticate'] += ` realm="${err.realm}"`;
    res.set(header);
  }
  next(err);
}
