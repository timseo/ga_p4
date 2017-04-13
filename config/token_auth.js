var jwt = require('jsonwebtoken');
var User = require('../models/user.js');
require('dotenv').config();

 module.exports = {
   create:       create,
   refresh:      refresh,
   authenticate: authenticate
 };

 // ************************** TOKEN STRUCTURE **************************

 // Defines the JWTs contents, or payload, given a user object. Make
 // changes to what your token looks like here.
 function extractPayload(user, options) {
   return {
    _id: user._id,
    email: user.email,
    use:  'public_api'
   };
 }

 var jwtOptions = {
   algorithm: 'HS256',
   expiresIn: '7 days'
 };

 // ******************************** API ********************************

 function create(req, res, next) {
   console.log("Checking credentials for existing user...")
   if (!req.body.email || !req.body.password) {
     var message = 'Missing required fields: email and password';
     return res.status(422).json(message);
   }
   User
     .findOne({email: req.body.email}).exec()
     .then(function(user) {
       console.log("About to verify login credentials...")
       if (!user || !user.verifyPasswordSync(req.body.password)) {
         console.log("Someone tried to unsuccessfully log in...")
         console.log(req.body)
         var message = 'User not found or password incorrect.';
         return res.status(403).json({message});
       }

       var token = generateJwt(user);

       res.json(token);
     });
 }


 function refresh(req, res, next) {
   User
     .findById(req.decoded._id).exec()
     .then(function(user) {
       var token = generateJwt(user);

       res.json(token);
     });
 }


 function authenticate(req, res, next) {
   var token = findTokenInAuthHeader(req);
   if (!token) return next({status: 401, message: 'Authenticate with token.'});

   verifyJwtAndHandleErrors(token, next, function(decoded) {
     req.decoded = decoded;
     next();
   });
 }

 // ****************************** HELPERS ******************************

 function generateJwt(user, options) {
   console.log("about to sign token using token secret...")
   console.log(process.env.TOKEN_SECRET)
   return jwt.sign(
     extractPayload(user, options),
     process.env.TOKEN_SECRET,
     jwtOptions
   );
 }


 function findTokenInAuthHeader(req) {
   var token;

   var header = req.get('Authorization');
   if (!header) header = req.get('Authorisation');

   if (header) {
     var match = header.match(/(bearer|token) (.*)/i);
     token = match ? match[2] : match;
   }

   if (!token) {
     token = req.query.token;
   }

   return token;
 }


 function verifyJwtAndHandleErrors(token, next, cb) {
   jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
     if (err && err.name === 'TokenExpiredError') {
       next({
         status:  401,
         message: 'Authorization failed (invalid_token): token expired.'
       });
     } else if (err) {
       next({
         status:  401,
         message: 'Authorization failed (invalid_token): token malformed.'
       });
     } else {
       cb(decoded);
     }
   });
 }
