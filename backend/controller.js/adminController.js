import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import Admin from '../models/admin.js';
import generateToken from '../utils/generateToken.js';
import StudentData from '../models/studentsData.js';

// @desc create a new admin account
// @route POST/api/admin/create

const createAdminAccount = asyncHandler(async(req, res) =>{
    const { name,email,  password } = req.body;

    // validate inputs
    if(!name || !password || !email) {
        return res.status(400).json({ message: 'name, email, password are required' });
    }

    // check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if(existingAdmin) {
        return res.status(400).json({ message: 'Admin account with this email already exists' });
    }

    // hash the password
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // create new admin account
    const admin = await Admin.create({ 
        name,
        email, 
        password : hashedPassword 
    });
    res.status(201).json({ message: 'Admin account created successfully', admin });
});

// @desc login admin
// @route POST/api/admin/login

const loginAdmin = asyncHandler(async(req, res) =>{

    const { email, password } = req.body;

    // validate inputs
    if(!email ||!password) {
        return res.status(400).json({ message: 'email and password are required' });
    }

    // check if admin exists
    const admin = await Admin.findOne({ email });
    if(!admin) {
        return res.status(401).json({ message: 'Admin account not found' });
    }

    // compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    if(admin && isMatch){
        // generate JWT token
        generateToken(res, admin._id)
        res.status(201).json({
            message : "Admin logged in successful",
            id: admin._id,
            name : admin.name,
            email : admin.email,
            role : admin.role,
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password ')
    }
});

// @desc admin logout
// @route POST/api/admin/logout
const logoutAdmin = asyncHandler(async(req, res) => {
    res.clearCookie('jwt');
    res.json({ message: 'Admin logged out' });
});

// @desc get all students  
// @route GET/api/admin/getAllStudents
const getAllStudents = asyncHandler(async(req, res) =>{
    const students = await StudentData.find({});
    res.json(students);
})


//@desc Get students by ID
// @route GET /api/students/:id

const getStudentById = asyncHandler(async(req, res) =>{
    const studentId = req.params.id;
    if (!studentId) {
        return res.status(400).json({ message: 'Student ID is required' });
    }
    try {
        const student = await StudentData.findById(studentId);

        if (student) {
            return res.json(student);
        } else {
            res.status(404);
            throw new Error('Student not found');
        }
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ message: 'Error fetching student data' });
    }
});


export {
    createAdminAccount, 
    loginAdmin,
    logoutAdmin,
    getAllStudents,
    getStudentById,
};