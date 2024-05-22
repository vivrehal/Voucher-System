import {db} from '../db.js';

const createUserTable = () => {
    db.query(`CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL,
        isAdmin BOOLEAN DEFAULT 0,
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


export { createUserTable, addUser, getUser, getAllUsers, deleteUser, updateUser, getUserById};

