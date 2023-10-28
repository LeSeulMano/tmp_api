import db from "../../lib/db.js";

const search = (req, res) => {

    if (req.body.search) {

        const search = req.body.search;

        const sql = `SELECT * FROM cours, content WHERE cours.name LIKE ? AND cours.id = content.id;`;

        db.query(sql, [search], function (err, result) {
            if (err) {
                return res.status(500).send({
                    message: err
                })
            }
            return res.status(201).send({
                json: result
            })
        });
    }
    else {
        const year = req.body.year;

        db.query(`SELECT * FROM promotion WHERE `, function (err, result) {
            if (err) {
                return res.status(500).send({
                    message: err
                })
            }
            return res.status(201).send({
                json: result
            })
        });
    }


}
export default search;