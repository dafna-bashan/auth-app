// const bcrypt = require('bcrypt')
const userService = require('../user/user.service');
const logger = require('../../services/logger.service');

async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`);

    const user = await userService.getByEmail(email);
    if (!user || user.password !== password) {
        console.log('line 10 Auth service - wrong cred!!!!')
        return Promise.reject('Invalid email or password');
    }
    delete user.password;
    return user;
    // TODO: un-comment for real login
    // const match = await bcrypt.compare(password, user.password)
    // if (!match) return Promise.reject('Invalid email or password')
}

async function signup(user) {
    console.log('auth service', user)
    logger.debug(
        `auth.service - signup with email: ${user.email}, fullname: ${user.firstName} ${user.lastName}`
    );
    if (!user.email || !user.password || !user.firstName || !user.lastName){
        return Promise.reject('fullname, email and password are required!');
    }
       

    // const hash = await bcrypt.hash(password, saltRounds)
    // return userService.add({ ...user, password: hash })
    return userService.add(user);
}

module.exports = {
    signup,
    login,
};
