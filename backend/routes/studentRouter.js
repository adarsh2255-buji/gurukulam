import express from 'express';
import { createStudent, deleteStudent, getAllStudents, getStudentById, loginStudent, logoutStudent, updateStudent } from '../controller.js/studentsController.js';
import protect from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').post(createStudent).get(getAllStudents);
router.route('/:id').get(protect, getStudentById).put(protect, updateStudent).delete(deleteStudent)
router.route('/login').post(loginStudent)
router.route('/logout').post(logoutStudent)
export default router;