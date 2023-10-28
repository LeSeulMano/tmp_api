import {formatNameFile} from "../../utils/space.js";
import fs from "fs";

export function confinement(file, name) {

    return new Promise((resolve, reject) => {
        const extension = "." + file.originalname.split(".").pop();
        const originalPathConfinement = process.env.FILE_STORAGE_CONFINEMENT;
        name = formatNameFile(name);
        const filePath = originalPathConfinement + name + extension;
        fs.writeFile(filePath, file.buffer, (err) => {
            if (err) {
                reject();
            }
            resolve([filePath, name + extension]);
        })

    })


}