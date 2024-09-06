import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import StudentData from '../models/studentsData.js';

const protect = asyncHandler(async(req, res, next) => {
    let token;
     console.log('Cookies:', req.cookies);
    
    token = req.cookies.jwt;
    // Debugging: Check if token is retrieved
    console.log('Token:', token)
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.student = await StudentData.findById(decoded.id);
            next()
        } catch (error) {
            res.status(401); 
            throw new Error('Not authorized, invalid token')
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})

export default protect;