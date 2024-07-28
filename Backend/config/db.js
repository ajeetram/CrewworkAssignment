import mongoose  from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

//dotenv.config('../.env')

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/assignment" )
        console.log(`Connected to MongoDB database ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error in mongoDB ${error}`.bgRed.white)
    }
}

export default connectDB;