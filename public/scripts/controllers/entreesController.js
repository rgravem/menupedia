myApp.controller('entreesController', ['$scope', '$http', function($scope, $http) {
  console.log('test entreesController');
  $scope.getEntrees = function() {
    $http({
      method: 'GET',
      url: '/entrees'
    }).then(function successCallback(response) {
      $scope.items = response.data;
      console.log('got from server:', response);
    }, function errorCallback(response) {
      console.log('err');
    });// end http call
  }; // end getSalads

}]);
