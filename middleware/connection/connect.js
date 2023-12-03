import {perm} from "../auth/tools/perm.js";

const connect = (req, res) => {

    perm(req.cookies.token).then(async (result) => {
        if (result == -1){
            return res.status(401).send({
                message: "Non connecté !"
            })
        }
        return res.status(200).send({
            message: "Connecté !s"
        })
    })

}

export default connect;