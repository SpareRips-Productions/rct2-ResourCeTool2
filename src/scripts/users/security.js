module.exports = angular.module('app.users.security', [])
    .run(['$injector', '$location', '$rootScope', 'loginRedirectPath', function ($injector, $location, $rootScope, loginRedirectPath) {

        if ($injector.has('$state')) {
            console.log("sec...");
            new RouteSecurityManager($location, $rootScope, $injector.get('$state'), loginRedirectPath);
        }
    }]);

function RouteSecurityManager($location, $rootScope, $state, path) {
    this._state = $state;
    this._location = $location;
    this._rootScope = $rootScope;
    this._loginPath = path;
    this._redirectTo = null;
    this._authenticated = !!($rootScope.auth && $rootScope.auth.user);
    this._init();
}

RouteSecurityManager.prototype = {
    _init: function () {
        var self = this;
        this._checkCurrent();

        // Set up a handler for all future route changes, so we can check
        // if authentication is required.
        self._rootScope.$on("$stateChangeStart", function (e, next) {
            if (self._authRequiredRedirect(next, self._loginPath)) {
                e.preventDefault();
            }
            ;
        });

        self._rootScope.$on('$firebaseSimpleLogin:login', angular.bind(this, this._login));
        self._rootScope.$on('$firebaseSimpleLogin:logout', angular.bind(this, this._logout));
        self._rootScope.$on('$firebaseSimpleLogin:error', angular.bind(this, this._error));
    },

    _checkCurrent: function () {
        // Check if the current page requires authentication.
        if (this._state.current) {
            this._authRequiredRedirect(this._state.current, this._loginPath);
        }
    },

    _login: function () {
        this._authenticated = true;
        if (this._redirectTo) {
            this._redirect(this._redirectTo);
            this._redirectTo = null;
        }
        else if (this._state.current.name === this._loginPath) {
            this._redirect("app");
        }
    },

    _logout: function () {
        this._authenticated = false;
        this._checkCurrent();
    },

    _error: function () {
        if (!this._rootScope.auth || !this._rootScope.auth.user) {
            this._authenticated = false;
        }
        this._checkCurrent();
    },

    _redirect: function (path) {
        this._state.go(path);
    },

    // A function to check whether the current path requires authentication,
    // and if so, whether a redirect to a login page is needed.
    _authRequiredRedirect: function (route, path) {
        console.log(route.name, this._authenticated, route.name === this._loginPath)
        if (route.authRequired && !this._authenticated) {

            if (route.pathTo === undefined) {

                this._redirectTo = route.name;
            } else {
                this._redirectTo = route.pathTo === path ? "app" : route.name;

            }
            this._redirect(path);
            return true;
        }
        else if (this._authenticated && route.name === this._loginPath) {
            console.log("doing redirect", route.name);
            this._redirect('app');
            return true;
        }
        return false;
    }
};