import asyncHandler from 'express-async-handler'
import StudentData from '../models/studentsData.js';
import generateToken from '../utils/generateToken.js';

// @desc create a new student
// @route POST/api/students

const createStudent = asyncHandler(async(req, res) =>{
    const {
        name,
        class : studentClass,
        syllabus,
        medium,
        schoolName,
        dateOfBirth,
        fatherName,
        motherName,
        address,
        contactNumber,
        whatsAppNumber,
    } = req.body;

    try {
         // Fetch the last student created
         const lastStudent = await StudentData.findOne().sort({ createdAt: -1 })
         const lastAdmissionNumber = lastStudent ? parseInt(lastStudent.admissionNumber) : 12300;

         //Generate new admission number
         const newAdmissionNumber = (lastAdmissionNumber + 1).toString();
         // Create new student object
        const student = new StudentData({
            name,
            class: studentClass,
            syllabus,
            medium,
            schoolName,
            dateOfBirth,
            fatherName,
            motherName,
            address,
            contactNumber,
            whatsAppNumber,
            admissionNumber: newAdmissionNumber,
    });
    
    const createdStudent = await student.save();
    res.status(201).json(createdStudent)
} catch (error) {
     console.log('Error creating student:', error);
     res.status(500).json({
        message: 'Failed to create student',
        error: error.message,
    })}
})




// @desc Update student by ID
// @route PUT/api/student/:id
const updateStudent = asyncHandler(async (req, res) =>{
    const student = await StudentData.findByIdAndUpdate(req.params.id);
    if(student) {
        student.name = req.body.name || student.name;
        student.class = req.body.class || student.class;
        student.syllabus = req.body.syllabus || student.syllabus;
        student.medium = req.body.medium || student.medium;
        student.schoolName = req.body.schoolName || student.schoolName;
        student.dateOfBirth = req.body.dateOfBirth || student.dateOfBirth;
        student.fatherName = req.body.fatherName || student.fatherName;
        student.motherName = req.body.motherName || student.motherName;
        student.address = req.body.address || student.address;
        student.contactNumber = req.body.contactNumber || student.contactNumber;
        student.whatsAppNumber = req.body.whatsAppNumber || student.whatsAppNumber;

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } else {
        res.status(404);
        throw new Error('Student not found')
    }
});

// @desc Delete student
// @route DELETE /api/student/:id

const deleteStudent = asyncHandler(async (req, res) =>{
    const student = await StudentData.findByIdAndDelete(req.params.id);
    if(student) {
        res.json({ message: 'Student deleted successfully' });
    } else {
        res.status(404);
        throw new Error('Student not found')
    }
});



const loginStudent = asyncHandler(async(req, res) =>{
    const { admissionNumber, dateOfBirth } = req.body;
    const student = await StudentData.findOne({ admissionNumber });

    if(!student) {
        return res.status(401).json({ message: 'Student not found' });
    }

    if(dateOfBirth) {
        generateToken(res, student._id)
        res.status(200).json({
            message: 'Logged in successfully',
            id: student._id,
            name: student.name, 
            admissionNumber: student.admissionNumber,
            class: student.class,
            syllabus: student.syllabus,
            medium: student.medium,
            schoolName: student.schoolName,
            dateOfBirth: student.dateOfBirth,
            fatherName: student.fatherName,
            motherName: student.motherName,
            address: student.address,
            contactNumber: student.contactNumber,
            whatsAppNumber: student.whatsAppNumber,
        });
    }else{
        res.status(401);
        throw new Error('Invalid admission number or date of birth');
    }
})
 
// @desc Student logout
// @route /student/logout
const logoutStudent = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: 'Logged out successfully'
    })
});

export { createStudent, 
    updateStudent, 
    deleteStudent,
    loginStudent,
    logoutStudent };
  