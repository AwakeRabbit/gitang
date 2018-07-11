import angular from 'angular'
import app from './app/app';
class MenuCtrl {
  constructor($location, storage) {
    this.title = 'app'
    this.allPages = storage.menu
    this.user = storage.user
    this.location = $location
    this.checkActiveItem();
    window.addEventListener('popstate',this.checkActiveItem.bind(this));
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
  template: `<header><user-info ng-show="menu.user.isAuth === true"></user-info><menu>
    <a ng-repeat='i in menu.allPages' ng-href='{{i.path}}' class="{{i.active ? 'active' : ''}}" ng-click="menu.setActiveItem(i)">{{i.caption}}</a>
  </menu></header>`,
  controller: MenuCtrl,
  controllerAs: 'menu'
})

angular
  .module('appMenu', ['app.userinfo'])
  .directive('appMenu', appMenu)
  
export default 'appMenu'