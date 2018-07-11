import angular from 'angular'

let login = () => {
  return {
    template: require('./template.html'),
    controller: LoginCtrl,
  }
}

const LoginCtrl = function ($scope) {
  $scope.text = 'login1'
  this.title = 'login'

  $scope.onClick= function(e) {console.log(e)}
}

const MODULE_NAME = 'login';

angular.module('app.login', ['ngRoute'])
  .directive('login', login)

export default MODULE_NAME;