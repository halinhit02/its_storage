import { google } from "googleapis";
import fs from "fs";
import appRoot from "app-root-path"
import { FOLDER_ID } from "../config/app.config.js";

const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(fs.readFileSync(appRoot.path + '/credentials.json')),
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({
    version: 'v3',
    auth,
})


const uploadDriveFile = async (fileObject) => {
    return drive.files.create({
        requestBody: {
            name: fileObject.originalname,
            mimeType: fileObject.mimetype,
            parents: [FOLDER_ID],
        },
        media: {
            mimeType: fileObject.mimetype,
            body: fs.createReadStream(appRoot.path + '/' + fileObject.path),
        },
        fields: ['id', 'name'],
    });
}

export {
    uploadDriveFile
}