import db from '../../lib/db.js';
import jwt from 'jsonwebtoken';
import crypto from "crypto";

const role = (req, res) => {

    try {

        const secret_key = process.env.SECRET_KEY_TOKEN;
        const secretKeyCrypt = process.env.SECRET_KEY;
        const tokenData = jwt.verify(req.cookies.token, secret_key);
        const iv = Buffer.from(tokenData.sessionId.iv, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKeyCrypt, 'hex'), iv);
        const decryptedSessionId = decipher.update(tokenData.sessionId.sessionId, 'hex', 'utf8') + decipher.final('utf8');
console.log(req.cookies.token)	
        const sql = `SELECT user.role
                     FROM user,
                          session
                     WHERE session.id_session = ?
                       AND session.id_user = user.id;`
        db.query(sql, [decryptedSessionId], function (err, result) {
            switch (result[0].role) {
                case 0:
                    return res.status(401).send({
                        message: "Unauthorized"
                    });
                    break;
                case 6:
                    return res.status(200).send({
                        message: "Authorized"
                    });
                    break;
            }
        })
    } catch (e) {
        return res.status(401).send({
            message: "Not connected"
        });
    }


}

export default role;
