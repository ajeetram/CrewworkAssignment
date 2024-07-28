import { comparePassword, hashPassword }from '../helpers/authHelper.js';
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const loginController = async(req,res)=>{

    try {
        const {email, password} = req.body;

        // check validattion
        if(!email || !password)
        {
            return res.status(404).send({
                success:false,
                message:"Invalid email or password "
            })
        }

        //check user
        const user = await userModel.findOne({email})
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }
        

        const match = await comparePassword(password, user.password)
        
        if(!match)
        {
            return res.status(200).send({
                success:false,
                message:"Invalid password",
            })
        }

        // token

        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                role:user.__v,
    
            },
            token
        });
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in login",
            error,
            
        })
    }
}


//registerController

export const registerController = async(req, res)=>{
    try {
        
        const {name, email, password} = req.body
        // validation
        if(!name)
        {
            return res.send({message:"Name is Required"})
        }
        if(!email)
        {
            return res.send({message:"Email is Required"})
        }
        if(!password)
        {
            return res.send({message:"password is Required"})
        }
      
        
        // check User
        const existingUser = await userModel.findOne({email})
        // existing user
        if(existingUser)
        {
            return res.status(200).send({
                success:false,
                message:'Already registered, please login'
            })
        }

        // register user (if not register)
        const hashedPassword = await hashPassword(password);
        // save 
        const user = await new userModel({name, email, password:hashedPassword}).save();
        res.status(201).send({
            success:true,
            message:"user registered successfully",
            user,
        })
        
    } catch (error) {
        
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registeration",
            error
        })
    }
};

