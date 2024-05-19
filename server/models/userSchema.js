import {db} from '../db.js';

const createUserTable = () => {
    db.query(`CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL,
        isAdmin BOOLEAN DEFAULT 0,
        dob DATE NOT NULL,
        token VARCHAR(200) NOT NULL
    )`, (err, result) => {
        if(err) throw err;
        console.log('User table created' + result);
    });
}

const addUser = async (user) => {
    db.query('INSERT INTO users SET ?', user, (err, result) => {
        if(err) throw err;
        console.log('User added to database');
    });
}

const getUser = async (email) => {
    const user = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', email, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
    return user;
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

const isUserAdmin = async (email) => {
    const user = await getUser(email);
    return user[0].isAdmin;
}   


export { createUserTable, addUser, getUser, getAllUsers, deleteUser, updateUser, isUserAdmin};

