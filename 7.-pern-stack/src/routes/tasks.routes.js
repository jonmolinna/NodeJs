import { Router } from 'express';
const router = Router();

import { createTask, deleteTask, getAllTask, getTask, updateTask } from '../controllers/tasks.controllers.js';

router.get('/tasks', getAllTask);

router.get('/task/:id', getTask);

router.post('/task', createTask);

router.delete('/task/:id', deleteTask);

router.put('/task/:id', updateTask);

export default router;