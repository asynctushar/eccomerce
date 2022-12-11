const express = require('express');
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

//config
dotenv.config({ path: "backend/config/config.env" })

//Routes import
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200
}))

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

//Middlewares for Errors
app.use(errorMiddleware);


module.exports = app;