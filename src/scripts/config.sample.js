module.exports = angular.module('app.config', [])
   .constant('VERSION', '2.5')

   // where to redirect users if they need to authenticate (see module.routeSecurity)
   .constant('loginRedirectPath', 'login')

   // your Firebase URL goes here
   .constant('FBURL', "https://INSTANCE.firebaseio.com/")
