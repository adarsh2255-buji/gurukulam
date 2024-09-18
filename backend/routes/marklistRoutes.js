import express from 'express';
import { createMarkList, deleteMarkList, getMarkList } from '../controller.js/markListController.js';
import adminProtect from '../middleware/adminAuthMiddleware.js';

const router = express.Router();

router.route('/').post(adminProtect, createMarkList);
router.route('/:studentId').get(adminProtect, getMarkList);
router.route('/:id').delete(adminProtect, deleteMarkList)

export default router; 