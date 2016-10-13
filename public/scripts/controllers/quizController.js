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
  var questionM = [];
  var questionA = [];
  $scope.questionM = [];
  $scope.questionA = [];
  $scope.addMultiQ = function(){
    $scope.questionM.push({
      question: "",
      text: ""
    });
  };// end addMultiQ
  $scope.addShortA = function(){
    $scope.questionA.push({
      question: "",
      text: ""
    });
  }; // end addShortA

  $scope.addQuestion = function(shortA){
    console.log('addQuiz button hit');
    console.log('answer:',shortA.value);
    console.log('question:', shortA.question);
    var objectToSend = {
      quizname: $scope.quizName,
      question: shortA.question,
      answer: shortA.value
    };
  console.log(objectToSend);
  $http({
    method: 'POST',
    url: '/addQuizShort',
    data: objectToSend
  }).then(function successCallback(response){
    console.log('back from server with:', response.data);
  }, function errorCallback(response) {
    console.log('err');
  });// end http call
  }; // end addQuestion

  $scope.addQuestionM = function(multi){
    console.log('multi add hit');
    console.log('question:', multi.question);
    var objectToSend = {
      quizname: $scope.quizName,
      question: multi.question,
      a: multi.optA,
      b: multi.optB,
      c: multi.optC,
      d: multi.optD,
      answer: "placeholder"
    };
    if(multi.correctAnswerA){
      objectToSend.answer = multi.optA;
    }else if (multi.correctAnswerB){
      objectToSend.answer = multi.optB;
    }else if (multi.correctAnswerC){
      objectToSend.answer = multi.optC;
    }else if (multi.correctAnswerD){
      objectToSend.answer = multi.optD;
    }
    console.log(objectToSend);
    $http({
      method: 'POST',
      url: '/addQuizMulti',
      data: objectToSend
    }).then(function successCallback(response){
      console.log('back from server with:', response.data);
    }, function errorCallback(response) {
      console.log('err');
    });// end http call
  }; // end addQuestionM

  $scope.finishedQuiz = function(){
    var objectToSend = {
      quizname: $scope.quizName
    };
    $http({
      method: 'POST',
      url: '/addQuiz',
      data: objectToSend
    }).then(function successCallback(response){
      console.log('back from server with:', response.data);
    }, function errorCallback(response) {
      console.log('err');
    });// end http call
  }; // end finishedQuiz

  $scope.getQuizzes = function(){
    $http({
      method: 'GET',
      url: '/getQuizzes'
    }).then(function successCallback(response) {
      $scope.quizzes = response.data;
      console.log('scope.quiz',$scope.quizzes);
      console.log('got from server:', response);
    }, function errorCallback(response) {
      console.log('err');
    });// end http call
  }; // end getQuizzes

  $scope.selectQuiz = function(){
    var objectToSend = {
      quizname: $scope.selectedQuiz.quizName
    };
    console.log('objectToSend:', objectToSend);
    $http({
      method: 'POST',
      url: '/findQuiz',
      data: objectToSend
    }).then(function successCallback(response){
      console.log('back from server with:', response.data);
    }, function errorCallback(response){
      console.log('err');
    });
  }; // end selectQuiz
}]); // end quizController
