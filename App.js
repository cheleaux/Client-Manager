const express = require('express')
const path = require('node:path')
const app = express()

app.use( express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile( path.resolve(__dirname, 'public/index.html'))
})

app.listen(3005)