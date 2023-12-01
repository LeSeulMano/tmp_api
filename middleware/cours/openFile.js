import fs from 'fs';

const openFile = (req, res) => {

    const file = req.query.file;

    fs.readFile(file, (err, data) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture du fichier.\n' + err);
        }

        res.contentType('application/pdf');
        res.send(data);
    });

}

export default openFile;