import angular from 'angular'

let activity = () => {
  return {
    template: require('./template.html'),
    controller: 'ActivityCtrl',
    controllerAs: 'ctrl'
  }
}

class ActivityCtrl {
  constructor($http) {
    this.http = $http
    this.text = 'activity'

    this.getData()
  }

  getData() {
    this.http.get('http://localhost:3000/items').then((response) => {this.items = response.data})
  }

  onClick(e) {
    console.log(e)
  }
}


angular.module('appActivity', ['ngRoute'])
  .directive('activity', activity)
  .controller('ActivityCtrl', ActivityCtrl);

export default 'activity';