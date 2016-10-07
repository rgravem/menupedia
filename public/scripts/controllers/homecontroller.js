myApp.controller('homeController', ['$scope', '$http', function($scope, $http) {
  console.log('test homeController');
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

  $scope.searchIn = function(){
    console.log('search button clicked sent:', $scope.search);
    $http({
      method: 'GET',
      url: '/items?q=' + $scope.search,
    }).then(function successCallback(response){
      console.log('back with:', response.data);
      $scope.items = response.data;
    }, function errorCallback(response){
      console.log(response);
    }); // end query call
  }; // end search

}]);
