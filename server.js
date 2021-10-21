const express = require('express')
const path = require('path')
const app = express()

const routerApi = require('./routes/api')
const rounterNote = require('./routes/note')

const PORT = process.env.PORT || 3001

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/notes', rounterNote)
app.use('/api', routerApi)


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public', 'index.html'))
})


app.listen(PORT, () =>{
  console.info(`Listen to http://localhost:${PORT}`)
})