import fs from "fs";
import { FOLDER_PUBLIC } from "../config/app.config.js";

const checkFileNameExists = (filename) => {
    const files = fs.readdirSync("./" + FOLDER_PUBLIC);
    files.forEach((value, index) => {
        if (value.toLowerCase().includes(filename.toLowerCase())) {
            const filePath = "./" + FOLDER_PUBLIC + "/" + value;
            fs.rmSync(filePath);
            return;
        }
    });
}

export {
    checkFileNameExists,
}