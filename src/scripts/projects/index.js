module.exports = angular.module('app.projects', ['firebase', 'app'])
.factory('ProjectsFactory', function(FirebaseRef, $firebase){
  var projectRef = FirebaseRef('projects');
  return {
    projects: $firebase(projectRef),
    add: function(data) {
      var tasks = data.tasks;
      delete data.tasks;
      this.projects.$add(data).then(function(ref){
        var id = ref.name();
        for(var i in tasks) {
          console.log(tasks[i]);
        }
      });
    },
    remove: function(id) {
      this.projects.$remove(id);
    }
  };
})
.controller( 'ProjectsCtrl', function($scope, ProjectsFactory, AssignmentsFactory){
  
  $scope.projects = ProjectsFactory.projects;
  $scope.assignments = AssignmentsFactory.assignments;
  $scope.newProject = {};
  $scope.saveNewProject = function() {
    ProjectsFactory.add($scope.newProject);
    $scope.newProject = {};
  }
  $scope.removeProject = function(id) {
    ProjectsFactory.remove(id);
  }
});