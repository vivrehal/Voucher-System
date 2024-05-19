import mysql from 'mysql';
import { createUserTable } from './models/userSchema.js';
import { createVoucherTable } from './models/voucherSchema.js';
import { createVoucherUsedTable } from './models/voucherUsedSchema.js';


let db = undefined;
const connectToDb = async()=>{
   db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    db.connect((err)=>{
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connected with Database');
    });
    createUserTable();
    createVoucherTable();
    createVoucherUsedTable();

}

export { connectToDb, db};