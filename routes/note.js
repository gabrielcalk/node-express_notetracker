const express = require('express')
const path = require('path')
const rounterNote = express.Router()

// Sending the notes.html if the user acess /notes/
rounterNote.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'notes.html'))
})

module.exports = rounterNote