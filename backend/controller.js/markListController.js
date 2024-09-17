import asyncHandler from 'express-async-handler';
import StudentData from '../models/studentsData.js';
import MarkList from '../models/mark.js';
// @dec create marklist for studetns.
// @route POST/api/marks

const createMarkList = asyncHandler(async(req, res) =>{
    const {
        studentId,
        examName,
        examDate,
        marks,
    } = req.body;

    // validate inputs
    if(!studentId ||!examName ||!examDate ||!marks || !marks.length) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if student exists
    const student = await StudentData.findById(studentId);
    if(!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    // Calculate total marks obtained
    const totalMarksObtained = marks.reduce((acc, mark) => acc + mark.markObtained, 0);

    // Calculate the total maximum marks possible (sum of all `maxMark`)
    const totalMaxMarks = marks.reduce((acc, mark) => acc + mark.maxMark, 0);

    //Calculate percentage 
    const percentage = (totalMarksObtained / totalMaxMarks) * 100;

    // Calculate average marks
    const averageMark = totalMarksObtained / marks.length;

    // Create new marklist
    const markList = new MarkList({
        studentId,
        examName,
        examDate,
        marks,
        totalMarksObtained,
        percentage: percentage.toFixed(2),
        averageMark: averageMark.toFixed(2),
    });
    
    // Save marklist
    const createdMarkList = await markList.save();
    res.status(201).json(createdMarkList);
});

// @ desc Get mark list for a specific student
// @route GET/api/marks/:studentId

const getMarkList = asyncHandler(async(req, res) =>{
    const studentId = req.params.studentId;
    if (!studentId) {
        return res.status(400).json({ message: 'Student ID is required' });
    }
    try {
        const markList = await MarkList.find({ studentId });
        if (!markList) {
            return res.status(404).json({ message: 'No mark list found for this student' });
        }
        res.json(markList);
    } catch (error) {
        console.log('Error getting mark list:', error);
        res.status(500).json({ message: 'Failed to get mark list' });
    }
});

export {
    createMarkList,
    getMarkList,
}