import Storage from "../storage";
angular.
    module('app').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            let user = new Storage().getUser()
            $locationProvider.html5Mode(true)
            $routeProvider.
                when('/', {
                    template: (user.isAuth === true) ? '<activity></activity>' : '<login></login>'
                }).
                when('/activity', {
                    template: '<activity></activity>'
                }).
                when('/users', {
                    template: '<search></search>'
                }).
                when('/user/:nickname', {
                    template: '<user></user>'
                }).
                when('/repos', {
                    template: '<search></search>'
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