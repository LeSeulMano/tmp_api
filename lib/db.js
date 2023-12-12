import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: "localhost",
    user: "website",
    password: '\^{\O(@n{z%f;?CbS"eG',
    database: "apidatabase"
})

connection.connect();

export default connection;
