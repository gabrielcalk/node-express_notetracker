const express = require('express');
const fs = require('fs');
const util = require('util')

const routerApi = express.Router();

const uuid = require('../helpers/uuid.js');
const notes = require('../db/db.json');
const e = require('express');
const readFromFile = util.promisify(fs.readFile);

routerApi.get('/notes', (req, res) =>{
    readFromFile('./db/db.json', 'utf-8').then((data) => res.json(JSON.parse(data)));
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
                let parseData = JSON.parse(data);

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

routerApi.delete('/notes/:id', (req, res) =>{
// from :https://www.tabnine.com/code/javascript/functions/express/Express/delete
    const { id } = req.params;
    console.log(id)

    fs.readFile('./db/db.json', 'utf8', (err, data) =>{
        if (err){
            console.error(err)
        } else {
            let parseData = JSON.parse(data);
            console.log(parseData)

            let index_text = parseData.findIndex(p => p.id == id);
            console.log(index_text)

            parseData.splice(index_text, 1)

            fs.writeFile('./db/db.json', JSON.stringify(parseData), (err) => err ? console.info(err) : console.info('sucess'))
        }
    })
})

// routerApi
module.exports = routerApi