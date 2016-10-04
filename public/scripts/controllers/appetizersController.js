myApp.controller('appetizersController', ['$scope', '$http', function($scope, $http) {
  console.log('test appetizersController');
  $scope.getAppetizers = function() {
    $http({
      method: 'GET',
      url: '/appetizers'
    }).then(function successCallback(response) {
      $scope.items = response.data;
      console.log('got from server:', response);
    }, function errorCallback(response) {
      console.log('err');
    });// end http call
  }; // end getAppetizers

}]);
