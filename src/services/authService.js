import { storageService } from './asyncStorageService';
import { utilService } from './utilService';

export const authService = {
    login,
    logout,
    signup,
    getLoggedinUser,
};

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // return _saveLocalUser(user)

    // const user = await httpService.post('auth/login', userCred);
    if (user) {
        _saveLocalUser(user);
        return user;
    }
}

async function signup(userCred) {
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred);
    return _saveLocalUser(user);
}

async function logout() {
    sessionStorage.clear();
    // return await httpService.post('auth/logout');
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user));
    return user;
}

function getLoggedinUser() {
    let user = JSON.parse(sessionStorage.getItem('loggedinUser'));
    if (typeof user !== 'object' || !user) {
        user = {
            _id: utilService.makeId(),
            fullname: 'Guest',
            username: 'Guest',
            imgUrl: 'https://i.ibb.co/wS9zKnQ/guest-02.png',
        };
    }
    return user;
}