import express from "express";
import { uploadFile } from "../controller/drive.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();
const driveRouter = (app) => {
    router.post('/', uploadFile);

    app.use('/api/drive', router);
}
export default driveRouter;
