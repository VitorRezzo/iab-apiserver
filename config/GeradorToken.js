

import jwt from "jsonwebtoken";
const SECRETOKEN = "45t154eer45yu45rt4";

export const Token = (id) =>{
return jwt.sign({userId:id},SECRETOKEN,{expiresIn:100})
}


export const verifyJWT = (req,res,next)=> {
    
    const token = req.headers["x-acess-token"]
    
    if(!token){
        res.json({auth:false, message:"Usuario não tem token"})
    }else{
        jwt.verify(token,SECRETOKEN,(err,decoded )=>{
            if(err){
                res.json({auth:false, message:"esse token não existe"})
            }else{
                req.userId = decoded.id;
                next();
            }
        })
    }

}