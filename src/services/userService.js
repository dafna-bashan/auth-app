import { storageService } from './asyncStorageService';
// import { httpService } from './httpService';

export const userService = {
    getUsers,
    getById,
    remove,
    update,
};

window.userService = userService;
// Note: due to async, must run one by one...

function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`);
}

function getById(userId) {
    return storageService.get('user', userId)
    // return httpService.get(`user/${userId}`);
}
function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`);
}

async function update(user) {
    return storageService.put('user', user)
    // user = await httpService.put(`user/${user._id}`, user);
    // Handle case in which admin updates other user's details
    // if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
}


