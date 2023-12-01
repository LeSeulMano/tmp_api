const downloadFile = (req, res) => {

    const filePath = req.body.filePath;

    console.log(filePath)

    res.download(filePath, (err) => {
        if (err) {
            return res.status(500).send('Erreur lors du téléchargement du fichier.\n' + err);
        }
    });

}

export default downloadFile;