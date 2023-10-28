const forgot = (req, res) => {
    const newpassword = req.body.newpassword;
    const email = req.body.email;

    const sql = `SELECT *
                 FROM user,
                      session
                 WHERE user.email = ?
                   AND user.id = sessions.id_user;`;
    db.query(sql, [email], function (err, result) {

        if (result.length != 1) {
            return res.status(409).send({
                message: "Il n'y a pas de compte associé a cet email"
            })
        }
        if (result[0]['is_checked'] == 0) {
            return res.status(409).send({
                message: 'Email non vérifié !'
            })
        }


    })
}

export default forgot;