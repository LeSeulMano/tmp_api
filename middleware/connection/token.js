import db from '../../lib/db.js';
import {v4 as uuid4v} from 'uuid';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from "crypto";

const token = (id) => {
    return new Promise((resolve, reject) => {
        const uuid = uuid4v();
        const secretKeyToken = process.env.SECRET_KEY_TOKEN;
        const secretKeyCrypt = process.env.SECRET_KEY

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKeyCrypt, 'hex'), iv);
        const encryptedSessionId = cipher.update(uuid, 'utf8', 'hex') + cipher.final('hex');

        db.query(`UPDATE session
                  SET id_session = '${uuid}'
                  WHERE id_user = ${id}`);

        const tokenData = {
            sessionId: encryptedSessionId,
            iv: iv.toString('hex') // Convertir l'IV en chaîne hexadécimale
        };

        const token = jwt.sign({sessionId: tokenData}, secretKeyToken, {expiresIn: '1d'});
        resolve(token);
    })
}
export default token;