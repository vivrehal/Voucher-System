import {db} from '../db.js';

const createVoucherTable = () => {
    db.query(`CREATE TABLE IF NOT EXISTS vouchers(
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(100) NOT NULL UNIQUE,
        isPercent BOOLEAN DEFAULT 0,
        minSpend INT NOT NULL,
        maxDiscount INT NOT NULL,
        useLimit INT NOT NULL,
        discount INT NOT NULL,
        isNewUser BOOLEAN DEFAULT 0,
        expiry DATE NOT NULL
    )`, (err, result) => {
        if(err) throw err;
        console.log('Voucher table created' + result);
    });
}

const addVoucher = async (voucher) => {
    const newVoucher = await new Promise((resolve, reject) => {
        db.query('INSERT INTO vouchers SET ?', voucher, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });

    return newVoucher;
}


const getVoucher = async (id) => {
    const voucher = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM vouchers WHERE id = ?', id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });

    return voucher[0];
}

const getVoucherByCode = async (code) => {
    const voucher = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM vouchers WHERE code = ?', code, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    // console.log(voucher[0])
    return voucher[0];
}

const getAllVouchers = async () => {
    const vouchers = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM vouchers', (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    return vouchers;
}

const deleteVoucherByCode = async (code) => {
    const voucher = await new Promise((resolve, reject) => {
        db.query('DELETE FROM vouchers WHERE code = ?', code, (err, result) => {
            if(err) reject(err);
            console.log('Voucher deleted from database' + result);
            resolve(result);
        });
    });
    return voucher;
}   

export { createVoucherTable, addVoucher, getVoucher, getAllVouchers, deleteVoucherByCode, getVoucherByCode };
