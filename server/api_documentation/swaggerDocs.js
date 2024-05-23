import swaggerJsDoc from 'swagger-jsdoc';


const port = process.env.PORT || 5000;
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Voucher System API',
            version: '1.0.0',
            description: 'API documentation for the Voucher System',
        },
        servers: [
            {
                url: `http://localhost:${port}/api/v1`,
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], // Replace with the path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs };