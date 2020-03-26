const knex = require('knex');
const dbconfig = require('../../knexfile');

const connection = knex(dbconfig.development);

module.exports = connection;
