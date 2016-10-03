console.log('sourced client.js');

var myApp = angular.module('myApp', ['ngRoute']);
var lock = Auth0Lock( 'iIbNnZ1R4Sh6OMUwLSXk2KPF4vAABw0q', 'rgravem.auth0.com' );
var logOutUrl = 'https://rgravem.auth0.com/v2/logout';

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
      when("/home", {
        templateUrl: "/views/partials/home.html",
        controller: "homeController"
      }).
      when("/appetizers", {
        templateUrl: "/views/partials/appetizers.html",
        controller: "appetizersController"
      }).
      when("/desserts", {
        templateUrl: "/views/partials/dessert.html",
        controller: "dessertsController"
      }).
      when("/entrees", {
        templateUrl: "/views/partials/entree.html",
        controller: "entreesController"
      }).
      when("/salads", {
        templateUrl: "/views/partials/salads.html",
        controller: "saladsController"
      }).
      when("/sauces", {
        templateUrl: "/views/partials/sauces.html",
        controller: "saucesController"
      }).
      otherwise({
        redirectTo: "/home"
      });
}]);
