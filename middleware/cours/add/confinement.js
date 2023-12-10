import {formatNameFile} from "../../utils/space.js";
import fs from "fs";
import path from 'path';

export function confinement(file, name) {

    return new Promise((resolve, reject) => {
        const extension = "." + file.originalname.split(".").pop();
        const originalPathConfinement = process.env.FILE_STORAGE_CONFINEMENT;
        name = formatNameFile(name);
const baseName = path.basename(name, extension);
        let filePath = originalPathConfinement + name + extension;
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                let count = 1;
                let newFileName = `${baseName}(${count})${extension}`;
               let newFilePath = path.join(originalPathConfinement, newFileName);

                while (fs.existsSync(newFilePath)) {
                    count++;
                    newFileName = `${baseName}(${count})${extension}`;
                    newFilePath = path.join(originalPathConfinement, newFileName);
                }
                name = `${baseName}(${count})${extension}`;
                filePath = originalPathConfinement + name + extension
            }
            fs.writeFile(path.join(originalPathConfinement, name + extension), file.buffer, (writeErr) => {
                if (writeErr) {
                    reject(writeErr);
                } else {
                    resolve([filePath, name + extension]);
                }
            });
        });
    })
}
