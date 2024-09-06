import asyncHandler from 'express-async-handler'
import Admin from '../models/admin.js';

// @desc create a new admin account
// @route POST/api/admin/create

const createAdminAccount = asyncHandler(async(req, res) =>{
    const { name,email,  password } = req.body;

    // validate inputs
    if(!name || !password || !email) {
        return res.status(400).json({ message: 'name, email, password are required' });
    }

    // check if admin already exists
    const admin = await Admin.findOne({ email });
    if(admin) {
        return res.status(400).json({ message: 'Admin account with this email already exists' });
    }

    // create new admin account
    const newAdmin = new Admin({ name,email, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin account created successfully', newAdmin });
});

export default createAdminAccount;