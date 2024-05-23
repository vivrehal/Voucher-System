import { Router } from "express";
import { applyVoucher, loginUser, registerUser, userCheckout } from "../contollers/userControllers.js";
import { verifyUser } from "../middlewares/auth.js";

const userRouter = Router(); 

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser);
userRouter.route('/apply-voucher').post(verifyUser ,applyVoucher);
userRouter.route('/checkout').post(verifyUser, userCheckout);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Use this route to register a new user.  
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/User_Register'
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Use this route to login a user.
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/User_Login'
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /apply-voucher:
 *   post:
 *     summary: Apply voucher
 *     description: Use this route to apply a voucher to the user's cart.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Voucher applied successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: User checkout
 *     description: Use this route to checkout the user's cart.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Checkout successful.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */

export default userRouter;