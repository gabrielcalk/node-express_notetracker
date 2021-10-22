const express = require('express')
const path = require('path')
const app = express()

/**
 * Routers
 */

const routerApi = require('./routes/api')
const rounterNote = require('./routes/note')

/**
 * @constant {PORT}
 */
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Defining routes
app.use('/notes', rounterNote)
app.use('/api', routerApi)

// Sending the index.html file is the user acess /
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public', 'index.html'))
})

// Listen to the PORT
app.listen(PORT, () =>{
  console.info(`Listen to http://localhost:${PORT}`)
})