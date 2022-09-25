const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const dataBase = require('./src/config/db');
const router = require('./src/route');

const app = express();

app.use(
    cors({
        credentials: true,
        origin: true,
    }),
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(express.json());

dataBase.conect();

const PORT = process.env.PORT || 5000;

router(app);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
