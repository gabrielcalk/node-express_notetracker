const express = require('express')
const path = require('path')
const routerApi = express.Router()
const notes = require('../db/db.json')

routerApi.get('/notes', (req, res) =>{
    res.status(200).json(notes)
})

routerApi.post('/notes', (req, res) =>{

})

routerApi.delete('/notes', (req, res) =>{

})

// routerApi

module.exports = routerApi