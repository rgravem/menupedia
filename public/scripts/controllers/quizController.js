myApp.controller('quizController', ['$scope', '$http', function($scope, $http) {
  console.log('test quizController');
  $scope.checkAdmin = function(){
    console.log('in check admin, role:', role);
    if (role > 1) {
      $scope.admin = true;
    }else{
      $scope.admin = false;
    }
  }; // end checkAdmin
  $scope.questionM = [];
  $scope.questionA = [];
  $scope.addMultiQ = function(){
    $scope.questionM.push({
      question: "",
      text: ""
    });
  };
  $scope.addShortA = function(){
    $scope.questionA.push({
      // question: "",
      // text: ""
    });
  };
}]);
