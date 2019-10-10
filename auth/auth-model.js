const knex = require('knex');
const config = require('../knexfile');

const db = knex(config);

module.exports = {
    getUsers,
};

function getUsers() {
    return db('users');
}
