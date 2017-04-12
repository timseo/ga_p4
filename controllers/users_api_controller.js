var User = require('../models/user.js')

function index(req, res){
  User.find({}, function(err, users){
    if(err) res.status(404).send(err)
    res.status(200).send(users)
  })
}


function create(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send('Missing required fields');
  }
  User
    .create(req.body)
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully created user.',
        data: {
          email: user.email,
          id:    user._id
        }
      });
    }).catch(function(err) {
      console.log("Problem logging in :( boo...")
      if (err.message.match(/E11000/)) {
        err.status = 409;
      } else {
        err.status = 422;
      }
      next(err);
    });
};


function show(req, res){
  User.find({_id: req.params.id}, function(err, user){
    if(err) res.status(404).send(err)
    res.status(200).send(user)
  })
}


function update(req, res){
  User.findById({_id: req.params.id}, function(err, user){
    if(err) res.status(404).send(err)
    if(req.body.email) user.email = req.body.email
    if(req.body.password) user.password = req.body.password

    user.save(function(err){
      if(err) res.status(500).send(err)
      res.status(200).send(user)
    })
  })
}


function destroy(req, res){
  User.remove({_id: req.params.id}, function(err){
    if(err) res.status(500).send(err)
    res.status(200).send({message: "User deleted."})

  })
}


module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
}
