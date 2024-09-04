import express from 'express';
import { createStudent, deleteStudent, getAllStudents, getStudentById, loginStudent, logoutStudent, updateStudent } from '../controller.js/studentsController.js';


const router = express.Router();

router.route('/').post(createStudent).get(getAllStudents);
router.route('/:id').get(getStudentById).put(updateStudent).delete(deleteStudent)
router.route('/login').post(loginStudent)
router.route('/logout').post(logoutStudent)
export default router;