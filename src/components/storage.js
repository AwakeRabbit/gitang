export default class AppFactory {
    constructor() {
        this.user = JSON.parse(localStorage['user'] || {isAuth: false})
        this.menu =(this.user.isAuth) ?  [
            { path: '/activity', caption: 'Activity', key: 0, isFree: -1},
            { path: '/users', caption: 'Users', key: 1, isFree: 0 },
            { path: '/repos', caption: 'Repos', key: 2, isFree: 0 },
          ] :  [
            { path: '/users', caption: 'Users', key: 1, isFree: 0 },
            { path: '/repos', caption: 'Repos', key: 2, isFree: 0 },
            { path: '/login', caption: 'Login', key: 3, isFree: 1 }
          ]
    }

    getUser() {
        return JSON.parse(localStorage['user'])
    }
}