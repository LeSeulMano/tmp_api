import db from '../../lib/db.js';
import {perm} from "../auth/tools/perm.js";

const changeRole = async (req, res) => {
    perm(req.cookies.token).then(async (result) => {
        if (result != 6) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        const id_user = req.body.idUser;
        const newRole = req.body.newRole;
        const sql = 'UPDATE user SET role = ? WHERE id = ?';
        id_user.forEach((id, index) => {
            if (newRole[index] == 6){
                return res.status(400).send({
                    message: "Vous ne pouvez pas définir les admins"
                });
            }
            db.query(sql, [newRole[index], id_user[index]], (err) => {
                if (err) {
                    return res.status(500).send({
                        message: "Une erreure est survenu\n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                    })
                }
                else {
                    return res.status(200).send({ message: 'Update effectué' });
                }
            })
        })
    })
}

export default changeRole