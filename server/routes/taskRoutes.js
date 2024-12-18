import express from 'express';
const router = express.Router();
import protect from '../middleware/protectRouteHandler.js';

import { createTask,getTasks } from '../controllers/taskController.js';



// create task 
router.post('/createTask',protect,createTask);
router.post('/allTasks',protect,getTasks);
// read tasks 
// update task 
// delete task

export default router;