var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    drinksController = require('../controllers/drinks_api_controller.js'),
    usersController = require('../controllers/users_api_controller.js'),
    token = require('./token_auth');


router.route('/users')
      .get(usersController.index)
      .post(usersController.create)

router.route('/users/:id')
      .get(usersController.show)
      .patch(usersController.update)
      .delete(usersController.destroy)

// api/drinks/ routes
router.route('/drinks')
      .get(drinksController.index)
      .post(drinksController.create)

// api/drinks/:id routes
router.route('/drinks/:id')
      .get(drinksController.show)
      .patch(drinksController.update)
      .delete(drinksController.destroy)

module.exports = router
