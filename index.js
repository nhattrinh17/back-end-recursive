const express = require('express');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const dataBase = require('./src/config/db');
const router = require('./src/route');

const app = express();

// use cors
app.use(cors());

app.use('/uploads', express.static('uploads'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

dataBase.conect();

router(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
