const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "restaurant",
    password: "p72527p76767",
    port: 5432,
})

module.exports = pool;