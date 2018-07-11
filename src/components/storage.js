import GitHub from 'github-api'
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

    getUser() {
        return JSON.parse(localStorage['user'] || '{"isAuth": "false"}')
    }

    logout() {
        localStorage.removeItem('user')
        window.location.reload()
    }

    saveDataToStorage(userData) {
        localStorage.setItem('user', JSON.stringify(userData))
    }

    login(uName, uPass) {
        let user = new GitHub({ username: uName, password: uPass }).getUser();
        user.getProfile()
            .then(result => {
                this.saveDataToStorage({ ...result.data, password: uPass, isAuth: true })
                this.user = this.getUser()
                location.pathname = "/"
                //getFollowing(result.data.login)(dispatch)
            })
            .catch(error => {
                localStorage.removeItem('user');
                //dispatch({ type: LOGIN_ACTIONS.LOG_OUT });
                //Informer.inform('The username or password are incorrect');
            })
    }

    
}