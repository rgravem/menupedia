myApp.controller('saladsController', ['$scope', '$http', function($scope, $http) {
  console.log('test saladsController');
  $scope.getSalads = function() {
    $http({
      method: 'GET',
      url: '/salads'
    }).then(function successCallback(response) {
      $scope.items = response.data;
      console.log('got from server:', response);
    }, function errorCallback(response) {
      console.log('err');
    });// end http call
  }; // end getSalads

}]);
