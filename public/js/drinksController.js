angular.module('Brewsker')
  .controller('DrinksController', DrinksController)
  .controller('DrinksNewController', DrinksNewController);

DrinksController.$inject = ['$http', 'authService'];
DrinksNewController.$inject = ['$http', '$state', 'authService'];

function DrinksController($http, authService){
  var self = this;
  self.authService = authService;
  self.all = [];
  self.getDrinks = getDrinks;
  // self.destroyDrinks = destroyDrinks;

  getDrinks();
  function getDrinks(){
    $http
      .get('/drinks')
      .then(function(response){
        self.all = response.data;
    });
  }

}

function DrinksNewController($http, $state, authService){
  var self = this;
  self.authService = authService;
  self.addDrink = addDrink;
  self.newDrink = {};
  self.destroyDrinks = destroyDrinks;

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

  function destroyDrinks(drink){
    $http
      .delete("/drinks/" + drink._id)
      .then(function(response){
        var index = self.all.indexOf(drink);
        self.all.splice(index, 1);
      });
  }

}
