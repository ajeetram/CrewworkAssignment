import express from 'express';
import { registerController, loginController} from '../controller/authController.js';
import {requireSignIn} from '../middlewares/authMiddleware.js';



// route object
const router = express.Router();

// routing 
// REGISTER || METHOD POST

router.post("/register", registerController)

// LOGIN || POST
router.post("/login", loginController)

// protected auth route
 router.get('/user-auth', requireSignIn,async(req,res)=>{
    res.status(200).send({ok:true});
 })






 export default  router;