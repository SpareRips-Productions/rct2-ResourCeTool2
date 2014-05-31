module.exports = angular.module('app.users', [
  require('./login.js').name,
  require('./security.js').name,
  'firebase', 
  'app'
])
.factory('UsersFactory', function(){

})
.controller( 'UsersCtrl', function($scope, FirebaseRef){
  
});