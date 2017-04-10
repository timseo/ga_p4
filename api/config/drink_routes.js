var express = require('express'),
    router = express.Router(),
    {index, create, show, update, destroy} = require('../controllers/drinks_api_controller.js')

// api/drinks/ routes
router.route('/')
      .get(index)
      .post(create)

// api/drinks/:id routes
router.route('/:id')
      .get(show)
      .patch(update)
      .delete(destroy)


module.exports = router
