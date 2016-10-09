myApp.controller('adminController', ['$scope', '$http', function($scope, $http) {
    console.log('in adminController');
    $scope.checkAdmin = function(){
      console.log('in check admin, role:', role);
      if (role > 1) {
        $scope.admin = true;
      }else{
        $scope.admin = false;
      }
    };

    $http({
      method: 'GET',
      url: '/enum'
    }).then(function successCallback(response) {
      $scope.enum = response.data.map(function(type) {
        return {type: type };
      });
      $scope.selected = $scope.enum[0];
      console.log('enum =', $scope.enum);
    }, function errorCallback(response) {
      console.log('err');
    });

}]);
