import express from 'express';
import { createMarkList } from '../controller.js/markListController.js';

const router = express.Router();

router.route('/')
.post(createMarkList)

export default router;