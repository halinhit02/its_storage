import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const FOLDER_ID = process.env.FOLDER_ID || "";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const FOLDER_PUBLIC = process.env.FOLDER_PUBLIC || "public";
const STATIC_PATH = process.env.STATIC_PATH || "static";
export {
    PORT,
    FOLDER_ID,
    JWT_SECRET,
    FOLDER_PUBLIC,
    STATIC_PATH,
}