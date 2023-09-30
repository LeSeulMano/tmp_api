import db from '../../lib/db.js';
import { v4 as uuid4v } from 'uuid';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const token = (id) => {
    return new Promise((resolve, reject) => {
        const uuid = uuid4v();
        const secretKey = process.env.SECRET_KEY;
        bcrypt.hash(uuid, 10, async (err, result) => {
            if (err) {
                reject(err);
            }
            db.query(`UPDATE session SET id_session = '${uuid}' WHERE id_user = ${id}`);
            const token = jwt.sign({sessionId: result}, secretKey, { expiresIn: '1d'});
            resolve(token);
        })
    })
}
export default token;