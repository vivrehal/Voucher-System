import jwt from 'jsonwebtoken';
import { getUserById } from '../models/userSchema.js';
import { ApiResponse } from '../utils/apiResponse.js';

const verifyUser = async (req, res, next) => {  
    const token=req.cookies?.token;
    if(token){
        const user= jwt.verify(token, process.env.JWT_SECRET);
        if(!user){
            res.status(401).json(new ApiResponse(403, null, 'Unauthorized'));
            return
        }
        const isUser = await getUserById(user.id);   
        if(!isUser){
            res.status(401).json(new ApiResponse(403, null, 'Unauthorized'));
            return
        }
        // console.log(user)
        req.body.userId = isUser.id;
        next();
    }else{
        res.status(401).json(new ApiResponse(403, null, 'Unauthorized'));
    }
}

export {verifyUser}