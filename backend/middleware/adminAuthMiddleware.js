import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/admin.js';

const adminProtect = asyncHandler(async (req, res, next) =>{
    let token;
    console.log('Cookies:', req.cookies);
    
    token = req.cookies.token;
    // Debugging: Check if token is retrieved
    console.log('Token:', token)
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await Admin.findById(decoded.id).select('-password');
            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: 'Not authorized, Invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized,  no token' });
    }
});
 
export default adminProtect;