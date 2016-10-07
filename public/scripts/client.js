console.log('sourced client.js');

var myApp = angular.module('myApp', ['ngRoute']);
var lock = Auth0Lock( 'BXdX9d8IIlDuwXRsitOdrrwzIDtnD9z2', 'rgravem.auth0.com' );
var logOutUrl = 'https://rgravem.auth0.com/v2/logout';
var role = 1;
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
      checkRole();
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
    $http({
      method: 'GET',
      url: logOutUrl,
    }).then( function(data){
      // if logged out OK
      if(data.data == 'OK'){
        // empty localStorage
        console.log('logged out');
        emptyLocalStorage();
        $scope.showUser = false;
        location.reload();
      }
    });
  }; // end logout
  var checkRole = function(){
    console.log('checking role');
    var objectToSend = {
    name: $scope.userProfile.name,
    email: $scope.userProfile.email,
    role: 1
    };
    console.log('sending:', objectToSend);
    $http({
    method: 'POST',
    url:'/checkUser',
    data: objectToSend
    }).then(function(data){
    console.log('got back from server with:', data);
    if (data.data[0] == undefined) {
      $http({
        method: 'POST',
        url:'/addUser',
        data: objectToSend
      }).then(function(data){
        console.log('added user:', data);

      }); // end add user
    } else{
      console.log('role from db:', data.data[0].role);
      role = data.data[0].role;
      console.log('role:', role);
  } // end else
  });
  };
$scope.init();

}]);

var emptyLocalStorage = function(){
  localStorage.removeItem('userProfile');
  localStorage.removeItem( 'userToken' );
};
