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
  questionM.push(question);
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
      correct: "placeholder"
    };
    if(multi.correctAnswerA){
      multiQ.correct = multi.optA;
    }else if (multi.correctAnswerB){
      multiQ.correct = multi.optB;
    }else if (multi.correctAnswerC){
      multiQ.correct = multi.optC;
    }else if (multi.correctAnswerD){
      multiQ.correct = multi.optD;
    }
    console.log(multiQ);
  };
}]); // end quizController