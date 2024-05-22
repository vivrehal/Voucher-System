import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { calculateDiscount, canUserUseVoucher } from "../models/voucherUsedSchema.js";
import { getUser } from "../models/userSchema.js";
import { generateToken } from "../utils/generateToken.js";

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json(new ApiResponse(400, null, 'Please provide email and password'))
        return
    }
    const user= await getUser(email);
    console.log(user)
    if(!user || user.password !== password){  
        res.status(401).json(new ApiResponse(401, null, 'Invalid email or password'))
        return
    }

    const token = generateToken({...user, password: undefined});

    if(!token){
        res.status(500).json(new ApiResponse(500, null, 'Internal server error'))
        return
    }

    // console.log("User logged in")
    res.cookie('token', token, {httpOnly: true, secure:true})
        .status(200)
        .json(new ApiResponse(200, {...user, password: undefined, token}, 'User logged in'))
})

const userCheckout = asyncHandler(async(req, res) => {
    const {voucherId, userId, total} = req.body;
    // console.log(voucherId, userId, total)
    if(!userId || !total){
        res.status(400).json(new ApiResponse(400, null, 'Please provide userId and total'))
        return
    }
    if(!voucherId){
        res.status(201).json(new ApiResponse(201, {total: total, discount:0}, 'No voucher applied'))
        return
    }
    // console.log("Can't use voucher")
    const canUseVoucher = await canUserUseVoucher(userId, voucherId, total);
    if(!canUseVoucher.status){
        res.status(400).json(new ApiResponse(400, {total: total, discount:0}, canUseVoucher.message))
        return
    }
    const discount = await calculateDiscount(userId, voucherId, total);
    res.status(200).json(new ApiResponse(200, {total: (total-discount), discount: discount}, 'Discount calculated'))
})

export {userCheckout, loginUser}