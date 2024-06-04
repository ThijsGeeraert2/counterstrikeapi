const express = require('express');
const cors = require('cors');
const app = express();
//config
const config = require("config")
//swagger
const swaggerUi = require("swagger-ui-express")
const swaggerFile = require('./swagger-output.json')
//Database
const mongoose = require('mongoose');
const mongoConnectString = config.connectionString;
const port = config.port;
//DBConnection
mongoose.connect(mongoConnectString)
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to DB"))


app.use(cors());

app.use(express.json())



const knifeRoute = require('./routes/knives')
app.use('/api/knives', knifeRoute)
const gloveRoute = require('./routes/gloves')
app.use('/api/gloves', gloveRoute)
const userRoute = require('./routes/users')
app.use('/api/users', userRoute)
const authenticationRoute = require('./routes/authentication')
app.use('/api/auth', authenticationRoute)
const rifleRoute = require('./routes/rifles')
app.use('/api/rifles', rifleRoute)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;