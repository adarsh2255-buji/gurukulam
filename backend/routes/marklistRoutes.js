import express from 'express';
import { createMarkList, getMarkList } from '../controller.js/markListController.js';

const router = express.Router();

router.route('/').post(createMarkList);
router.route('/:studentId').get(getMarkList)

export default router; 