import JWT from 'jsonwebtoken';

// protect routes token based

export  const requireSignIn = async(req,res,next)=>{
     try {
        const decode = JWT.verify(req.headers.authorization, "qmksgtr234@&fgr");
        req.user = decode;
        next();
     } catch (error) {
        console.log(error);
     }
}
