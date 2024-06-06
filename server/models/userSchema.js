import {db} from '../db.js';

const createUserTable = () => {
    db.query(`CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL,
        isAdmin BOOLEAN DEFAULT 0,
        walletBalance FLOAT DEFAULT 0,
        orderPlaced INT DEFAULT 0,
        dob DATE NOT NULL
    )`, (err, result) => {
        if(err) throw err;
        console.log('User table created' + result);
    });
}

const addUser = async (user) => {
    const addedUser=new Promise((resolve, reject)=>{
        db.query('INSERT INTO users SET ?', user, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    return addedUser;
}

const getUser = async (email) => {
    const user = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', email, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    return user[0];
}

const getUserById = async (id) => {
    const user = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE id = ?', id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    return user[0];
}   

const getAllUsers = async () => {
    const users = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    return users;
}

const deleteUser = async (email) => {
    db.query('DELETE FROM users WHERE email = ?', email, (err, result) => {
        if(err) throw err;
        console.log('User deleted from database');
    });
}

const updateUser = async (email, user) => {
    db.query('UPDATE users SET ? WHERE email = ?', [user, email], (err, result) => {
        if(err) throw err;
        console.log('User updated in database');
    });
}

const orderPlaced = async (id) => {
    const orderPlaced = await new Promise((resolve, reject) => {    
        db.query('SELECT orderPlaced FROM users WHERE id = ?', id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    return orderPlaced[0];
}

const incrementOrderPlaced = async (id) => {
    const presentOrderPlaced = await orderPlaced(id);
    if(presentOrderPlaced===undefined || presentOrderPlaced===null) {
        return {success: false};
    }
    db.query('UPDATE users SET orderPlaced = presentOrderPlaced + 1 WHERE id = ?', id, (err, result) => {
        if(err) return {success: false};
        console.log('Order placed incremented');
    });
    return {success: true, ordersPlaced: presentOrderPlaced+1};
}

const getWalletBalance = async (id) => {
    const balance = await new Promise((resolve, reject) => {
        db.query('SELECT walletBalance FROM users WHERE id = ?', id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    return balance[0]?.walletBalance;
}

const useWalletBalance = async (id, amount) => {
    const presentBalance = await getWalletBalance(id);
    console.log(presentBalance)
    if(presentBalance===undefined || presentBalance===null) {
        return {success: false};
    }
    if(presentBalance < amount) {
        const updatedAmount = amount-presentBalance;
        db.query('UPDATE users SET walletBalance = ? WHERE id = ?', [0, id], (err, result) => {
            if(err) return {success: false};
            console.log('Wallet balance updated');
        });
        return {presentBalance: 0, updatedAmount, success: true};
    }
    else {
        const updatedWalletBalance = presentBalance-amount;
        // console.log(updatedWalletBalance)
        const updatedAmount = 0;
        db.query('UPDATE users SET walletBalance = ? WHERE id = ?', [updatedWalletBalance, id], (err, result) => {
            if(err) return {success: false};
            console.log('Wallet balance updated');
        });
        return {presentBalance: updatedWalletBalance, updatedAmount, success: true};
    }
}



export { createUserTable, addUser, getUser, getAllUsers, deleteUser, updateUser, getUserById, getWalletBalance, useWalletBalance, incrementOrderPlaced};

// Register Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     User_Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - dob
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *           default: false
 *         dob:
 *           type: string
 */
/**
 
// Login Schema
 * @swagger
 * components:
 *   schemas:
 *     User_Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */