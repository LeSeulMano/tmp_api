import {formatNameFile} from "../../utils/space.js";
import fs from "fs";


export function saving(file, matter, name, promotion, type, odlPath) {

    return new Promise((resolve, reject) => {

        const originalPath = process.env.FILE_STORAGE;

        const filePath =  originalPath + matter + "/" + type + "/" + promotion + "/" + name;

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                reject(new Error('Un fichier avec le même nom existe déjà.'));
            } else {
                fs.rename(oldPath, filePath, (renameErr) => {
                    if (renameErr) {
                        reject(renameErr);
                    } else {
                        resolve(filePath);
                    }
                });
            }
        });
    })

}