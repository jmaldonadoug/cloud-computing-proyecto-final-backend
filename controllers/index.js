const mysql = require('mysql-await');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cloud_computing_proyecto_final'
});

db.on(`error`, (err) => {
    console.error(`Connection error ${err.code}`);
});

module.exports = db; 