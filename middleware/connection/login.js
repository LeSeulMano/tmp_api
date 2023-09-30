import db from '../../lib/db.js';
import bcrypt from "bcrypt";
import token from "./token.js";

const login = (req, res) => {

    const student_number = req.body.student_number;
    const password = req.body.password;

    const sql = `SELECT * FROM user WHERE student_number = ?;`;
    db.query(sql, [student_number], function (err, result) {
        if (result.length != 1) {
            return res.status(409).send({
                message: 'Incorrect student_number !'
            })
        }
        bcrypt.compare(password, result[0]['password'], (bErr, bResult) => {
            if (bErr) {
                return res.status(500).send({
                    message: 'bErr'
                })
            }
            if (!bResult) {
                return res.status(409).send({
                    message: 'Incorrect password !'
                })
            }
            token(result[0]['id']).then((result) => {
                res.cookie('token', result, { httpOnly: true, secure: true });
                return res.status(201).send({
                    message: 'Login !'
                });
            })
        })
    })
}
export default login;