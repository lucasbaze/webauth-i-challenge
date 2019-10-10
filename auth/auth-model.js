const knex = require('knex');
const config = require('../knexfile');
const b = require('bcryptjs');

const db = knex(config);

module.exports = {
    getUsers,
    addUser,
    checkUsername,
};

function getUsers() {
    return db('users');
}

function addUser(user) {
    let { username, password } = user;
    password = b.hashSync(password, 10);

    return db('users').insert({
        username,
        password,
    });
}

function checkUsername(username) {
    return db('users')
        .where('username', username)
        .first();
}
