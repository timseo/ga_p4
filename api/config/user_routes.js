var express = require('express'),
    router = express.Router(),
    {index, create, show, update, destroy} = require('../controllers/users_api_controller.js')

router.route('/')
      .get(index)
      .post(create)

router.route('/:id')
      .get(show)
      .patch(update)
      .delete(destroy)


module.exports = router 
