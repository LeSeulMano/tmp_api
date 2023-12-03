import db from '../../lib/db.js';
import {perm} from "../auth/tools/perm.js";
const user = (req, res) => {
    perm(req.cookies.token).then(async (result) => {
        if (result != 6) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        const sql = `SELECT user.id, user.email, user.username, session.is_checked, user.student_number, user.role, user.download_count FROM user, session WHERE user.id = session.id_user`
        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send({
                    message: err
                })
            }
            return res.status(201).send({
                json: result
            })
        })
    })
}

export default user;