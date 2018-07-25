import angular from 'angular';
import ngRoute from 'angular-route'
import {AppStorage, RepoStorage } from '../../services'
import * as components from '..'

import '../../styles/styles.scss'
const MODULE_NAME = 'app';

let app = () => {
  return {
    template: require('./template.html')
  }
}

angular.module('app', ['ngRoute', 'app.login', 'appActivity', 'app.notFound', 'appMenu', 'app.logout', 'app.user', 'app.search', 'app.repo'])
  .directive('app', app)
  .service('storage', AppStorage)
  .service('repoStorage', RepoStorage)
export default app;