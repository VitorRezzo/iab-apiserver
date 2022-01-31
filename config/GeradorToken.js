import jwt from "jsonwebtoken";



export const Token = (id) =>{
   
return jwt.sign({userId:id},process.env.SECRET_TOKEN,{expiresIn:"1h"})
}


export const verifyJWT = (req,res,next)=> {
    
    const token = req.headers["x-acess-token"]
    
    if(!token){
        res.json({auth:false, message:"Usuario não tem token"})
    }else{
        jwt.verify(token,process.env.SECRET_TOKEN,(err,decoded )=>{
            if(err){
                res.json({auth:false, message:"esse token não existe"})
            }else{
                req.userId = decoded.id;
                next();
            }
        })
    }

}