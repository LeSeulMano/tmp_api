const downloadFile = (req, res) => {

    const filePath = req.body.filePath;

    console.log(filePath)

    res.download(filePath, (err) => {
console.log(err);
        if (err) {
            console.log(err)
            return res.status(500).send({
                message: err
            });
        }
    });

}

export default downloadFile;
