import angular from 'angular'

class UserItemCtrl {
    constructor() {
    }
}

let userItem = {
    template: `<a ng-href="/user/{{item.user.login}}" class="item user">
    <div class="user_block">
        <img ng-src="{{item.user.avatar_url}}: alt="{{item.user.login}}" />
        <div class="name"><b>{{item.user.login}}</b></div>           
        <div ng-show="item.user.score" className="score" title="score"><label>score</label> {{item.user.score.toFixed(0)}}</div>
    </div>
</a>`,
    controller: UserItemCtrl,
    controllerAs: 'item',
    bindings: {
        user: '='
    }
}
angular
    .module('app.useritem', [])
    .component('userItem', userItem)
    

export default 'userItem'