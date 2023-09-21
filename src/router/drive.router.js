import express from "express";
import { uploadFile } from "../controller/drive.controller.js";

const router = express.Router();
const driveRouter = (app) => {
    router.post('/', uploadFile);

    app.use('/api/drive', router);
}
export default driveRouter;
