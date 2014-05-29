
angular.module('app', [
  'ui.router',
  'firebase',
  require('./projects').name,
  require('./users').name,
  require('./assignments').name,
  require('./config.js').name
])
.factory('FirebaseRef', function(FBURL){
    return function(ref) {
      var baseUrl = FBURL;
      return new Firebase(baseUrl+ref);
    }
})
.controller('AppCtrl', function($scope, VERSION){
	$scope.version = VERSION;
})
.filter('projectFilter', function(){

  return function(input, query){
    if(!query) return input;
    var result = [];

    angular.forEach(input, function(assignment){
      if(assignment.project == query){
        result.push(assignment); 
      }                 
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
      url: "projects",
      views: {
        "sub-content": { templateUrl: "partials/projects/view.html" }
      }
      
    })
    .state('app.assignments', {
      url: "assignments",
      views: {
        "sub-content": { templateUrl: "partials/assignments/view.html" }
      }
    })
    .state('app.users', {
      url: "users",
      views: {
        "sub-content": { templateUrl: "partials/users/view.html" }
      }
    })
  ;
});

;

