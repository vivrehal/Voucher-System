import { addVoucher, getVoucher, getVoucherByCode } from "../models/voucherSchema.js";
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

export {createVoucher}