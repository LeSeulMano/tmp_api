import db from '../../lib/db.js';
import bcrypt from "bcrypt";
import token from "./token.js";

const login = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM user, session WHERE user.email = ? AND user.id = session.id_user;`;

    db.query(sql, [email], function (err, result) {
        if (result.length != 1) {
            return res.status(409).send({
                message: 'Incorrect email !'
            })
        }
        if (result[0]['is_checked'] == 0){
            return res.status(409).send({
                message: 'Email non vérifié !'
            })
        }

        bcrypt.compare(password, result[0]['password'], (bErr, bResult) => {
            if (bErr) {
                return res.status(500).send({
                    message: bErr
                })
            }
            if (!bResult) {
                return res.status(409).send({
                    message: 'Incorrect password !'
                })
            }
            token(result[0]['id']).then((result) => {
                res.cookie('token', result, { httpOnly: false, secure: true, sameSite: 'None'});
                return res.status(201).send({
                    message: 'Login !'
                });
            })
        })
    })
}
export default login;