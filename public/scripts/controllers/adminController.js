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
        category: $scope.category.type,
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
        console.log('back from server with:', response.data);
        $scope.addedItem = true;
        $scope.newestAdd = response.data;
      }, function errorCallback(response) {
        console.log('err');
      });// end http call
    }; // end addNewItem

    $scope.searchIn = function(){
      console.log('search button clicked sent:', $scope.name);
      $http({
        method: 'GET',
        url: '/items?q=' + $scope.name,
      }).then(function successCallback(response){
        console.log('back with:', response.data);
        $scope.search = true;
        $scope.items = response.data;
      }, function errorCallback(response){
        console.log(response);
      }); // end query call
    }; // end search

    $scope.showAll = function(){
      console.log('get all button clicked');
      $http({
        method: 'GET',
        url: '/showAll',
      }).then(function successCallback(response){
        console.log('back with:', response.data);
        $scope.search = true;
        $scope.items = response.data;
      }, function errorCallback(response){
        console.log(response);
      }); // end query call
    }; // end search

    $scope.deleteItem = function(){
      console.log('delete button clicked');
      if (confirm('Are you sure you want to delete this?')) {
      var objectToSend = { id: this.searchResult._id };
      console.log(objectToSend);
      $http({
        method: 'DELETE',
        url:'/deleteItem',
        data: objectToSend,
        headers: {'Content-Type': 'application/json;charset=utf-8'}
      }).then(function(response){
        console.log('deleted from menu:', response.data);
        location.reload();
      });
      }
    };

}]);
