const express = require('express')
const path = require('path')

const rounterNote = express.Router()

rounterNote.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'notes.html'))
})

module.exports = rounterNote