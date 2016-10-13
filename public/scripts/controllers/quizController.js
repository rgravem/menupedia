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
    var question = {
      question: shortA.question,
      answer: shortA.value
    };
  questionA.push(question);
  console.log(questionA);
  }; // end addQuestion

  $scope.addQuestionM = function(multi){
    console.log('multi add hit');
    console.log('question:', multi.question);
    var multiQ = {
      question: multi.question,
      a: multi.optA,
      b: multi.optB,
      c: multi.optC,
      d: multi.optD,
      answer: "placeholder"
    };
    if(multi.correctAnswerA){
      multiQ.answer = multi.optA;
    }else if (multi.correctAnswerB){
      multiQ.answer = multi.optB;
    }else if (multi.correctAnswerC){
      multiQ.answer = multi.optC;
    }else if (multi.correctAnswerD){
      multiQ.answer = multi.optD;
    }
    console.log(multiQ);
    questionM.push(multiQ);
    console.log(questionM);
  }; // end addQuestionM

  $scope.finishedQuiz = function(){
    var objectToSend = {
      quizname: $scope.quizName
    };
    objectToSend.questionA = questionA;
    objectToSend.questionM = questionM;
    console.log('objectToSend ', objectToSend);

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
}]); // end quizController
