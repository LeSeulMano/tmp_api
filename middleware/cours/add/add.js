import {perm} from "../../auth/tools/perm.js";
import {confinement} from "./confinement.js";
import {analyze} from "./analyze.js";
import {saving} from "./saving.js";
import db from "../../../lib/db.js";
import {propose} from "./propose.js";
import {getName} from "../../auth/tools/getName.js";


const add = (req, res) => {

    perm(req.cookies.token).then(async (result) => {
        if (result == -1) {
            return res.status(401).send({
                message: "Vous devez être connecté pour ajouter un cours !"
            });
        }
        const file = req.file;
        const teacher = req.body.teacher;
        const year = req.body.year;
        const matter = req.body.matter;
        var name = req.body.name;
        let promotion = req.body.promotion;
        if (promotion == "1A" || promotion == "2A"){
            promotion = promotion.slice(0,-1);
        }
        const type = req.body.type;
        const sql = `SELECT *
                     FROM propose
                     WHERE matter = ?
                       AND name = ?
                       AND promotion = ?
                       AND type = ?
                       AND teacher = ?;`;
        db.query(sql, [matter, name, promotion, type, teacher], (err, result) => {
            if (err) {
                return res.status(500).send({
                    message: err
                })
            }
            if (result.length != 0) {
                return res.status(403).send({
                    message: "Un cours similaire existe déjà. Veuillez changer le nom"
                })
            }
            confinement(file, name).then((response) => {
                analyze(file, response[0], response[1]).then((response) => {
                    propose(response[0], matter, response[1], response[2])
                        .then((response) => {
                            getName(req.cookies.token).then((author) => {
                                const sqlContent = `INSERT INTO content (author, year, path)
                                                VALUES (?, ?, '${response[0]}');`

                                db.query(sqlContent, [author, year], (err, result) => {
                                    if (err) {
                                        return res.status(500).send({
                                            message: err
                                        })
                                    }
                                    const sqlCours = `INSERT INTO propose (matter, name, promotion, type, id, teacher)
                                                  VALUES (?, ?, ?, ?, ${result.insertId}, ?);`
                                    db.query(sqlCours, [matter, response[1], promotion, type, teacher], (err, result) => {

                                        if (err) {

                                            return res.status(500).send({
                                                message: err
                                            })
                                        }

                                        return res.status(200).send({
                                            message: "Upload effectué avec succès !"
                                        })
                                    })
                                })
                            })
                        })
                        .catch((err) => {
                            return res.status(500).send({
                                message: err
                            })
                        })

                })
                    .catch((err) => {
                        return res.status(500).send({
                            message: "Suspicion de virus !"
                        })
                    })

            }).catch((err) => {
                return res.status(500).send({
                    message: err
                })
            })
        })
    })
}

export default add;
