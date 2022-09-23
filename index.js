const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const dataBase = require('./src/config/db');

const app = express();

app.use(
    cors({
        credentials: true,
        origin: true,
    }),
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

dataBase.conect();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Server'));
app.get('/test', (req, res) => res.send('Test 2'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
