module.exports = angular.module('app.sssignments', [])
.factory('AssignmentsFactory', function($firebase, FirebaseRef){
  var assignmentRef = FirebaseRef('assignments');
  return {
    assignments: $firebase(assignmentRef),
    add: function(data) {
      this.assignments.$add(data);
    },
    remove: function(id) {
      this.assignments.$remove(id);
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
  };
  $scope.removeAssignment = function(id) {
    AssignmentsFactory.remove(id);
  }
});