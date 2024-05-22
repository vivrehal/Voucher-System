import { Router } from "express";
import { createVoucher, deleteVoucher, getVouchers } from "../contollers/voucherControllers.js";
import { verifyUser } from "../middlewares/auth.js";
import { isUserAdmin } from "../middlewares/isAdmin.js";

const voucherRouter = Router();

voucherRouter.route('/create-voucher').post(verifyUser, isUserAdmin, createVoucher)
voucherRouter.route('/delete-voucher/').delete(verifyUser, isUserAdmin, deleteVoucher)
voucherRouter.route('/').get(getVouchers)

export default voucherRouter;