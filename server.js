const express = require('express')
const path = require('path')
const app = express()
const rounterNote = require('./routes/note')

const PORT = process.env.PORT || 3001

app.use('/notes', rounterNote)


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public', 'index.html'))
})


app.listen(PORT, () =>{
  console.info(`Listen to http://localhost:${PORT}`)
})