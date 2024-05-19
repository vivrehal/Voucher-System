import {db} from '../db.js';
import { getVoucher } from './voucherSchema.js';

const createVoucherUsedTable = () => {
    db.query(`CREATE TABLE IF NOT EXISTS voucher_used(
        userId INT NOT NULL PRIMARY KEY,
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

const vouchersUsedByUser = async (userId, voucherId) => {
    const vouchersUsed = await new Promise((resolve, reject) => {
        db.query('SELECT COUNT(userId) FROM voucher_used WHERE userId = ? AND voucherd = ? GROUP BY userId', [userId, voucherId], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    return vouchersUsed;
}

const voucherFrequencyByUser = async (userId, voucherId) => {
    const frequency = await new Promise((resolve, reject) => {
        db.query('SELECT frequency FROM voucher_used WHERE userId = ? AND voucherd = ?', [userId, voucherId], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    return frequency[0];
}

const canUserUseVoucher = async (userId, voucherId, total) => {
    const vouchersUsed = await vouchersUsedByUser(userId, voucherId);
    const frequency = await voucherFrequencyByUser(userId, voucherId);
    const voucher = await getVoucher(voucherId);
    if(vouchersUsed.length > 0 || frequency>voucher.useLimit || total < voucher.minSpend) {
        return false;
    }
    return true;
}

const calculateDiscount = async (userId, voucherId, total) => {
    const voucher = await getVoucher(voucherId);
    const discount = voucher.isPercent ? (total*voucher.discount/100) : voucher.discount;
    return discount>voucher.maxDiscount ? voucher.maxDiscount : discount;
}



export { createVoucherUsedTable };