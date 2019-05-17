const express = require('express');

const server = express();

server.use(express.json());
const db = require("../data/dbConfig");

server.post('/games',(req, res) =>{
    if (req.body.Title && req.body.Genre) {
     db('games')
     .insert(req.body)
     .then(game => res.status(200).json(game))
     .catch(err => {
        res.status(500).json({message: "there was an error when adding the game" })
        })
    }else {
        res.status(422).json({error: 'There needs to be a name, and a Genre to Add a game'})
    }
})

module.exports = server;