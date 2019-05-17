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

describe('Get /Games', ()=>{
    it('should return status 200 if working',() => {
        return request(server).get('/games').expect(200)
    })

    it('should return an empty array', async () =>{
        const res = await db('games');

        expect(res).toHaveLength(0);

    })

    it('should use json ', async () =>{
       const res= await request(server).get('/games')

        expect(res.type).toBe('application/json');
    })

    it('should return an array' ,async () =>{
        const res= await request(server).get('/games')

        expect(Array.isArray(res.body)).toBe(true)
    })

})

describe('Delete /games/:id', () =>{
    afterEach(async () => {
        await db('games').truncate();
      });

      it('should return a 200 status if the game is deleted', async () =>{
        await db('games').insert({Title:'Fortnite', Genre:'action'});

        const res = await request(server).delete('/games/1');

        expect(res.status).toBe(200)
      })

      it('returns a 404 status if the game doesnt exist', async () => {
        const res = await request(server).delete('/games/12');

        expect(res.status).toBe(404);
    })
})