import fs from "fs";
import path from 'path';

export function propose(file, matter, name, odlPath) {

    return new Promise((resolve, reject) => {

        const originalPath = process.env.FILE_STORAGE_PROPOSE;

        let filePath =  originalPath + name;

        const baseName = path.basename(name, path.extname(name));
        const extension = path.extname(name);

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                let count = 1;
                let newFileName = `${baseName}(${count})${extension}`;
                let newFilePath = path.join(originalPath, newFileName);

                while (fs.existsSync(newFilePath)) {
                    count++;
                    newFileName = `${baseName}(${count})${extension}`;
                    newFilePath = path.join(originalPath, newFileName);
                }

                name = `${baseName}(${count})${extension}`;
                filePath = originalPath + name
            }

            fs.rename(odlPath, path.join(originalPath, name), (renameErr) => {
                if (renameErr) {
                    reject(renameErr);
                } else {
                    resolve([filePath, name.slice(0, -extension.length)]);
                }
            });
        });
    })

}