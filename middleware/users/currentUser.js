import jwt from "jsonwebtoken";
import crypto from "crypto";
import db from "../../lib/db.js";

const currentUser = (req, res) => {
    const token = req.cookies.token;
    const secret_key = process.env.SECRET_KEY_TOKEN;
    const secretKeyCrypt = process.env.SECRET_KEY;
    const tokenData = jwt.verify(token, secret_key);
    const iv = Buffer.from(tokenData.sessionId.iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKeyCrypt, 'hex'), iv);
    const decryptedSessionId = decipher.update(tokenData.sessionId.sessionId, 'hex', 'utf8') + decipher.final('utf8');
    const sql = `SELECT user.username, user.email, session.is_checked
                         FROM user,
                              session
                         WHERE session.id_session = ?
                           AND session.id_user = user.id;`
    db.query(sql, [decryptedSessionId], function (err, result) {
        if (err) {
            return res.status(500).send({
                message: err
            })
        } else {
            return res.status(201).send({
                json: result
            })
        }
    })
}

export default currentUser;