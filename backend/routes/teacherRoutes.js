import express from 'express';
import { createTeacherAccount, loginTeacher, studentsForClassTeacher } from '../controller.js/teacherController.js';
import teacherProtect from '../middleware/teacherAuthMiddleware.js';

const router = express.Router();

router.route('/').post(createTeacherAccount);
router.route('/login').post(loginTeacher);
router.route('/login').post(loginTeacher);
router.route('/studentsList').get(teacherProtect, studentsForClassTeacher);

export default router;