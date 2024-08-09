import express from 'express';
import {createTodo, deleteTask, getTask, onDragUpdateList, updateTask} from '../controller/taskCreateController.js'
import {requireSignIn} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/createtask',requireSignIn,createTodo );
router.get('/gettask/:userId',requireSignIn,getTask);
router.put('/updatetask/:taskId',requireSignIn,updateTask);
router.delete('/deletetask/:taskId',requireSignIn,deleteTask);
router.put('/updateOnDrageDrop/:taskId',requireSignIn,onDragUpdateList);

export default  router;