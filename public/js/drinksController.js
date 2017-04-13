angular.module('Brewsker')
  .controller('DrinksController', DrinksController)
  .controller('DrinksNewController', DrinksNewController);

DrinksController.$inject = ['$http'];
DrinksNewController.$inject = ['$http', '$state'];

function DrinksController($http){
  var self = this;
  self.all = [];
  self.getDrinks = getDrinks;
  self.destroyDrinks = destroyDrinks;

  getDrinks();
  function getDrinks(){
    $http
      .get('/drinks')
      .then(function(response){
        self.all = response.data;
    });
  }

  function destroyDrinks(drinks){
    $http
      .delete("/drinks/" + drink._id)
      .then(function(response){
        var index = self.all.indexOf(drink);
        self.all.splice(index, 1);
      });
  }
}

function DrinksNewController($http, $state){
  var self = this;
  self.addDrink = addDrink;
  self.newDrink = {};

// move to factory when refactoring
  function getDrinks(){
    $http
      .get('/drinks')
      .then(function(response){
        self.all = response.data;
    });
  }

getDrinks()

  function addDrink(){
    $http
      .post('/drinks', self.newDrink)
      .then(function(response){
        getDrinks()
        $state.go('newdrink')
    })
    self.newDrink = {}
  }
}
