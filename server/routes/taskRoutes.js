import express from 'express';
const router = express.Router();
import protect from '../middleware/protectRouteHandler.js';

import { createTask,getTasks,updateTask } from '../controllers/taskController.js';



// create task 
router.post('/createTask',protect,createTask);
router.post('/allTasks',protect,getTasks);
router.get('/update/:productId',protect,updateTask);
// read tasks 
// update task 
// delete task

export default router;