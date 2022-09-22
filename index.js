const express = require('express')
const dotenv = require("dotenv").config()
const cors = require("cors")

const app = express()

app.use(cors({ 
    credentials: true, 
    origin: true 
}))

app.use(express.json())

const PORT = process.env.PORT || 5000


app.get('/', (req, res) => res.send("Server"))
app.get('/test', (req, res) => res.send("Server"))

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
