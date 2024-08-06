import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB  from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import cors from 'cors'
import path from 'path'

// env config
dotenv.config();
// database config
connectDB();

// rest object
const app  = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}))
//app.use(express.static(path.join(__dirname,'./client/build')));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", taskRoutes);



// port
const PORT= process.env.PORT||800;

// run listen
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`.bgCyan.white); 
   
})