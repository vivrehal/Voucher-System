import { Router } from "express";
import { applyVoucher, loginUser, registerUser, userCheckout, useWallet, userWalletBalance } from "../contollers/userControllers.js";
import { verifyUser } from "../middlewares/auth.js";

const userRouter = Router(); 

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/apply-voucher').post(verifyUser ,applyVoucher);
userRouter.route('/useWallet').post(verifyUser, useWallet);
userRouter.route('/walletBalance').get(verifyUser, userWalletBalance);
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
 *     tags:
 *       - Users
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
 *     tags:
 *       - Users
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
 *     tags:
 *       - Users
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
 *     tags:
 *       - Users
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


/**
 * @swagger
 * /useWallet:
 *   post:
 *     summary: Use wallet balance
 *     description: Use this route to use wallet balance on the total.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet balance used successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /walletBalance:
 *   get:
 *     summary: User wallet balance
 *     description: Use this route to check user's wallet balance.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: wallet balance fetched successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */

export default userRouter;