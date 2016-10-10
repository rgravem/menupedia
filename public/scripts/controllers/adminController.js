myApp.controller('adminController', ['$scope', '$http', function($scope, $http) {
    console.log('in adminController');
    $scope.checkAdmin = function(){
      console.log('in check admin, role:', role);
      if (role > 1) {
        $scope.admin = true;
      }else{
        $scope.admin = false;
      }
    }; // end checkAdmin

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
    }); // end enum

    $scope.addNewItem = function(){
      console.log('add new item clicked');
      var objectToSend = {
        categroy: $scope.category,
        name: $scope.name,
        ingredients: $scope.ingredients,
        sauces: $scope.sauces,
        allergies: $scope.allergies,
        accomidations: $scope.accomidations
      };
      console.log('objectToSend:', objectToSend);
      $http({
        method: 'POST',
        url: '/addNewItem',
        data: objectToSend
      }).then(function successCallback(response){
        console.log('back from server with:', response);
      });
    }; // end addNewItem

}]);
