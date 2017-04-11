var mongoose = require('mongoose'),
    Drink = require('./drink.js');

var userSchema = new mongoose.Schema({
      email: String,
      password: String,
      favorite: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Drink',
        userCounter: Number
      }]
    });


var User = mongoose.model('User', userSchema);

module.exports = User
