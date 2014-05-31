
angular.module('app', [
  'ui.router',
  'firebase',
  require('./projects').name,
  require('./users').name,
  require('./assignments').name,
  require('./config.js').name,
])
.factory('FirebaseRef', function(FBURL){
    return function(ref) {
      var baseUrl = FBURL;
      return new Firebase(baseUrl+ref);
    }
})
.controller('AppCtrl', function($scope, VERSION, loginService){
	$scope.version = VERSION;
  $scope.logout = function() {
    loginService.logout();
  };
  $scope.currentUser = loginService.currentUser;
})
.filter('firebaseFilter', function(){

  return function(input, query){
    if(!query) return input;
    var result = {};
    angular.forEach(input, function(assignment, id){
      if(!assignment) {
        return;
      }
      for(var key in query) {
        if(assignment[key] != query[key]) {
          return;
        }
      }
      result[id] = assignment;                
    });
    return result;
  };
})
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      views: {
        "header": { templateUrl: "partials/header.html" },
        "footer": { templateUrl: "partials/footer.html" },
        "content": { templateUrl: "partials/users/login.html" }
      }
    })
    .state('app', {
      url: "/",
      views: {
        "header": { templateUrl: "partials/header.html" },
        "footer": { templateUrl: "partials/footer.html" },
        "nav": { templateUrl: "partials/nav.html"},
        "content": { templateUrl: "partials/view.html" }
      }
    })
    .state('app.projects', {
      authRequired: true,
      url: "projects",
      views: {
        "sub-content": { templateUrl: "partials/projects/view.html" }
      }
      
    })
    .state('app.assignments', {
      authRequired: true,
      url: "assignments",
      views: {
        "sub-content": { templateUrl: "partials/assignments/view.html" }
      }
    })
    .state('app.users', {
      authRequired: true,
      url: "users",
      views: {
        "sub-content": { templateUrl: "partials/users/view.html" }
      }
    })
  ;
})
.run(function(loginService, $rootScope, FBURL){
  $rootScope.auth = loginService.init();
  $rootScope.FBURL = FBURL;
})
;

