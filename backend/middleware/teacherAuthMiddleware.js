import asyncHandler from 'express-async-handler';
import Teacher from '../models/teacher.js';

const teacherProtect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.teacher = await Teacher.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Invalid/Expired token' });
        }
    } else {
        res.status(401).json({ message: 'No token, authorization denied' });
    }
 
});

export default teacherProtect;