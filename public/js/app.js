angular
  .module('Brewsker', ['ui.router'])
  .config(DrinkRouter);

function DrinkRouter($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'list.html',
    controller: 'DrinksController',
    controllerAs: 'listVm'
  })
  .state('newdrink', {
    url: '/new',
    templateUrl: 'newdrink.html',
    controller: 'DrinksNewController',
    controllerAs: 'newVm'
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
