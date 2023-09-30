import db from '../../lib/db.js'
import bcrypt from 'bcrypt';
import token from "./token.js";

const register = (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const student_number = req.body.student_number;
    const password = req.body.password;

    const sql = `SELECT * from user WHERE email = ? OR student_number = ?`;

    db.query(sql, [email, student_number], function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (result.length != 0) {
            return res.status(409).send({
                message: 'This email or student_number is already use !'
            })
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err){
                throw err;
                return res.status(500).send({
                    message: err
                })
            }
            const sql = `INSERT INTO user (username, email, student_number, password) VALUES (?, ?, ?, ?)`
            db.query(sql, [username, email, student_number, hash], function (err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                    return res.status(500).send({
                        message: err
                    })
                }
                db.query(`INSERT INTO session (id_user) VALUES (${result.insertId})`);
                token(result.insertId).then((result) => {
                    res.cookie('token', result, { httpOnly: true, secure: true });
                    return res.status(201).send({
                        message: 'Registered !'
                    });
                })
            })
        })

    });

}

export default register;