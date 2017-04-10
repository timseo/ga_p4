var Drink = require('../models/drink.js')


function index(req, res){
  Drink.find({}, function(err, drinks){
    if(err) res.status(404).send(err)
    res.status(200).send(drinks)
  })
}

function create(req, res, next){
  var drink = new Drink(req.body)
      drink.save(function(err, drink){
        if(err) res.status(500).send(err)
        res.status(201).send(drink)
      })
}

function show(req, res){
  Drink.find({_id: req.params.id}, function(err, drink){
    if(err) res.status(404).send(err)
    res.status(200).send(drink)
  })
}

function update(req, res){
  Drink.findById({_id: req.params.id}, function (err, drink){
    if (err) res.status(404).send(err)

    if (req.body.drinkName) drink.drinkName = req.body.drinkName
    if (req.body.drinkImage) drink.drinkImage = req.body.drinkImage

    // drinkCounter needs to be incremented on click from front end
    if(req.body.drinkCounter) drink.drinkCounter = req.body.drinkCounter

    drink.save(function(err){
      if(err) res.status(500).send(err)
      res.status(200).send(drink)
    })
  })
}

function destroy(req, res){
  Drink.remove({_id: req.params.id}, function(err){
    if(err) res.status(500).send(err)
    res.status(200).send({message: "Drink has been deleted."})
  })
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
}
