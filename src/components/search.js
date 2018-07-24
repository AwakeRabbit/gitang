import angular from "angular"
import app from "./app/app";
import repoItem from './repo/item.repo'
import userItem from './user/user.item'

class SearchCtrl {
    constructor(storage, $scope, $location) {
        $scope.type = $location.url() == '/repos' ? 'repos' : 'users'
        $scope.caption = $scope.type === 'repos' ? 'Search repositories' : 'Search users'
        $scope.keyWords = ''
        $scope.storage = storage
        $scope.isLoading = false
        $scope.pageSize = 48
        $scope.countToShow = $scope.pageSize
        $scope.list = []
        $scope.search = this.search.bind($scope)
        $scope.onKeyDown = this.onKeyDown.bind($scope)
    }

    onKeyDown(e) {
        if (e.keyCode != 13) return true;
        this.search(this.keyWords)
    }

    search(word) {
        this.isLoading = true;
        this.countToShow = this.pageSize
        let search = this.type === 'repos' ? this.storage.searchRepos.bind(this.storage) : this.storage.searchUsers.bind(this.storage)
        search(word, data => {this.isLoading = false; this.list = [...data.list]; this.$apply() })
    }
}
const search = {
    template: `
                <h1>{{caption}}</h1>
                <div class="search_box">
                  <input type="search" ng-model="keyWords" ng-min-length="3" placeholder="Type any to search..." ng-keydown="onKeyDown($event)" />
                  <button type="button" ng-class="{loading: isLoading}" ng-click="search(keyWords)" ng-disabled="keyWords.length < 3" id="search_btn">Search</button>
                  <div class="search_box_count">{{list && list.length > 0 ? list.length + 'items found' : ''}}</div>
                </div>
                <div class="list">
                    <repo-item ng-repeat="item in list | limitTo: countToShow" ng-if="type == 'repos'" repo="item"></repo-item>
                    <user-item ng-repeat="item in list | limitTo: countToShow" ng-if="type == 'users'" user="item"></user-item>
                    <button class="white list_show_more" ng-show="countToShow < list.length" ng-click="countToShow = countToShow + pageSize">Show more</button>
                </div>
            `,
        controller: ['storage', '$scope', '$location', SearchCtrl],
        bindings: {
            type: '='
        }
}
angular.module('app.search', ['app.repoitem', 'app.useritem'])
    .component('search', search)