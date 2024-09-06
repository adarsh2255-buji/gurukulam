import express from 'express';
import {createAdminAccount, loginAdmin} from '../controller.js/adminController.js';


const router = express.Router();

router.route('/create').post(createAdminAccount)
router.route('/login').post( loginAdmin)
export default router; 