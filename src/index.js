import express from "express";
import cors from "cors";
import driveRouter from "./router/drive.router.js";
import { PORT, STATIC_PATH, FOLDER_PUBLIC } from "./config/app.config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cors());
app.use('/' + STATIC_PATH, express.static(FOLDER_PUBLIC));

// use routers
driveRouter(app);

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
})