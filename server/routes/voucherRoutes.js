import { Router } from "express";
import { createVoucher } from "../contollers/voucherControllers.js";
import { verifyUser } from "../middlewares/auth.js";
import { isUserAdmin } from "../middlewares/isAdmin.js";
import { getAllVouchers } from "../models/voucherSchema.js";

const voucherRouter = Router();

voucherRouter.route('/create-voucher').post(verifyUser, isUserAdmin, createVoucher)
voucherRouter.route('/').get(verifyUser, getAllVouchers)

export default voucherRouter;