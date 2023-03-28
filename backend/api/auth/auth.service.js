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

async function signup(userCred) {
    console.log('auth service', userCred)
    const {email, firstName, lastName, password} = userCred
    logger.debug(
        `auth.service - signup with email: ${email}, fullname: ${firstName} ${lastName}`
    );
    if (!email || !password || !firstName || !lastName){
        return Promise.reject('fullname, email and password are required!');
    }
    const users = await userService.query()
    const isUserExist = users.find(user => user.email === email)
    if (isUserExist) return Promise.reject('email already exists')


    // const hash = await bcrypt.hash(password, saltRounds)
    // return userService.add({ ...user, password: hash })
    return userService.add(userCred);
}

module.exports = {
    signup,
    login,
};
