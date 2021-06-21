const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const db = require('./db')
const guestRouter = require('./routes/guest-router')
const loginRouter = require('./routes/login-router')

const app = express()
const apiPort = 3000
app.use(
    cors({
        origin: "http://localhost:8000",
        credentials: true
    })
)
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send(req.cookies)
})

app.use('/wedding/api', guestRouter)

app.use('/wedding/api', loginRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))