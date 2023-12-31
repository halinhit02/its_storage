import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/app.config.js";

const authMiddleware = async (req, res, next) => {
    let token = req.header('Authorization');
    if (!token || token === undefined) {
        return res.status(401).json({ message: 'Invalid token provided in request' });
    }
    token = token.replace('Bearer ', '');
    try {
        const data = jwt.verify(token, JWT_SECRET);
        if (!data) {
            return res.status(401).json({ message: 'Invalid token provided in request' });
        }
        req.data = data;
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
    next();
};

export {
    authMiddleware,
}