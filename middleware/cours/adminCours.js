import db from "../../lib/db.js";
const adminCours = (req, res) => {
    const sql = 'SELECT * FROM content, propose WHERE content.id = propose.id;'
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send({
                message: "Une erreure est survenu: \n" + err + "\nSi le problème persiste veuillez contacter l'administrateur"
            })
        }
        return res.status(200).send({
            json: result
        })
    })
}

export default adminCours;