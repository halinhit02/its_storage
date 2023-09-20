import { MulterError } from "multer";
import upload from "../middleware/upload.middleware.js";
import { uploadDriveFile } from "../helper/google_apis.helper.js";
import fs from "fs";
import { checkFileNameExists } from "../helper/storage.helper.js";

export const uploadFile = (req, res) => {
    upload(req, res, async (err) => {
        const { studentCode } = req.body;
        if (!studentCode) {
            return res.status(400).json({
                message: "Please enter a student code.",
            })
        }
        if (req.fileValidationError) {
            return res.status(400).json({
                'message': req.fileValidationError
            });
        }
        else if (err instanceof MulterError) {
            return res.status(400).json({
                'message': err.message,
            });
        } else if (err) {
            return res.status(400).json({
                'message': err.message
            });
        } else if (!req.file) {
            return res.status(400).json({
                'message': 'Please select an image to upload.',
            });
        }
        const { file } = req;
        const dotIndex = file.originalname.lastIndexOf('.');
        file.originalname = studentCode + file.originalname.substring(dotIndex);
        checkFileNameExists(studentCode);
        const newFilePath = file.destination + '/' + file.originalname;
        try {
            //rename file
            fs.renameSync(file.path, newFilePath);
            file.path = newFilePath;
            //upload file to Drive
            uploadDriveFile(file).then((value) => {
                console.log("Save file with id: " + value.data.id);

            });
            // save image successfully
            return res.status(200).json({ message: 'Save file successfully' });
        } catch (err) {
            console.error('Error uploading file:', err.message);
            res.status(500).json({ error: 'Failed to upload file. Try again.' });
        }
    });
}