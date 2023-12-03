import db from "../../lib/db.js";
import fs from "fs";

const deleteFile = (req, res) => {
    const id = req.params.id;

    const sql = `SELECT path
                 FROM content
                 WHERE id = ?;`;

    db.query(sql, [id], function (err, result) {
        if (err) {
            return res.status(500).send({
                message: err
            })
        }
        const path = result[0].path;
        fs.unlink(path, (err) => {
            if (err) {
                return res.status(500).send({
                    message: err
                })
            }
            const sqlRemove2 = `DELETE
                                FROM content
                                WHERE content.id = ?;`
            const sqlRemove1 = `DELETE
                                FROM cours
                                WHERE cours.id = ?;`;
            db.query(sqlRemove1, [id, id], function (err, result) {
                if (err) {
                    return res.status(500).send({
                        message: err
                    })
                }
                db.query(sqlRemove2, [id], function(err, result){
                    if (err) {
                        return res.status(500).send({
                            message: err
                        })
                    }
                    return res.status(200).send();
                })
            })
        });
    })
}

export default deleteFile;