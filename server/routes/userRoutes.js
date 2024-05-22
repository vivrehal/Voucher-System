import { Router } from "express";
import { applyVoucher, loginUser, registerUser, userCheckout } from "../contollers/userControllers.js";
import { verifyUser } from "../middlewares/auth.js";

const userRouter = Router(); 

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser);
userRouter.route('/apply-voucher').post(verifyUser ,applyVoucher);
userRouter.route('/checkout').post(verifyUser, userCheckout);

export default userRouter; 