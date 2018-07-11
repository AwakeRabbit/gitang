angular.
    module('app').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider.
                when('/', {
                    redirectTo: '/activity'
                }).
                when('/activity', {
                    template: '<activity></activity>'
                }).
                when('/users', {
                    template: '<users></users>'
                }).
                when('/repos', {
                    template: '<repos></repos>'
                }).
                when('/404', {
                    template: '<not-found></not-found>'
                }).
                when('/login', {
                    template: '<login></login>'
                }).
                when('/logout', {
                    template: '<logout></logout>'
                }).
                otherwise('/404');
        }
    ]);