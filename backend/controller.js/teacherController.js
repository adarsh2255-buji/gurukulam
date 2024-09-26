import Teacher from "../models/teacher.js";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import generateToken from "../utils/generateToken.js";

// @desc create a new teacher account
// @route POST/api/teacher/create
const createTeacherAccount = asyncHandler(async(req, res) =>{
    const { name, email,  password } = req.body;

    // validate inputs
    if(!name || !password || !email) {
        return res.status(400).json({ message: 'name, email, password are required' });
    }

     // Validate password length
     if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // check if email already exists
    const teacherExists = await Teacher.findOne({ email });
    if(teacherExists) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new teacher account
    const teacher = new Teacher({
        name,
        email,
        password: hashedPassword,
    });
    
    await teacher.save();
    res.status(201).json({ message: 'account created', teacher })
});

// @desc login teacher
 // @route POST/api/teacher/login
 const loginTeacher = asyncHandler(async(req, res) =>{

    const { email, password } = req.body;

    // validate inputs
    if(!email ||!password) {
        return res.status(400).json({ message: 'email and password are required' });
    }

    // check if teacher exists
    const teacher = await Teacher.findOne({ email });
    if(!teacher) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, teacher.password);
    if(!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // generate and send JWT token
    if(teacher && isMatch) {
        generateToken(res, teacher._id)
        res.status(200).json({
            message: 'Logged in successfully',
            id: teacher._id,
            name: teacher.name,
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
export { createTeacherAccount, loginTeacher}

    