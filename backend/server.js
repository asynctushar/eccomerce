const app = require('./app');
const dotenv = require('dotenv');
const databaseConnect = require('./config/database');

//config
dotenv.config({ path: "backend/config/config.env" })

//database connect 
databaseConnect();


app.listen(process.env.PORT, () => {
    console.log("App started at http://localhost:" + process.env.PORT)
})