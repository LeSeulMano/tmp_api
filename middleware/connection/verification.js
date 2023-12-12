import jwt from "jsonwebtoken";
import crypto from "crypto";
import db from '../../lib/db.js';

const verification = async (req, res) => {
    const token = req.query.token;
    const secret_key = process.env.SECRET_KEY_TOKEN;
    const secretKeyCrypt = process.env.SECRET_KEY;

    const tokenData = jwt.verify(token, secret_key);
    const iv = Buffer.from(tokenData.sessionId.iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKeyCrypt, 'hex'), iv);
    const decryptedSessionId = decipher.update(tokenData.sessionId.sessionId, 'hex', 'utf8') + decipher.final('utf8');
    const sql = `UPDATE session SET is_checked = 1 WHERE id_session = ?;`;
    db.query(sql, [decryptedSessionId], function(err, result) {
        if (err) {
            return res.status(500).send({
                message: err
            })
        }
        if (result.affectedRows > 0){
            res.cookie('token', token, {httpOnly: true, secure: true});
res.redirect('https://delmoo.fr');
        }
        else {
            return res.status(500).send({
                message: "Echec de la vérification de l'adresse mail, veuillez contacter l'administrateur"
            })
        }
    })
}

export default verification;
