import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'lolmdr1234',
    database: "apidatabase"
})

connection.connect();

export default connection;
