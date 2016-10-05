myApp.controller('saucesController', ['$scope', '$http', function($scope, $http) {
  console.log('test saucesController');
  $scope.getSauces = function() {
    $http({
      method: 'GET',
      url: '/sauces'
    }).then(function successCallback(response) {
      $scope.items = response.data;
      console.log('got from server:', response);
    }, function errorCallback(response) {
      console.log('err');
    });// end http call
  }; // end getSauces
}]);
