import express from 'express';
import task from '../models/taskModel.js';
import users from '../models/userModel.js';
import mongoose from 'mongoose';
export const createTodo = async(req, res)=>
{
    try {
        const { status, title, description, priority, deadline, userId } = req.body;
        const user = await users.findById(userId);
    
        if (!user) {
          return res.status(400).json({ message: 'User not found' });
        }
    
        const newTask = new task({
          title,
          description,
          priority,
          deadline,
          status,
          userId: user._id
        });
    
        const savedTask = await newTask.save();
        res.json(savedTask);
        
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}


export const getTask= async(req,res)=>
{
    try {
        const gettask = await task.find({userId:req.params.userId}).populate('userId');
        
        res.status(201).send({
          success:true,
          message:"successfully fetch the task",
          gettask,
      })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const updateTask = async(req,res)=>{
  try {
    const {title, description, priority, deadline} = req.body;
    const {taskId}=req.params
    const Task = await task.findById(taskId);
    const updatedTask = await task.findByIdAndUpdate(taskId,{
      status:Task.status,
      title:title || Task.title,
      description:description || Task.description,
      priority:priority || Task.priority,
      deadline:deadline || Task.deadline,
      userId:Task.userId
    },{new:true});
    
    res.status(201).send({
      success:true,
      message:"Task updated successfully",
      updatedTask
    })
    
  } catch (error) {
    res.status(500).send({
      success:false,
      error,
      message:"error in task updation" 
    })
    
  }
}



export const deleteTask = async (req, res) => {
  try {
    const { taskId} = req.params;

   const deletedTask = await task.findByIdAndDelete(taskId);
   if(!deletedTask)
   {
    return res.status(500).send({
      success:false,
      message:"Task not found"
    })
   }
    res.status(200).send({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in task deletion",
      error: error.message,
    });
  }
};
