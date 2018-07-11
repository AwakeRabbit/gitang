import angular from 'angular'
import app from './app/app';
class MenuCtrl {
  constructor($location, storage) {
    this.title = 'app'
    this.allPages = storage.menu
    this.location = $location
    this.checkActiveItem();
  }

  checkActiveItem() {
    console.log(this.location)
    let path = (this.location.url() || '').trim()
    let activeKey = -1
    let entry = path.substr(0, 4);
    this.allPages = this.allPages.map((item) => ({ ...item, active: (item.path.indexOf(entry) >= 0)}))
  }

  setActiveItem(item) {
    this.allPages = this.allPages.map((i) => ({ ...i, active: (i.key === item.key)}))
  }
}


let appMenu = () => ({
  template: `<header><user-info></user-info><menu>
    <a ng-repeat='i in menu.allPages' ng-href='{{i.path}}' class="{{i.active ? 'active' : ''}}" ng-click="menu.setActiveItem(i)">{{i.caption}}</a>
  </menu></header>`,
  controller: MenuCtrl,
  controllerAs: 'menu'
})

angular
  .module('appMenu', ['app.userinfo'])
  .directive('appMenu', appMenu)
  
export default 'appMenu'