import { Router } from "express";
import { createVoucher, deleteVoucher, getVouchers } from "../contollers/voucherControllers.js";
import { verifyUser } from "../middlewares/auth.js";
import { isUserAdmin } from "../middlewares/isAdmin.js";

const voucherRouter = Router();

voucherRouter.route('/create-voucher').post(verifyUser, isUserAdmin, createVoucher)
voucherRouter.route('/delete-voucher/').delete(verifyUser, isUserAdmin, deleteVoucher)
voucherRouter.route('/').get(getVouchers)

export default voucherRouter;

/**
* @swagger
* paths:
*   /vouchers/create-voucher:
*     post:
*       summary: Create a new voucher
*       description: Creates a new voucher in the system. Only accessible by admin users.
*       tags:
*         - Vouchers
*       security:
*         - bearerAuth: []
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 code:
*                   type: string
*                   example: "DISCOUNT10"
*                 discount:
*                   type: number
*                   example: 10
*                 minValue:
*                   type: number
*                   example: 50
*                 usageLimit:
*                   type: number
*                   example: 100
*       responses:
*         201:
*           description: Voucher created successfully
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   message:
*                     type: string
*                     example: "Voucher added successfully"
*         401:
*           description: Unauthorized
*         403:
*           description: Forbidden
*/

/**
* @swagger
*   /vouchers/delete-voucher:
*     delete:
*       summary: Delete a voucher
*       description: Deletes a voucher from the system. Only accessible by admin users.
*       tags:
*         - Vouchers
*       security:
*         - bearerAuth: []
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   example: 1
*       responses:
*         200:
*           description: Voucher deleted successfully
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   message:
*                     type: string
*                     example: "Voucher deleted successfully"
*         401:
*           description: Unauthorized
*         403:
*           description: Forbidden
*         404:
*           description: Not Found
*/

/**
* @swagger
*   /vouchers/:
*     get:
*       summary: Get all vouchers
*       description: Retrieves a list of all vouchers.
*       tags:
*         - Vouchers
*       responses:
*         200:
*           description: A list of vouchers
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       example: 1
*                     code:
*                       type: string
*                       example: "DISCOUNT10"
*                     discount:
*                       type: number
*                       example: 10
*                     minValue:
*                       type: number
*                       example: 50
*                     usageLimit:
*                       type: number
*                       example: 100
*         401:
*           description: Unauthorized
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*/