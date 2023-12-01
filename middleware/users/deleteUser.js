import db from '../../lib/db.js';
import {perm} from "../auth/tools/perm.js";

const deleteUser = async (req, res) => {

    perm(req.cookies.token).then(async (result) => {
        if (result != 6) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        const id = req.params.id;
        const sql = 'SELECT role FROM user WHERE id = ?'
        db.query(sql, [id], (err, result) => {
            if (err) {
                return res.status(500).send({
                    message: "Une erreure est survenu\n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                })
            }
            if(result[0].role == 6) {
                return res.status(400).send({
                    message: "Vous ne pouvez pas supprimer les administrateurs"
                })
            }else {
                const sql = 'DELETE FROM session WHERE id_user = ?;';
                db.query(sql, [id], (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            message: "Une erreure est survenu\n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                        })
                    }
                    else {
                        const sql = 'DELETE FROM user WHERE id = ?;';
                        db.query(sql, [id], (err, result) => {
                            if (err) {
                                return res.status(500).send({
                                    message: "Une erreure est survenu\n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                                })
                            } else {
                                return res.status(200).send({ message: 'Supression effectué' });
                            }
                        })

                    }
                })
            }
        })

    })
}

export default deleteUser;