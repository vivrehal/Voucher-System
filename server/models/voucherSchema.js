import {db} from '../db.js';

const createVoucherTable = () => {
    db.query(`CREATE TABLE IF NOT EXISTS vouchers(
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(100) NOT NULL UNIQUE,
        isPercent BOOLEAN DEFAULT 0,
        useLimit INT NOT NULL,
        discount INT NOT NULL,
        expiry DATE NOT NULL
    )`, (err, result) => {
        if(err) throw err;
        console.log('Voucher table created' + result);
    });
}

export { createVoucherTable };