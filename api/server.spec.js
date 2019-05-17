const request=require('supertest')

const server=require('./server.js')

const db=require('../data/dbConfig.js');

describe('Post /games' , () =>{
    afterEach(async () => {
        await db('games').truncate();
      });

      it('should add a new game', async () => {
        await db('games').insert({Title:'Fortnite', Genre:'action'});
  
        const games = await db('games');
  
        expect(games).toHaveLength(1);
      })
      
      it('should return a status 200 if a game is added', async () =>{
        const game={Title:'Fortnite',Genre:"action"}

        const res = await request(server).post('/games').send(game);

        expect(res.status).toBe(200);
      })
    
      it('should return a status 422 if missing Title or Genre fields', async () =>{
        const game={Title:'Fortnite'}

        const res = await request(server).post('/games').send(game);

        expect(res.status).toBe(422);
      })
      
})