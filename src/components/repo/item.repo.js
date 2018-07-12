import angular from 'angular'
class RepoItemCtrl {
    constructor() {
        console.log(this.repo)
    }
}
const repoItem = {
    template: `<a ng-href="/repo/{{item.repo.full_name}}" class="item repo">
    <div className="{fork: item.repo.fork}"class="is_fork">
    </div>
    <h2 class="item_title">
        {{item.repo.name}}
    </h2>
    <h4>{{item.repo.full_name}}</h4>
    <div class="item_description">
        {{(item.repo.description && item.repo.description.length > 0) ? 
            (item.repo.description.length > 300 ? item.repo.description.substr(0, 300) + '...' : 
            item.repo.description) : 'No description...'}}
    </div>
    <div ng-class="{small: item.repo.stargazers_count == 0}" class="stars">
        {{item.repo.stargazers_count}}
        <div ng-class="{small: item.repo.forks == 0}" class="forks">
            <svg aria-label="forks" className="octicon-repo-forked" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
            {{item.repo.forks}}
        </div>
        <div class="language" ng-show="item.repo.language">{{item.repo.language}}</div>
    </div>
    <div class="user_block">
        <div class="name">by <b>{{item.repo.owner.login}}</b>
            <img ng-src="{{item.repo.owner.avatar_url}} alt="{{item.repo.owner.login}}" />
        </div>
    </div>
</a>`,
    controller: RepoItemCtrl,
    controllerAs: 'item',
    bindings: {
        repo: '='
    }
}

angular.module('app.repoitem', [])
    .component('repoItem', repoItem)

export default 'repoItem'