import angular from 'angular'
let n404 = () => {
  return {
    template: `<h1>404</h1>`,
    controller: 'NotFoundCtrl',
    controllerAs: 'ctrl'
  }
}
class NotFoundCtrl {
  constructor() {
  }
}

angular.module('app.notFound', ['ngRoute'])
  .directive('notFound', n404)
  .controller('NotFoundCtrl', NotFoundCtrl)

  export default 'not-found'

