const express = require('express');
const fs = require('fs');
const util = require('util')

/**
 * @requires module: express - Router
*/
const routerApi = express.Router();

/**
 * @requires module: local - uuid
*/
const uuid = require('../helpers/uuid.js');
const readFromFile = util.promisify(fs.readFile);

// Getting the data from db.json
routerApi.get('/notes', (req, res) =>{
    readFromFile('./db/db.json', 'utf-8').then((data) => res.json(JSON.parse(data)));
});

/**
 * @method post - /api/notes
 * updating data
 */
routerApi.post('/notes', (req, res) =>{
 const {title, text} = req.body;

    if(title && text){
        const Newinputs = {
            title,
            text,
            id: uuid(),
        };

// reading the data file to update later
        fs.readFile('./db/db.json', 'utf8', (err, data) =>{
            if (err){
                console.error(err)
            } else {
                let parseData = JSON.parse(data);

                parseData.push(Newinputs)

// updating the data with the new note (writing)
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

/**
 * @method delete - /api/notes
 * deleting data
 */
routerApi.delete('/notes/:id', (req, res) =>{ //ok
// from :https://www.tabnine.com/code/javascript/functions/express/Express/delete
    const id = req.params.id;

// reading the data file to update later
    fs.readFile('./db/db.json', 'utf8', (err, data) =>{
        if (err){
            console.error(err)
        } else {
            let parseData = JSON.parse(data);

            let index_text = parseData.findIndex(p => p.id == id);

            parseData.splice(index_text, 1)

// updating the data without the note that was deleted
            fs.writeFile('./db/db.json', JSON.stringify(parseData), (err) => err ? console.info(err) : console.info('sucess'))
        
            res.send(`${req.params.id} deleted`)
        }
    })
})

// routerApi
module.exports = routerApi