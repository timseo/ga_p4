var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    drinksController = require('../controllers/drinks_api_controller.js'),
    usersController = require('../controllers/users_api_controller.js'),
    token = require('./token_auth')



router.route('/users')
      .get(usersController.index)
      .post(usersController.create)

router.route('/users/token')
      .post(token.create)

router.route('/users/:id')
      .get(token.authenticate, usersController.show)
      .patch(token.authenticate, usersController.update)
      .delete(token.authenticate, usersController.destroy)

// api/drinks/ routes
router.route('/drinks')
      .get(drinksController.getDrinks)
      .post(drinksController.createDrinks)

// api/drinks/:id routes
router.route('/drinks/:id')
      .get(drinksController.showDrinks)
      .patch(drinksController.updateDrinks)
      .delete(drinksController.destroyDrinks)

module.exports = router
