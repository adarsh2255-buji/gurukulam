import express from 'express';
import createAdminAccount from '../controller.js/adminController.js';

const router = express.Router();

router.route('/create').post(createAdminAccount)

export default router;