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
        res.status(422).json({error: 'There needs to be a Title, and a Genre to Add a game'})
    }
})

server.get('/games', (req, res) =>{
    db('games')
    .then(games=>{
      res.status(200).json(games)
    }) 
    .catch(err =>{ 
        res.status(500).json({error:'there was an error while getting the games'}) 
    })
  });

  server.delete('/games/:id', (req, res) => {
    db('games')
    .where({id:req.params.id})
    .del()
    .then(count =>{
      if (count>0){
        res.status(200).json({message:`${count} game was deleted`})
      }else{
        res.status(404).json({message:'the specified game does not exist'})
      }
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  });

module.exports = server;