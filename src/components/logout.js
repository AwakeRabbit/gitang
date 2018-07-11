import angular from 'angular'
import app from './app/app';
class LogoutCtrl {
  constructor(storage, $location) {
    storage.logout();
    $location.path('/');
  }
}


let logout = () => ({
  template: '',
  controller: LogoutCtrl,
})

angular
  .module('app.logout', ['app.userinfo'])
  .directive('logout', logout)
  
export default 'logout'