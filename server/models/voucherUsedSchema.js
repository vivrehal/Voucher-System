import {db} from '../db.js';

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

export { createVoucherUsedTable };