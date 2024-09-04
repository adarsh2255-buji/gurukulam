import jwt from 'jsonwebtoken'
import StudentData from '../models/studentsData.js';
import asyncHanlder from 'express-async-handler'

//token verification
const protectMiddleware = asyncHanlder(async(req, res, next) =>{
    let token;
    if(req.cookies.token) {
        try {
            token = req.cookies.token;
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.student = await StudentData.findById(decoded.id);
            if(!req.user) {
                throw new Error();
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
});

export default protectMiddleware;