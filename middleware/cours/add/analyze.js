import FormData from "form-data";
import fs from "fs";
import axios from "axios";


export function analyze(file, filePath, fileName) {

    return new Promise((resolve, reject) => {

        const apiKey = process.env.VTKEY;
        const url = 'https://www.virustotal.com/api/v3/files';


        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath), {
            filename: fileName,
            contentType: 'application/x-msdownload',
        });


        const headers = {
            'accept': 'application/json',
            'x-apikey': apiKey,
            ...formData.getHeaders(),
        };
        axios.post(url, formData, { headers })
            .then((response) => {
                const options = {
                    method: 'GET',
                    url: 'https://www.virustotal.com/api/v3/analyses/' + response.data.data.id,
                    headers: {
                        accept: 'application/json',
                        'x-apikey': apiKey
                    }
                };
                axios
                    .request(options)
                    .then(function (response) {
                        const result = response.data.data.attributes.stats;
                        if (result.suspicious == 0 && result.malicious == 0) {
                            resolve([file, fileName, filePath]);
                        }
                        else {
                            reject("Detected");
                        }
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    })
}