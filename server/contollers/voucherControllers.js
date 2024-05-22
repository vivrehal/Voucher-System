import { addVoucher, getAllVouchers, getVoucher, getVoucherByCode, deleteVoucherByCode } from "../models/voucherSchema.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createVoucher = asyncHandler(async(req, res) => {
    const {code, discount, expiry, maxDiscount, minSpend, useLimit, isPercent} = req.body;
    if(!code || !discount || !expiry || !maxDiscount || !minSpend || !useLimit){
        res.status(400).json(new ApiResponse(400, null, 'Please provide all fields'))
        return
    }
    const oldVoucher = await getVoucherByCode(code);
    if(oldVoucher){
        res.status(400).json(new ApiResponse(400, null, 'Voucher code already exists'))
        return
    }

    if(!isPercent && maxDiscount!=discount){
        maxDiscount = discount
    }

    if(isPercent && (discount < 0 || discount > 100)){
        res.status(400).json(new ApiResponse(400, null, 'Invalid discount percentage'))
        return
    }
    const voucher = await addVoucher({code, discount, expiry, maxDiscount, minSpend, useLimit, isPercent});
    if(!voucher){
        res.status(500).json(new ApiResponse(500, null, 'Internal server error'))
        return
    }
    res.status(201).json(new ApiResponse(201, voucher, 'Voucher created'))
})

const getVouchers = asyncHandler(async(req, res) => {
    const vouchers = await getAllVouchers();
    if(!vouchers){
        res.status(500).json(new ApiResponse(500, null, 'Internal server error'))
        return
    }
    res.status(200).json(new ApiResponse(200, vouchers, 'Vouchers retrieved'))
})

const deleteVoucher = asyncHandler(async(req, res) => {
    const {code} = req.query;
    if(!code){
        res.status(400).json(new ApiResponse(400, null, 'Please provide voucher code'))
        return
    }
    console.log(code)
    const voucher= await getVoucherByCode(code);
    if(!voucher){
        res.status(404).json(new ApiResponse(404, null, 'Voucher not found'))
        return
    }
    console.log(voucher)
    const deletedVoucher=await deleteVoucherByCode(code);
    if(!deletedVoucher){
        res.status(500).json(new ApiResponse(500, null, 'Internal server error'))
        return
    }
    res.status(200).json(new ApiResponse(200, null, 'Voucher deleted'))
})



export {createVoucher, getVouchers, deleteVoucher}