const express = require('express')
const path = require('path')
const routerApi = express.Router()

const uuid = require('../helpers/uuid')
const notes = require('../db/db.json')

routerApi.get('/notes', (req, res) =>{
    res.status(200).json(notes)
})

routerApi.post('/notes', (req, res) =>{
 console.info(`${req.method} request revied`)
 console.info(req.body)
//  const {text_title, text} = req.body;

//  if(text_title && text){
//      const inputs = {
//          status: 'success',
//          text_title,
//          text
//      }
//      console.info(inputs)
//  }


})

routerApi.delete('/notes', (req, res) =>{

})

// routerApi

module.exports = routerApi