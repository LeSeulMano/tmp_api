import db from "../../lib/db.js";

const list = (req, res) => {

    db.query(`SELECT * FROM content, cours WHERE cours.id = content.id;`, function (err, result) {
        if (err) {
            return res.status(500).send({
                message: err
            })
        }
        console.log(result)
        return res.status(201).send({
            json: result
        })
    });
}
export default list;