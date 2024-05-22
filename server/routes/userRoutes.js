import { Router } from "express";
import { userCheckout, loginUser } from "../contollers/userControllers.js";
import { verifyUser } from "../middlewares/auth.js";

const userRouter = Router(); 

userRouter.route('/login').post(loginUser);
userRouter.route('/checkout').post(verifyUser ,userCheckout);

export default userRouter; 