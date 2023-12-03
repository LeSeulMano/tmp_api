import db from '../../lib/db.js'
import bcrypt from 'bcrypt';
import token from "./token.js";
import transporter from "../../lib/transporter.js";

const register = (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;

    const uphfEmailRegex = /^[a-zA-Z0-9._-]+@uphf\.fr$/;

    if (password != repeatPassword){
        return res.status(409).send({
            message: "Les deux mots de passe ne correspondent pas !"
        })
    }
    if (!uphfEmailRegex.test(email)){
        return res.status(409).send({
            message: "L'email renseigné n'ai pas un mail uphf !"
        })
    }

    const sql = `SELECT * 
                 from user
                 WHERE email = ?
                    OR username = ?`;

    db.query(sql, [email, username], function (err, result) {
        if (err) {
            return res.status(500).send({
                message: err
            })
        }
        if (result.length != 0) {
            return res.status(409).send({
                message: 'This email or student_number is already use !'
            })
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                throw err;
                return res.status(500).send({
                    message: err
                })
            }
            const sql = `INSERT INTO user (username, email, password)
                         VALUES (?, ?, ?)`
            db.query(sql, [username, email, hash], function (err, result) {
                if (err) {
                    if (err) {
                        return res.status(500).send({
                            message: err
                        })
                    }
                }
                db.query(`INSERT INTO session (id_user)
                          VALUES (${result.insertId})`);
                token(result.insertId).then((result) => {

                    const activateLink = 'http://localhost:5000/verification?token=' + result;
                    const mailOption = {
                        form: 'test@delmoo.fr',
                        to: 'random@noob.fr',
                        subject: 'Activation de votre compte',
                        html: `
<html>
<head>
    <title>Confirmation de compte hilarante</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f0f0f0; text-align: center;">
    <div style="background-color: #ffffff; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #f00020;">Bienvenue dans la folie, cher utilisateur !</h1>
        <p>Félicitations ! Vous avez réussi à créer un compte sur notre site ! Nous savons que cela peut être une expérience effrayante, mais ne vous inquiétez pas, nous ne mordons pas (surtout nos serveurs).</p>
        <p>Mais avant de vous lancer dans l'aventure, nous devons nous assurer que vous n'êtes pas un robot déguisé en humain. Pour ce faire, veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous :</p>
        <a href="${activateLink}" style="background-color: #f00020; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; display: inline-block; margin-top: 20px;">Confirmer mon adresse e-mail</a>
        <p>Si vous ne savez pas pourquoi vous êtes ici, ne vous inquiétez pas, c'est normal. Cliquez simplement sur le bouton et tout ira bien (nous l'espérons).</p>
        <p>Merci d'avoir choisi notre site pour vos aventures en ligne. Nous avons hâte de rire, de vous divertir et de vous surprendre.</p>
        <p>Amicalement,</p>
        <p>L'équipe farfelue de delmoo.fr<br>N'oubliez pas, delmoo c'est par les étudiants pour les étudiants.</p>
    </div>
</body>
</html>
  `,                    }

                    transporter.sendMail(mailOption, (err, info) => {
                        if (err) {
                            res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail. Contactez l\'administrateur\n' + err });
                        } else {
                            res.status(200).json({ message: 'E-mail envoyé avec succès.' });
                        }
                    })

                    // res.cookie('token', result, {httpOnly: true, secure: true});
                    // return res.status(201).send({
                    //     message: 'Registered !'
                    // });
                })
            })
        })

    });

}

export default register;