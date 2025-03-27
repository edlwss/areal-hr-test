require('dotenv').config({ path: __dirname + '/../.env' });
const { Pool } = require('pg');

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'hr',
    password: '2904',
    port: 5432,
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
    console.error('Unexpected database error', err);
    process.exit(-1);
});

module.exports = pool;
