
import angular from 'angular'
class RepoCtrl {
    constructor(repoStorage, $routeParams, $scope) {
        $scope.user = repoStorage.getUser()
        $scope.repoName = `${$routeParams.nickname}/${$routeParams.repoName}`
        repoStorage.getRepo($scope.repoName, (data) => {$scope.repo = {...$scope.repo ,...data }; $scope.$apply()})
        $scope.FILE_SORT = (a,b) => (a.type > b.type) ? 1 : ((a.type < b.type) ? -1 : (a.path.toLowerCase() > b.path.toLowerCase() ? 1 : -1))
    }
}

let repo = {
    template: `<div ng-class="repo_info" ng-if="repo.owner">
            <div class="stars" ng-class="{small: repo.stargazers_count == 0}">
                {{repo.stargazers_count}}
                <div class="forks" ng-class="{small: repo.forks == 0}">
                    {{repo.forks}}
                </div>
            </div>
            <h1>{{repo.name}}
                <b>{{repo.full_name}}</b>
                <label>Created at <span>{{repo.created_at}}</span></label>
                <a ng-href="repo.html_url" target="_blank">View repository on GitHub</a>
            </h1>
            <p>{{repo.description}}</p>
            <div class="languages" ng-if="repo.languages">
                <div class="lang {{item}} ng-repeat="item in Object.keys(repo.languages)">{{item}}</div>
            </div>
            <a ng-href="/user/{{repo.owner.login}}" class="user_block">
                <div class="name">by <b>{{repo.owner.login}}</b>
                    <img ng-src={{repo.owner.avatar_url}} alt={{repo.owner.login}} width="50" />
                </div>
            </a>

            <h2>Files</h2>
            <div class="file_list">
                <fileitem ng-repeat="item in repo.contents.sort(FILE_SORT)" />
            </div>
        </div>`,
    controller: ['repoStorage', '$routeParams', '$scope', RepoCtrl]
}
angular.module('app.repo', [])
    .component('repo', repo)

export default 'repo'