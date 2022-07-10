const express = require('express');
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');

//Routes import
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', product)
app.use('/api/v1', user);

//Middlewares for Errors
app.use(errorMiddleware);


module.exports = app;