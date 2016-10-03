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

myApp.controller('authController', ['$scope', '$http', function($scope, $http){
  console.log('NG');
// run controller on load
  $scope.init = function(){
    console.log('in init');
    //check for user info in localStorage
    if( JSON.parse(localStorage.getItem( 'userProfile' ))){
      // if found, save userProfile as $scope.userProfile
      $scope.userProfile = JSON.parse( localStorage.getItem( 'userProfile'));
      console.log( 'logged in as:', $scope.userProfile );
      $scope.showUser = true;
    }else{
      // if no info saved, make sure empty
      emptyLocalStorage();
      $scope.showUser = false;
    }
  }; // end init

  $scope.logIn = function(){
  console.log('in logIn');
  lock.show( function( err, profile, token ){
    if(err){
      console.log('err:', err);
    }else{
      localStorage.setItem( 'userToken', token );
      console.log( 'token:', token );
      localStorage.setItem( 'userProfile', JSON.stringify( profile ) );
      console.log('Auth0 success, Profile:', profile);
      location.reload();
    }
  });
}; // end logIn
$scope.logOut = function(){
    // call out logOutUrl
    emptyLocalStorage();
    location.reload();
    // $http({
    //   method: 'GET',
    //   url: logOutUrl,
    // }).then( function(data){
    //   // if logged out OK
    //   if(data.data == 'OK'){
    //     // empty localStorage
    //     emptyLocalStorage();
    //     $scope.showUser = false;
    //   }
    // });
  }; // end logout

$scope.init();
}]);

var emptyLocalStorage = function(){
  localStorage.removeItem('userProfile');
  localStorage.removeItem( 'userToken' );
};
