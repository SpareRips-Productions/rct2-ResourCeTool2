module.exports = angular.module('app.sssignments', [])
.factory('AssignmentsFactory', function($firebase, FirebaseRef){
  var assignmentRef = FirebaseRef('assignments');
  return {
    assignments: $firebase(assignmentRef),
    add: function(data) {
      this.assignments.$add(data);
    },
    getByProjectId: function(projectId) {
      var a = [];
      for(var i in assignments) {
        var assignment = assignments[i];
        if(assignment.project == projectId) {
          a.push(assignment);
        }
      }
      console.log(a);
      return a;
    }
  };
})
.controller( 'AssignmentsCtrl', function($scope, ProjectsFactory, AssignmentsFactory){
  
  $scope.week = moment().week();
  $scope.newAssignment = {};
  $scope.projects = ProjectsFactory.projects;
  $scope.assignments = AssignmentsFactory.assignments;
  $scope.days = moment.weekdaysMin();
  $scope.incrementWeek = function() {
    $scope.week++;
  };
  $scope.decrementWeek = function() {
      $scope.week--;
  };
  $scope.saveNewAssignment = function() {
    $scope.newAssignment.week = $scope.week;
    AssignmentsFactory.add($scope.newAssignment);
    $scope.newAssignment = {};
  }
});