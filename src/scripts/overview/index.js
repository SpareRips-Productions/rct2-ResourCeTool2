module.exports = angular.module('app.overview', ['app'])
    .controller('OverviewCtrl', function ($scope, ProjectsFactory, AssignmentsFactory) {
      $scope.projects = ProjectsFactory.projects;
      $scope.assignments = AssignmentsFactory.assignments;
    })
;