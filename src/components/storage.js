import GitHub from 'github-api'
import { Informer, UIBlocker } from '../utils'
export default class AppFactory {
    constructor() {
        this.token = '4636cab78e97f7240a0c94d3102b2150cb7f8a09'
        this.user = this.getUser()
        this.menu = (this.user.isAuth === true) ? [
            { path: '/activity', caption: 'Activity', key: 0, isFree: -1 },
            { path: '/users', caption: 'Users', key: 1, isFree: 0 },
            { path: '/repos', caption: 'Repos', key: 2, isFree: 0 },
        ] : [
                { path: '/users', caption: 'Users', key: 1, isFree: 0 },
                { path: '/repos', caption: 'Repos', key: 2, isFree: 0 },
                { path: '/login', caption: 'Login', key: 3, isFree: 1 }
            ]
    }

    getGH() {
        return (this.user) ? new GitHub({ username: this.user.login, password: this.user.password }) : new GitHub()
    }

    getUser() {
        return JSON.parse(localStorage['user'] || '{"isAuth": "false"}')
    }

    getMember(userName, dispatch) {
        let g = this.getGH()
        const receivedUser = g.getUser(userName);
        receivedUser.getProfile()
            .then(result => {
                dispatch(result.data)
                this.getFollowing(userName, dispatch)
                this.getFollowers(userName, dispatch)
                this.checkFollowing(this.user.login, userName, dispatch)
            })

        receivedUser.listRepos()
            .then(result => {
                dispatch({
                    repos: result.data.filter(r => r.owner.login.toLowerCase() === userName.toLowerCase())
                })
            })
    }

    getFollowing(user, dispatch) {
        fetch(`https://api.github.com/users/${user}/following?access_token=${this.token}`)
            .then(result => result.json())
            .then(data => dispatch({ following_list: Array.isArray(data) ? data : [], userName: user }))
            .catch(error => dispatch({ following_list: [], userName: user }))
    }


    checkFollowing(user, member, dispatch) {
        fetch(`https://api.github.com/users/${user}/following/${member}?access_token=${this.token}`)
            .then(result => dispatch({ isFollowing: (result.status === 204) }))
            .catch(error => dispatch({ isFollowing: false }))
    }


    getFollowers(user, dispatch) {
        fetch(`https://api.github.com/users/${user}/followers?access_token=${this.token}`)
            .then(result => result.json())
            .then(data => dispatch({ followers_list: Array.isArray(data) ? data : [], userName: user }))
            .catch(error => dispatch({ followers_list: [], userName: user }))
    }

    searchUsers(keyWord, dispatch) {
        let s = this.getGH()
        const search = s.search({ per_page: 100 });
        UIBlocker.block()
        search.forUsers({ q: keyWord })
            .then(result => { UIBlocker.unblock(); dispatch({ keyWords: keyWord, list: result.data }) })
            .catch((error) => { UIBlocker.unblock(); dispatch({ list: [] }) })
    }

    searchRepos(keyWord, dispatch) {
        let s = this.getGH()
        const search = s.search({ per_page: 100 });
        UIBlocker.block()
        search.forRepositories({ q: keyWord })
            .then(result => { IBlocker.unblock(); dispatch({ keyWords: keyWord, list: result.data }) })
            .catch((error) => { IBlocker.unblock(); dispatch({ list: [] }) })

    }

    followMember(memberName, dispatch) {
        let g = this.getGH();
        g.getUser(memberName).follow()
            .then(result => { this.checkFollowing(this.user.login, memberName, dispatch); })
    }

    unfollowMember(memberName, dispatch) {
        let g = this.getGH();
        g.getUser(memberName).unfollow()
            .then(result => { this.checkFollowing(this.user.login, memberName, dispatch); })
    }

    checkFollowing(user, member, dispatch) {
        fetch(`https://api.github.com/users/${user}/following/${member}?access_token=${this.token}`)
            .then(result => dispatch({ isFollowing: (result.status === 204) }))
            .catch(error => dispatch({ isFollowing: false }))
    }

    logout() {
        localStorage.removeItem('user')
        window.location.reload()
    }

    saveDataToStorage(userData) {
        localStorage.setItem('user', JSON.stringify(userData))
    }

    login(uName, uPass) {
        let user = new GitHub({ username: uName, password: uPass }).getUser()
        UIBlocker.block()
        user.getProfile()
            .then(result => {
                UIBlocker.unblock()
                this.saveDataToStorage({ ...result.data, password: uPass, isAuth: true })
                this.user = this.getUser()
                location.pathname = "/"
                //this.getFollowing(result.data.login, dispatch)
            })
            .catch(error => {
                UIBlocker.unblock()
                localStorage.removeItem('user');
                //dispatch({ type: LOGIN_ACTIONS.LOG_OUT });
                Informer.inform('The username or password are incorrect')
            })
    }


}