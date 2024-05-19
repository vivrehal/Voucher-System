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
        expiry DATE NOT NULL
    )`, (err, result) => {
        if(err) throw err;
        console.log('Voucher table created' + result);
    });
}

const addVoucher = async (voucher) => {
    db.query('INSERT INTO vouchers SET ?', voucher, (err, result) => {
        if(err) throw err;
        console.log('Voucher added to database' + result);
    });
}

const getVoucher = async (code) => {
    const voucher = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM vouchers WHERE code = ?', code, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    return voucher;
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

const deleteVoucher = async (code) => {
    db.query('DELETE FROM vouchers WHERE code = ?', code, (err, result) => {
        if(err) throw err;
        console.log('Voucher deleted from database' + result);
    });
}   

export { createVoucherTable, addVoucher, getVoucher, getAllVouchers, deleteVoucher };
