import {formatNameFile} from "../../utils/space.js";
import fs from "fs";
import path from 'path';

export function confinement(file, name) {

    return new Promise((resolve, reject) => {

        const extension = "." + file.originalname.split(".").pop();
        const originalPathConfinement = process.env.FILE_STORAGE_CONFINEMENT;
        name = formatNameFile(name);

        let pathFile = originalPathConfinement + name + extension;

        fs.access(pathFile, fs.constants.F_OK, (err) => {
            if (!err) {
                let count = 1;
                let newFileName = name + '(' + count + ')' + extension;
                let newFilePath = originalPathConfinement + newFileName;

                while (fs.existsSync(newFilePath)) {
                    count++;
                    newFileName = newFileName = name + '(' + count + ')' + extension;
                    newFilePath = originalPathConfinement + newFileName;
                }
                pathFile = newFilePath;
                name = newFileName;
            }
            fs.writeFile(pathFile, file.buffer, (writeErr) => {
                if (writeErr) {
                    reject(writeErr);
                } else {
                    resolve([pathFile, name]);
                }
            });

        });
    })
}
