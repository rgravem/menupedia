myApp.controller('dessertsController', ['$scope', '$http', function($scope, $http) {
  console.log('test dessertsController');
  $scope.getDesserts = function() {
    $http({
      method: 'GET',
      url: '/desserts'
    }).then(function successCallback(response) {
      $scope.items = response.data;
      console.log('got from server:', response);
    }, function errorCallback(response) {
      console.log('err');
    });// end http call
  }; // end getDesserts
}]);
