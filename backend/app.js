const express = require('express');
const errorMiddleware = require('./middlewares/error');

//Routes import
const product = require('./routes/productRoute');

const app = express();
app.use(express.json())

app.use('/api/v1', product)

//Middlewares for Errors
app.use(errorMiddleware);


module.exports = app;