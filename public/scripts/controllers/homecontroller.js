myApp.controller('homeController', ['$scope', function($scope) {
  console.log('test homeController');
// run controller on load
  $scope.init = function(){
    console.log('in init');
    //check for user info in localStorage
    if( JSON.parse(localStorage.getItem( 'userProfile' ))){
      // if found, save userProfile as $scope.userProfile
      $scope.userProfile = JSON.parse( localStorage.getItem( 'userProfile'));
      console.log( 'logged in as:', $scope.userProfile );
      $scope.showUser = true;
    }else{
      // if no info saved, make sure empty
      emptyLocalStorage();
      $scope.showUser = false;
    }
  }; // end init

  $scope.logIn = function(){
  console.log('in logIn');
  lock.show( function( err, profile, token ){
    if(err){
      console.log('err:', err);
    }else{
      localStorage.setItem( 'userToken', token );
      console.log( 'token:', token );
      localStorage.setItem( 'userProfile', JSON.stringify( profile ) );
      console.log('Auth0 success, Profile:', profile);
      location.reload();
    }
  });
}; // end logIn
$scope.logOut = function(){
    // call out logOutUrl
    $http({
      method: 'GET',
      url: logOutUrl,
    }).then( function(data){
      // if logged out OK
      if(data.data == 'OK'){
        // empty localStorage
        emptyLocalStorage();
        $scope.showUser = false;
      }
    });
  }; // end logout

$scope.init();
}]);
