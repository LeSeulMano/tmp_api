import db from "../../../lib/db.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export function perm(token){

    return new Promise((resolve, reject) => {
        const secret_key = process.env.SECRET_KEY_TOKEN;
        const secretKeyCrypt = process.env.SECRET_KEY;
        try {
            const tokenData = jwt.verify(token, secret_key);
            const iv = Buffer.from(tokenData.sessionId.iv, 'hex');
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKeyCrypt, 'hex'), iv);
            const decryptedSessionId = decipher.update(tokenData.sessionId.sessionId, 'hex', 'utf8') + decipher.final('utf8');
            const sql = `SELECT user.role, session.is_checked
                         FROM user,
                              session
                         WHERE session.id_session = ? AND session.id_user = user.id;`
            db.query(sql, [decryptedSessionId], function (err, result) {
		if (result[0].is_checked == 0){
			resolve(-1);
		}else {
	                resolve(result[0].role);
}
            })
        } catch (e) {
            resolve(-1);
        }
    })




}
