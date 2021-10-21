const express = require('express');
const fs = require('fs');

const routerApi = express.Router();

const uuid = require('../helpers/uuid.js');
const notes = require('../db/db.json');

routerApi.get('/notes', (req, res) =>{
    res.status(200).json(notes);
});

routerApi.post('/notes', (req, res) =>{
 const {title, text} = req.body;
 console.log(req.body);

    if(title && text){
        const Newinputs = {
            title,
            text,
            id: uuid(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) =>{
            if (err){
                console.error(err)
            } else {
                const parseData = JSON.parse(data);

                parseData.push(Newinputs)

                fs.writeFile('./db/db.json', JSON.stringify(parseData), (err) => err ? console.info(err) : console.info('sucess'))
            }
        })
        const response = {
            status: 'sucess',
            body: Newinputs,
        }
        res.status(200).json(response)
    } else{
        res.status(500).json('error trying to post the inputs')
    }
})

routerApi.delete('/notes', (req, res) =>{

})

// routerApi
module.exports = routerApi