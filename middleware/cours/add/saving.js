import {formatNameFile} from "../../utils/space.js";
import fs from "fs";


export function saving(file, matter, name, promotion, type, odlPath) {

    return new Promise((resolve, reject) => {

        const originalPath = process.env.FILE_STORAGE;

        const filePath =  originalPath + matter + "/" + type + "/" + promotion + "/" + name;

        fs.rename(odlPath, filePath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(filePath);
        })
    })

}