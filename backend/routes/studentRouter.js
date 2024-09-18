import express from 'express';
import { createStudent, deleteStudent, loginStudent, logoutStudent, updateStudent } from '../controller.js/studentsController.js';
import adminProtect from '../middleware/adminAuthMiddleware.js';


const router = express.Router();

router.route('/').post(createStudent);
router.route('/:id').put(adminProtect, updateStudent).delete(deleteStudent)
router.route('/login').post(loginStudent)
router.route('/logout').post(logoutStudent)
export default router;  