module.exports = angular.module('app.tasks', ['firebase', 'app'])
.factory('TasksFactory', function(FirebaseRef, $firebase){
  var taskRef = FirebaseRef('tasks');
  return {
    tasks: $firebase(taskRef),
    add: function(data) {
      return this.tasks.$add(data);
    }
  };
});