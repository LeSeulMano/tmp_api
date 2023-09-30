import {perm} from "../auth/tools/perm.js";
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import { formatNameFile } from '../utils/space.js';


const add = (req, res) => {

    perm(req.cookies.token).then(async (result) => {

        // if (result != 3 || result != 6) {
        //     return res.status(401).send({
        //         message: "Unauthorized"
        //     });
        // }


        const apiKey = process.env.VTKEY;

        const file = req.file;

        const author = req.body.author;
        const year = req.body.year;
        const matter = req.body.matter;
        var name = req.body.name;
        const promotion = req.body.promotion;
        const type = req.body.type;
        const extension = "." + file.originalname.split(".").pop()

        name = formatNameFile(name);
        const filePath = process.env.FILE_STORAGE + matter + "/" + type + "/" + promotion + "/" + name + extension;
        fs.writeFile(filePath, file.buffer, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: 'Failed to write file to disk.'
                });
            }

            console.log('file saved:', filePath);
        })

        // const filePath = 'mingw-get-setup.exe';
        // const url = 'https://www.virustotal.com/api/v3/files';
        //
        // const formData = new FormData();
        // formData.append('file', fs.createReadStream(filePath), {
        //     filename: 'mingw-get-setup.exe',
        //     contentType: 'application/x-msdownload',
        // });
        //
        // const headers = {
        //     'accept': 'application/json',
        //     'x-apikey': apiKey,
        //     ...formData.getHeaders(), // Obtenez les en-têtes de FormData pour la requête
        // };
        //
        // axios.post(url, formData, { headers })
        //     .then((response) => {
        //
        //         const options = {
        //             method: 'GET',
        //             url: 'https://www.virustotal.com/api/v3/analyses/' + response.data.data.id,
        //             headers: {
        //                 accept: 'application/json',
        //                 'x-apikey': apiKey
        //             }
        //         };
        //
        //         axios
        //             .request(options)
        //             .then(function (response) {
        //                 console.log(response.data.data.attributes.stats);
        //             })
        //             .catch(function (error) {
        //                 console.error(error);
        //             });
        //
        //
        //         console.log(response.data.data.id);
        //     })
        //     .catch((error) => {
        //         console.error('Erreur lors de la requête :', error);
        //     });



    })
}

export default add;