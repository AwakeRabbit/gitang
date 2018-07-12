import angular from 'angular'
import app from './app/app';
class MenuCtrl {
  constructor($location, storage, $scope) {
    $scope.title = 'app'
    $scope.allPages = storage.menu
    $scope.user = storage.user
    $scope.location = $location
    $scope.checkActiveItem = this.checkActiveItem.bind($scope)
    $scope.checkAvailability = this.checkAvailability.bind($scope)
    $scope.setActiveItem = this.setActiveItem.bind($scope)
    $scope.$on('$locationChangeSuccess', $scope.checkActiveItem)
    $scope.checkActiveItem()
  }

  checkActiveItem() {
    let path = (this.location.url() || '').trim()
    let activeKey = -1
    let entry = path.substr(0, 4);
    this.allPages = this.allPages.map((item) => ({ ...item, active: (item.path.indexOf(entry) >= 0)}))
    this.checkAvailability()
  }

  setActiveItem(item) {
    this.allPages = this.allPages.map((i) => ({ ...i, active: (i.key === item.key)}))
    this.checkAvailability()

  }

  checkAvailability() {
    if (this.allPages.filter(i => i.active === true).length  == 0)  {
      this.location.path('/')
    }
  }
}


let appMenu = () => ({
  template: `<header><user-info ng-show="user.isAuth === true"></user-info><menu>
    <a ng-repeat='i in allPages' ng-href='{{i.path}}' ng-class="{active : i.active}" ng-click="menu.setActiveItem(i)">{{i.caption}}</a>
  </menu></header>`,
  controller: MenuCtrl,
})

angular
  .module('appMenu', ['app.userinfo'])
  .directive('appMenu', appMenu)
  
export default 'appMenu'