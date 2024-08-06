import express from 'express';
import {createTodo, deleteTask, getTask, updateTask} from '../controller/taskCreateController.js'
import {requireSignIn} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/createtask',requireSignIn,createTodo );
router.get('/gettask/:userId',requireSignIn,getTask);
router.put('/updatetask/:taskId',requireSignIn,updateTask);
router.delete('/deletetask/:taskId',requireSignIn,deleteTask);

export default  router;