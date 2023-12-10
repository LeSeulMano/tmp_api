import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: "localhost",
    user: "",
    password: '',
    database: "apidatabase"
})

connection.connect();

export default connection;
