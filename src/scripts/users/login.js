module.exports = angular.module('app.user.login', ['firebase'])
  .factory('loginService', function($rootScope, $firebaseSimpleLogin, $timeout, FirebaseRef){
    var auth = null;

    function assertAuth() {
      if( auth === null ) { throw new Error('Must call loginService.init() before using its methods'); }
    }
    return {
      init: function() {
        return auth = $firebaseSimpleLogin(FirebaseRef(''));
      },
      login: function(email, pass, callback) {
         assertAuth();
         auth.$login('password', {
            email: email,
            password: pass,
            rememberMe: true
         }).then(function(user) {
               if( callback ) {
                  callback(null, user);
               }
            }, callback);
      },

      logout: function() {
         assertAuth();
         auth.$logout();
      }
    }
  })
  .controller('LoginCtrl', function($scope, loginService){
    $scope.email = null;
    $scope.pass = null;

    $scope.login = function(cb) {
      $scope.err = null;
      if( !$scope.email ) {
        $scope.err = 'Please enter an email address';
      }
      else if( !$scope.pass ) {
        $scope.err = 'Please enter a password';
      }
      else {
        loginService.login($scope.email, $scope.pass, function(err, user) {
          $scope.err = err? err + '' : null;
            if( !err ) {
              cb && cb(user);
            }
        });
      }
    };


  })
;

