import angular from 'angular'
import app from '../app/app';
import userItem from './user.item'
import repoItem from '../repo/item.repo'
class UserCtrl {
    constructor(storage, $routeParams, $scope) {
        this.member = {}
        this.user = storage.getUser()
        this.memberName = $routeParams.nickname
        this.storage = storage
        this.getMember()
        this.following = false
        this.scope = $scope;
    }

    followMember(member) {
        console.log(this)
        this.storage.followMember(member, data => {this.isFollowing = data.isFollowing; this.scope.$apply()})
    }

    unfollowMember(member) {
        this.storage.unfollowMember(member, data => {this.isFollowing = data.isFollowing; this.scope.$apply()})
    }

    getMember() {
        this.activeTab = 'repos'
        this.storage.getMember(this.memberName, (partData) => { this.member = { ...this.member, ...partData }; this.scope.$apply() })
    }
}

let user = {
    template: `<div class="user_profile" >
    <ng-container ng-if="user.user.isAuth && user.user.id !== user.member.id && user.member.id > 0" ng-switch="user.member.isFollowing">
        <button ng-switch-when="true" ng-click="user.following = true; user.unfollowMember(user.member.login)"ng-class="{loading: following}" class="white">Unfollow</button>
        <button ng-switch-when="false" ng-click="user.following = true; user.followMember(user.member.login)"ng-class="{loading: following}" class="white">Follow</button>
    </ng-container>            
            <img class="user_profile_image" ng-src="{{user.member.avatar_url}}" alt="{{user.member.name}}" />
            <h1>{{user.member.name}}<b>{{user.member.login}}</b></h1>
            <a ng-href="{{user.member.html_url}}" target="_blank">View Profile on GitHub</a>
            <br style="clear: both"/>
            <div class="tabs">
                <div ng-class="{active: user.activeTab === 'repos'}" class="tab" ng-click="user.activeTab = 'repos'">Repositories</div>
                <div ng-class="{active: user.activeTab === 'following'}" class="tab" ng-click="user.activeTab = 'following'">Following</div>
                <div ng-class="{active: user.activeTab === 'followers'}" class="tab" ng-click="user.activeTab = 'followers'">Followers</div>
            </div>
            <div class="list" ng-switch="user.activeTab">
                <repo-item ng-switch-when="repos" ng-repeat="item in user.member.repos || []" repo="item"></repo-item>
                <user-item ng-switch-when="following" ng-repeat="item in user.member.following_list || []" user="item"></user-item>
                <user-item ng-switch-when="followers" ng-repeat="item in user.member.followers_list || []" user="item"></user-item>
            </div>
        </div>`,
    controller:['storage', '$routeParams', '$scope', UserCtrl],
    controllerAs: 'user'
}

angular.module('app.user', ['app.useritem', 'app.repoitem'])
    .component('user', user)

export default 'user'