import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    status:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        required:true,
    },
    deadline:{
        type:String,
        
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
})

export default mongoose.model('task', taskSchema);