import angular from 'angular'

let activity = () => {
  return {
    template: require('./template.html'),
    controller: 'ActivityCtrl',
    controllerAs: 'activity'
  }
}

class ActivityCtrl {
  constructor($http, storage) {
    this.text = 'activity'
    this.storage = storage
    this.http = $http
    this.reloadActivity()
  }

  reloadActivity() {
    let storage = this.storage;
    this.http.get(`https://api.github.com/users/${storage.user.login}/received_events/public?access_token=${storage.token}`)
        .then(result => {this.items = result.data; console.log(this.items)})
}
}


angular.module('appActivity', ['ngRoute'])
  .directive('activity', activity)
  .controller('ActivityCtrl', ActivityCtrl);

export default 'activity';