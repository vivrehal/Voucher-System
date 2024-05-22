import { app } from './app.js';
import { connectToDb } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const startServer = () => {
    connectToDb().then(() => {  
            app.listen(process.env.PORT || 5000 , () => {
                console.log('Server running on port ' + process.env.PORT || '5000');
            });
    }).catch((err) => {
        console.log('error connecting to db' + err);
    });
}

startServer();
// addUser({name: 'John Doe', email: 'abc@gmail.com', password: '123456', isAdmin: 0, dob: '1990-01-01', token: '123456'});



