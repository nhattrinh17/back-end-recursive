const express = require('express');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const dataBase = require('./src/config/db');
const router = require('./src/route');

const app = express();

const corsOptions = {
    origin: '*', // allow cors origin for all client
};

app.use('/uploads', express.static('uploads'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// use cors
app.use(cors(corsOptions));

dataBase.conect();

router(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
