const { Pool } = require('pg')
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'root',
//     port: 5432,
// })
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: Number(process.env.DB_PORT),
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, (err, res) => {
            if (process.env.LOG_LVL === 'DEBUG') {
                console.log('executed query', { text, rows: res });
            }
            callback(err, res);
        })
    }
}
