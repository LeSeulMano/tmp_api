import db from "../../lib/db.js";

const year = (req, res) => {

    const year = req.body.year;

    const sql = `SELECT * FROM cours, content WHERE cours.promotion = ? AND cours.id = content.id;`;

    db.query(sql, [year], function (err, result) {
        if (err) {
            return res.status(500).send({
                message: err
            })
        }
        return res.status(201).send({
            json: result
        })
    })

}

export default year;