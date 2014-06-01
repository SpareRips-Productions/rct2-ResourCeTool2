module.exports = angular.module('app.sssignments', [])
    .factory('AssignmentsFactory', function ($firebase, FirebaseRef) {
        var assignmentRef = FirebaseRef('assignments');
        return {
            assignments: $firebase(assignmentRef),
            add: function (data) {
                this.assignments.$add(data);
            },
            remove: function (id) {
                this.assignments.$remove(id);
            }
        };
    })
    .controller('AssignmentsCtrl', function ($scope, ProjectsFactory, AssignmentsFactory, loginService, UsersFactory) {
        var colors = ['success', 'info', 'warning', 'danger'];
        var assignedColors = {};
        var colorCounter = -1;
        $scope.week = moment().week();
        $scope.users = UsersFactory.users;
        $scope.newAssignment = {utilization: 5};
        $scope.projects = ProjectsFactory.projects;
        $scope.assignments = AssignmentsFactory.assignments;
        $scope.days = getDays();
        function getDays() {
            return ["Mo", "Tu", "We", "Th", "Fr"];
        }

        $scope.incrementWeek = function () {
            $scope.week++;
        };
        $scope.decrementWeek = function () {
            $scope.week--;
        };
        $scope.saveNewAssignment = function () {
            $scope.newAssignment.week = $scope.week;
            $scope.newAssignment.user = loginService.currentUser().email;
            AssignmentsFactory.add($scope.newAssignment);
            $scope.newAssignment = { utilization: 5};
        };
        $scope.removeAssignment = function (id) {
            AssignmentsFactory.remove(id);
        };
        $scope.barColor = function (id) {
            if (!assignedColors[id]) {
                assignedColors[id] = colors[colorCounter % 4];
                colorCounter++;
            }
            return assignedColors[id];
        };
        $scope.getProjectName = function (projectId) {
            return $scope.projects[projectId].name;
        }
    });