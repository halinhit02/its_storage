import multer from "multer";
import { FOLDER_PUBLIC } from "../config/app.config.js";

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './' + FOLDER_PUBLIC);
    },
    filename: (req, file, next) => {
        next(null, file.originalname);
    },
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(null, false);
    }
    cb(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
});

export default upload.single('file');