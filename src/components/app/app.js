import angular from 'angular';
import ngRoute from 'angular-route'
import AppStorage from '../storage'
import * as components from '..'

import '../../styles/styles.scss'
const MODULE_NAME = 'app';

let app = () => {
  return {
    template: require('./template.html'),
    controller: (storage) => {console.log(storage.menu)}
  }
}

angular.module('app', ['ngRoute', 'app.login', 'appActivity', 'app.notFound', 'appMenu'])
  .directive('app', app)
  .service('storage', AppStorage)

export default 'app';