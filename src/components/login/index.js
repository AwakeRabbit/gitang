import angular from 'angular'

let login = () => {
  return {
    template: require('./template.html'),
    controller: LoginCtrl,
    controllerAs: 'login'
  }
}

class LoginCtrl {
  constructor(storage) {
    this.storage = storage
    this.login = ''
    this.password = ''
  }

  submit() {
    this.storage.login(this.login, this.password)
  }
}

const MODULE_NAME = 'login';

angular.module('app.login',[])
  .directive('login', login)

export default MODULE_NAME;