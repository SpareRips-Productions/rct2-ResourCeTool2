module.exports = angular.module('app.users', [
        require('./login.js').name,
        require('./security.js').name,
        'firebase',
        'ui.gravatar',
        'app'
    ])
    .factory('UsersFactory', function (FirebaseRef, $firebase) {
        var userRef = FirebaseRef('users');
        return {
            users: $firebase(userRef),
            add: function (data) {
                this.users.$add(data);
            },
            remove: function (id) {
                this.users.$remove(id);
            }
        };
    })
    .controller('UsersCtrl', function ($scope, UsersFactory, loginService, $filter) {
        $scope.users = UsersFactory.users;
        $scope.newUser = resetUser();
        $scope.saveNewUser = function () {

            UsersFactory.add($scope.newUser);
            $scope.newUser = resetUser();
        }
        $scope.removeUser = function (id) {
            UsersFactory.remove(id);
        };
        function resetUser() {
            return { email: getMail() };
        };
        $scope.isMe = function (user) {
            return  getMail() == user.email;
        };
        $scope.alreadyIn = function () {
            var user = $filter('firebaseFilter')($scope.users, {email: getMail()});
            return Object.keys(user).length >= 1;
        };
        function getMail() {
            return loginService.currentUser().email;
        }

    });