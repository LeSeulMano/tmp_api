import { perm } from "../auth/tools/perm.js";
import db from "../../lib/db.js";
import fs from 'fs';
import path from "path";

const valide = (req, res) => {
    perm(req.cookies.token).then(async (role) => {
        if (role != 3 && role != 6) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }

        const matter = req.body.matter;
        const teacher = req.body.teacher
        const promotion = req.body.promotion.toString();
        const id = req.body.id;
        const type = req.body.type;

        const originalPath = process.env.FILE_STORAGE;

        const sql = 'SELECT path FROM content WHERE id = ?;';

        db.query(sql, [id], (err, result) => {
            if (err) {
                return res.status(500).send({
                    message: err
                });
            }

            let newPath = path.join(originalPath, matter, type, promotion);
            let name = req.body.name;

            fs.access(newPath, fs.constants.F_OK, (err) => {
                if (!err) {
                    let count = 1;
                    const baseName = path.basename(name, path.extname(name));
                    const extension = path.extname(result[0].path);

                    let newFileName = `${baseName}${extension}`;
                    let newFilePath = path.join(newPath, newFileName);

                    while (fs.existsSync(newFilePath)) {
                        count++;
                        newFileName = `${baseName}(${count})${extension}`;
                        newFilePath = path.join(newPath, newFileName);
                    }

                    newPath = newFilePath;
                    name = newFileName;
                }
                console.log(newPath)
                fs.rename(result[0].path, newPath, (renameErr) => {
                    if (renameErr) {
                        return res.status(500).send({
                            message: renameErr
                        });
                    } else {
                        const sql = 'DELETE FROM propose WHERE id = ?;'
                        db.query(sql, [id], (err, result) => {
                            if (err) {
                                return res.status(500).send({
                                    message: err
                                })
                            }
                            const sql = "INSERT INTO cours(matter, name, promotion, type, id, teacher) VALUES (?, ?, ?, ?, ?, ?)"
                            db.query(sql, [matter, name, promotion, type, id, teacher], (err, result) => {
                                if (err) {
                                    return res.status(500).send({
                                        message: err
                                    })
                                }
                                const sql = `UPDATE content SET path = ? WHERE id = ?;`;
                                db.query(sql, [newPath, id], (err, result) => {
                                    if (err) {
                                        return res.status(500).send({
                                            message: err
                                        })
                                    }
                                    return res.status(200).send({
                                        message: "Fichier validé !"
                                    })
                                })
                            })
                        })
                    }
                });
            });
        });
    });
};

export default valide;
