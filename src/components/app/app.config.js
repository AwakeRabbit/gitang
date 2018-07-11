import Storage from "../storage";
angular.
    module('app').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            let user = new Storage().getUser()
            $locationProvider.html5Mode(true)
            $routeProvider.
                when('/', {
                    redirectTo: (user.isAuth === true) ? '/activity' : '/login'
                }).
                when('/activity', {
                    template: '<activity></activity>'
                }).
                when('/users', {
                    template: '<users></users>'
                }).
                when('/user/:nickname', {
                    template: '<user></user>'
                }).
                when('/repos', {
                    template: '<repos></repos>'
                }).
                when('/404', {
                    template: '<not-found></not-found>'
                }).
                when('/login', (user.isAuth == true) ? {redirectTo: '/'} : {
                    template: '<login></login>'}).
                when('/logout', {
                    template: '<logout></logout>'
                }).
                otherwise('/404');
        }
    ]);