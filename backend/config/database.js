const mongoose = require('mongoose');


const databaseConnect = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
        autoIndex: true
    })
        .then((data) => {
            console.log(`database connected to ${data.connection.host}`)
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = databaseConnect;