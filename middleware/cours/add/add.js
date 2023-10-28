import {perm} from "../../auth/tools/perm.js";
import {confinement} from "./confinement.js";
import {analyze} from "./analyze.js";
import {saving} from "./saving.js";
import db from "../../../lib/db.js";


const add = (req, res) => {

    perm(req.cookies.token).then(async (result) => {
        // if (result != 3 || result != 6) {
        //     return res.status(401).send({
        //         message: "Unauthorized"
        //     });
        // }
        const file = req.file;
        const author = req.body.author;
        const year = req.body.year;
        const matter = req.body.matter;
        var name = req.body.name;
        const promotion = req.body.promotion;
        const type = req.body.type;

        const sql = `SELECT *
                     FROM cours
                     WHERE matter = ?
                       AND name = ?
                       AND promotion = ?
                       AND type = ?;`;
        db.query(sql, [matter, name, promotion, type], (err, result) => {
            if (err) {
                return res.status(500).send({
                    message: "Une erreure est survenu\n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                })
            }
            if (result.length != 0) {
                return res.status(403).send({
                    message: "Un cours similaire existe déjà. Veuillez changer le nom"
                })
            }
            confinement(file, name).then((response) => {
                analyze(file, response[0], response[1]).then((response) => {
                    saving(response[0], matter, response[1], promotion, type, response[2])
                        .then((response) => {
                            const sqlContent = `INSERT INTO content (author, year, path)
                                                VALUES (?, ?, '${response}');`

                            db.query(sqlContent, [author, year], (err, result) => {
                                if (err) {
                                    return res.status(500).send({
                                        message: "Une erreure est survenu\n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                                    })
                                }
                                const sqlCours = `INSERT INTO cours (id, matter, name, promotion, type)
                                                  VALUES (${result.insertId}, ?, ?, ?, ?);`
                                db.query(sqlCours, [matter, name, promotion, type], (err, result) => {
                                    if (err) {
                                        return res.status(500).send({
                                            message: "Une erreure est survenu\n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                                        })
                                    }
                                    return res.status(200).send({
                                        message: "Upload effectué avec succès !"
                                    })
                                })
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                            return res.status(500).send({
                                message: "Une erreure est survenu\n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                            })
                        })

                })
                    .catch((err) => {
                        console.log(err)
                        return res.status(500).send({
                            message: "Suspicion de virus !"
                        })
                    })

            }).catch((err) => {
                return res.status(500).send({
                    message: "Une erreure est survenu\n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
                })
            })
        })
    })
}

export default add;