import { getUserById } from "../models/userSchema.js";
import { ApiResponse } from "../utils/apiResponse.js";

const isUserAdmin = async(req, res, next) => {
    if(req.body.userId){
        const user = await getUserById(req.body.userId);
        if(user.isAdmin){
            next();
        }
        else{
            res.status(403).json(new ApiResponse(403, null, 'Forbidden'));
        }
    }else{
        res.status(403).json(new ApiResponse(403, null, 'Forbidden'));
    }
}

export {isUserAdmin}