import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { addVoucherUsed, calculateDiscount, canUserUseVoucher, voucherFrequencyByUser } from "../models/voucherUsedSchema.js";
import { addUser, getUser, getUserById, getWalletBalance, useWalletBalance } from "../models/userSchema.js";
import { generateToken } from "../utils/generateToken.js";
import { getVoucher } from "../models/voucherSchema.js";

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password, dob} = req.body;
    if(!name || !email || !password || !dob){
        res.status(400).json(new ApiResponse(400, null, 'Please provide all fields'))
        return
    }
    const user = await getUser(email);
    if(user){
        res.status(400).json(new ApiResponse(400, null, 'User already exists'))
        return
    }
    const newUser = await addUser({name, email, password, dob});
    console.log(newUser)
    if(!newUser){
        res.status(500).json(new ApiResponse(500, null, 'Internal server error'))
        return
    }
    res.status(201).json(new ApiResponse(201, newUser, 'User created'))
})

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

const applyVoucher = asyncHandler(async(req, res) => {
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
    const voucher = await getVoucher(voucherId);
    if(!voucher){
        res.status(404).json(new ApiResponse(404, {total: total, discount:0}, 'Voucher not found'))
        return
    }

    const canUseVoucher = await canUserUseVoucher(userId, voucherId, total);
    if(!canUseVoucher.status){
        res.status(400).json(new ApiResponse(400, {total: total, discount:0}, canUseVoucher.message))
        return
    }
    const discount = await calculateDiscount(userId, voucherId, total);
    res.status(200).json(new ApiResponse(200, {total: (total-discount), discount: discount}, 'Discount calculated'))
})

const userCheckout = asyncHandler(async(req, res) => {
    const {userId, total, voucherId} = req.body;
    if(!userId || !total){
        res.status(400).json(new ApiResponse(400, null, 'Please provide total'));
        return
    }
    if(voucherId===undefined || voucherId===null){
        res.status(201).json(new ApiResponse(201, {total: total}, 'Order Placed Successfully'));
        return
    }
    const voucher = await getVoucher(voucherId);
    if(!voucher){
        res.status(404).json(new ApiResponse(404, {total: total, discount:0}, 'Voucher not found'))
        return
    }
    const canUseVoucher = await canUserUseVoucher(userId, voucherId, total);
    if(!canUseVoucher.status){
        res.status(400).json(new ApiResponse(400, null, canUseVoucher.message));
        return
    }
    const discount = await calculateDiscount(userId, voucherId, total);
    const voucherUsed = await addVoucherUsed({userId, voucherId});
    const newFrequency = await voucherFrequencyByUser(userId, voucherId);
    // console.log(voucher.useLimit, voucherUsed)
    res.status(200).json(new ApiResponse(200, {total: (total-discount), remainingLimit: (voucher.useLimit-newFrequency)}, 'Order Placed Successfully'));

    
})

const useWallet = asyncHandler(async(req, res) => {
    const {userId, amount} = req.body;
    if(!userId || !amount){
        res.status(400).json(new ApiResponse(400, null, 'Please provide userId and amount'))
        return
    }
    const user = await getUserById(userId);
    if(!user){
        res.status(404).json(new ApiResponse(404, null, 'User not found'))
        return
    }
    const response = await useWalletBalance(userId, amount);
    if(!response || response?.flag===false){
        res.status(500).json(new ApiResponse(500, null, 'Internal server error'))
        return
    }
    res.status(200).json(new ApiResponse(200, response, 'Wallet balance used successfully'))
})

const userWalletBalance = asyncHandler(async(req, res) => {
    const {userId} = req.body;
    if(!userId){
        res.status(400).json(new ApiResponse(400, null, 'Please provide userId'))
        return
    }
    const balance = await getWalletBalance(userId);
    if(!balance){
        res.status(404).json(new ApiResponse(404, null, 'User not found'))
        return
    }
    res.status(200).json(new ApiResponse(200, balance, 'Wallet balance fetched successfully'))
})

export {applyVoucher, loginUser, registerUser, userCheckout, useWallet, userWalletBalance}