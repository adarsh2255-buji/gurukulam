import express from 'express';
import { createTeacherAccount, loginTeacher } from '../controller.js/teacherController.js';

const router = express.Router();

router.route('/').post(createTeacherAccount);
router.route('/login').post(loginTeacher)

export default router;