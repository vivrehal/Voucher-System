import express from 'express';
import cors from 'cors';
import cookies from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './api_documentation/swaggerDocs.js';

const app = express();


app.use(express.json());
app.use(cors(
    {origin: '*'}
));

app.use(express.urlencoded({ extended: true }));
app.use(cookies())

app.get('/', (req, res) => {
    res.send('Voucher System Backend');
});

//Routes
import voucherRouter from './routes/voucherRoutes.js';
import userRouter from './routes/userRoutes.js';

app.use('/api/v1/vouchers', voucherRouter);
app.use('/api/v1/users', userRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export {app}

