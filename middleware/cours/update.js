import {perm} from "../auth/tools/perm.js";
import db from "../../lib/db.js";
import {splitString} from "../utils/slash.js";
import fs from 'fs';
import {formatNameFile} from "../utils/space.js";

const update = (req, res) => {

    perm(req.cookies.token).then(async (result) => {
        if (result != 3 || result != 6) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }

        const id = req.body.id;
        let newValue = req.body.value;

        switch (req.params.id) {

            case "1" : // author
                const sql1 = `UPDATE content
                              SET author = ?
                              WHERE id = ?;`
                db.query(sql1, [newValue, id], (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                        })
                    }
                    return res.status(200).send({
                        message: "File updated !"
                    })

                })
                break;

            case "2" : // year
                const sql2 = `UPDATE content
                              SET year = ?
                              WHERE id = ?;`
                db.query(sql2, [newValue, id], (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                        })
                    }
                    return res.status(200).send({
                        message: "File updated !"
                    })
                })
                break;

            case "3": // matter
                const sql3 = `SELECT path
                              FROM content
                              WHERE id = ?;`
                db.query(sql3, [id], (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                        })
                    }
                    const originalPath = process.env.FILE_STORAGE;
                    const path = splitString(result[0].path)
                    const originalPathArg = splitString(originalPath).length - 1;

                    const newPath = originalPath + newValue + "/" + path[1 + originalPathArg] + "/" + path[2 + originalPathArg] + "/" + path[3 + originalPathArg];

                    try {
                        fs.renameSync(result[0].path, newPath);
                        const updatedSql = `UPDATE cours, content
                                            SET cours.matter = ?, content.path = '${newPath}'
                                            WHERE cours.id = content.id AND cours.id = ?;`
                        db.query(updatedSql, [newValue, id], (err, result) => {
                            if (err) {
                                return res.status(500).send({
                                    message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                                })
                            }
                        })
                    } catch (err) {
                        if (err) {
                            return res.status(500).send({
                                message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                            })
                        }
                    }
                })
                break;

            case "4": // type
                const sql4 = `SELECT path
                              FROM content
                              WHERE id = ?;`
                db.query(sql4, [id], (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                        })
                    }
                    const originalPath = process.env.FILE_STORAGE;
                    const path = splitString(result[0].path)
                    const originalPathArg = splitString(originalPath).length - 1;

                    const newPath = originalPath + path[originalPathArg] + "/" + newValue + "/" + path[2 + originalPathArg] + "/" + path[3 + originalPathArg];

                    try {
                        fs.renameSync(result[0].path, newPath);
                        const updatedSql = `UPDATE cours, content
                                            SET cours.type = ?, content.path = '${newPath}'
                                            WHERE cours.id = content.id AND cours.id = ?;`
                        db.query(updatedSql, [newValue, id], (err, result) => {
                            if (err) {
                                return res.status(500).send({
                                    message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                                })
                            }
                        })
                    } catch (err) {
                        if (err) {
                            return res.status(500).send({
                                message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                            })
                        }
                    }
                })
                break;

            case "5": // name
                const sql5 = `SELECT path
                              FROM content
                              WHERE id = ?;`
                db.query(sql5, [id], (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                        })
                    }
                    const originalPath = process.env.FILE_STORAGE;
                    const path = splitString(result[0].path)
                    const originalPathArg = splitString(originalPath).length - 1;

                    const extension = "." + path[path.length - 1].split(".").pop();

                    const newPath = originalPath + path[originalPathArg] + "/" + path[1 + originalPathArg] + "/" + path[2 + originalPathArg] + "/" + newValue + extension;

                    try {
                        fs.renameSync(result[0].path, newPath);
                        newValue = formatNameFile(newValue);
                        const updatedSql = `UPDATE cours, content
                                            SET cours.name = ?, content.path = '${newPath}'
                                            WHERE cours.id = content.id AND cours.id = ?;`
                        db.query(updatedSql, [newValue, id], (err, result) => {
                            if (err) {
                                return res.status(500).send({
                                    message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                                })
                            }
                        })
                    } catch (err) {
                        if (err) {
                            return res.status(500).send({
                                message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                            })
                        }
                    }
                })
                break;

            case "6": // promotion
                const sql6 = `SELECT path
                              FROM content
                              WHERE id = ?;`
                db.query(sql6, [id], (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                        })
                    }
                    const originalPath = process.env.FILE_STORAGE;
                    const path = splitString(result[0].path)
                    const originalPathArg = splitString(originalPath).length - 1;

                    const newPath = originalPath + path[originalPathArg] + "/" + path[originalPathArg + 1] + "/" + newValue + "/" + path[3 + originalPathArg];

                    try {
                        fs.renameSync(result[0].path, newPath);
                        const updatedSql = `UPDATE cours, content
                                            SET cours.promotion = ?, content.path = '${newPath}'
                                            WHERE cours.id = content.id AND cours.id = ?;`
                        db.query(updatedSql, [newValue, id], (err, result) => {
                            if (err) {
                                return res.status(500).send({
                                    message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                                })
                            }
                        })
                    } catch (err) {
                        if (err) {
                            return res.status(500).send({
                                message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                            })
                        }
                    }
                })

                break;

        }

    })


}

export default update;