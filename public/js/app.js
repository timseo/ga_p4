angular
  .module('Brewsker', ['ui.router'])
  .config(DrinkRouter);

function DrinkRouter($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'index.html',
    controller: 'DrinksController',
    controllerAs: 'drinkCtrl'
  })
  .state('newdrink', {
    url: '/new',
    templateUrl: 'newdrink.html',
    controller: 'DrinksNewController',
    controllerAs: 'drinknewCtrl'
  })
  .state('about', {
    url: '/about',
    templateUrl: 'about.html'
  })
  .state('signin', {
  url: '/signin',
  templateUrl: 'signin.html',
  controller: 'SignInController',
  controllerAs: 'vm'
});
}
