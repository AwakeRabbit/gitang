import angular from 'angular'

class UserCtrl {
    constructor(storage) {
        this.user = storage.getUser()
        this.expanded = false
    }
}

let userInfo = {
    template: `
    <div 
            class="user_info" 
            ng-click="info.expanded = !info.expanded">
                <img ng-src={{info.user.avatar_url}} alt={{info.user.name}} />
                <div class="profile_menu {{ ((info.expanded === true) ? ' expanded' : '')}} 
                    tabIndex="1" 
                    ref="menuList">
                    <a ng-href="{{'/user/' + info.user.login}}">View&nbsp;profile</a>
                    <a ng-href="/logout">Log&nbsp;out</a>
                </div>
            </div>
    `,
    controller: ['storage', UserCtrl],
    controllerAs: 'info'
}

angular
    .module('app.userinfo', [])
    .component('userInfo', userInfo)

export default 'userInfo'


