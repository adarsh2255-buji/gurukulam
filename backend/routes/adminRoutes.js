import express from 'express';
import {createAdminAccount, getAllStudents, getStudentById, loginAdmin, logoutAdmin} from '../controller.js/adminController.js';
import adminProtect from '../middleware/adminAuthMiddleware.js';


const router = express.Router();

router.route('/create').post(createAdminAccount);
router.route('/login').post( loginAdmin);
router.route('/logout').post(logoutAdmin);
router.route('/getAllStudents').get(adminProtect,getAllStudents);
router.route('/student/:id').get(adminProtect,getStudentById);
// router.route('/student').get(adminProtect,getFilteredStudents);
export default router; 