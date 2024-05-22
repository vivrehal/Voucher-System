import {db} from '../db.js';
import { getVoucher } from './voucherSchema.js';

const createVoucherUsedTable = () => {
    db.query(`CREATE TABLE IF NOT EXISTS voucher_used(
        userId INT NOT NULL,
        voucherd INT NOT NULL,
        frequency INT NOT NULL,
        lastUsed DATETIME NOT NULL
    )`, (err, result) => {
        if(err) throw err;
        console.log('Voucher Used table created' + result);
    });
}

const addVoucherUsed = async (voucherUsed) => {
    db.query('INSERT INTO voucher_used SET ?', voucherUsed, (err, result) => {
        if(err) throw err;
        console.log('Voucher Used added to database' + result);
    });
}

// const vouchersUsedByUser = async (userId, voucherId) => {
//     console.log(userId, voucherId)
//     const vouchersUsed = await new Promise((resolve, reject) => {
//         db.query('SELECT COUNT(userId) FROM voucher_used WHERE userId = ? AND voucherId = ? GROUP BY userId', [userId, voucherId], (err, result) => {
//             if(err) reject(err);
//             resolve(result);
//         });
//     });
//     return vouchersUsed;
// }

const voucherFrequencyByUser = async (userId, voucherId) => {
    const frequency = await new Promise((resolve, reject) => {
        db.query('SELECT frequency FROM voucher_used WHERE userId = ? AND voucherId = ?', [userId, voucherId], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    console.log(frequency[0]?.frequency)
    return frequency[0]?.frequency || 0;
}

const canUserUseVoucher = async (userId, voucherId, total) => {
    // const vouchersUsed = await vouchersUsedByUser(userId, voucherId);
    // console.log(voucherId, userId, total)
    const frequency = await voucherFrequencyByUser(userId, voucherId);
    if(!frequency){
        return {status: true, message: 'Voucher can be used'};
    }
    const voucher = await getVoucher(voucherId);
    if(frequency>voucher.useLimit) {
        return {status: false, message: 'Voucher limit reached'};
    }
    if(total < voucher.minSpend){
        return {status: false, message: 'Minimum spend ' + voucher.minSpend + ' not reached'};
    }
    if(voucher.expiry < new Date()){
        return {status: false, message: 'Voucher expired'};
    }
    return {status: true, message: 'Voucher can be used'};
}

const calculateDiscount = async (userId, voucherId, total) => {
    const voucher = await getVoucher(voucherId);
    // console.log(voucher);
    const discount = voucher.isPercent ? (total*voucher.discount/100) : voucher.discount;
    // console.log(discount)
    return discount>voucher.maxDiscount ? voucher.maxDiscount : discount;
}


export { createVoucherUsedTable, addVoucherUsed, canUserUseVoucher, calculateDiscount};