var mongoose = require('mongoose')



var drinkSchema = new mongoose.Schema({
        drinkName: String,
        drinkImage: String,
        drinkCounter: Number
})

var Drink = mongoose.model('Drink', drinkSchema)



module.exports = Drink
