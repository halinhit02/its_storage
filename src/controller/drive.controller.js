import { MulterError } from "multer";
import upload from "../middleware/upload.middleware.js";
import { uploadDriveFile } from "../helper/google_apis.helper.js";
import fs from "fs";

export const uploadFile = (req, res) => {
    upload(req, res, async (err) => {
        const { studentName, studentCode } = req.body;
        if (!studentName || !studentCode) {
            return res.status(400).json({
                message: "Please enter a student name and code.",
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
        file.originalname = studentCode + '-' + studentName + file.originalname.substring(dotIndex);
        const newFilePath = file.destination + '/' + file.originalname;
        try {

            //upload file to Drive
            uploadDriveFile(file).then((value) => {
                console.log("Save file with id: " + value.data.id);
                //rename file
                fs.renameSync(file.path, newFilePath);
            });
            // save image successfully
            return res.status(200).json({ message: 'Save file successfully' });
        } catch (err) {
            console.error('Error uploading file:', err.message);
            res.status(500).json({ error: 'Failed to upload file. Try again.' });
        }
    });
}