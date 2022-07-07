const express = require('express');

//Routes import
const product = require('./routes/productRoute');

const app = express();
app.use(express.json())

app.use('/api/v1', product)

module.exports = app;