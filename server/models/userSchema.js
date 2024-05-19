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


export { createUserTable, addUser };