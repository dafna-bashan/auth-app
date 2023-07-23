
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}

async function query() {
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find().toArray()
        users = users.map(user => {
            delete user.password
            user.createdAt = ObjectId(user._id).getTimestamp()
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}
async function getByEmail(email) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        logger.error(`while finding user ${email}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        logger.debug(`update user ${JSON.stringify(user)}`)
        var userToSave = { ...user }
        if (user.password) {
            const existingUser = await getByEmail(user.email)
            console.log('existingUser', existingUser);
            const match = await bcrypt.compare(user.password, existingUser.password)
            if (!match) {
                logger.debug(`user.service - update user: ${user.email}, wrong password`);
                return Promise.reject('invalid password')
            }
            const isSamePass =  await bcrypt.compare(user.newPassword, existingUser.password)
            if (isSamePass) {
                logger.debug(`user.service - update user: ${user.email}, new password is identical to the old one`);
                return Promise.reject('this password is already in use')
            }
            const saltRounds = 10
            const hash = await bcrypt.hash(user.newPassword, saltRounds)
            userToSave.password = hash
            delete userToSave.newPassword
        }
        delete userToSave._id
        const collection = await dbService.getCollection('user')
        const res = await collection.updateOne({ _id: ObjectId(user._id) }, { $set: userToSave })
        // console.log('updated user', res);
        return { _id: user._id, ...userToSave };
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    console.log('user service', user)
    try {
        const userToAdd = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            bio: '',
            phone: '',
            imgUrl: ''
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}



