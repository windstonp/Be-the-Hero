const request = require('supertest');
const app = require('../../src/app.js');
const connection = require('../../src/database/connection');
describe('NGO',()=>{
  beforeEach(async ()=>{
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  it('should be able to create a new NGO',async ()=>{
    const response = await request(app)
    .post('/NGO')
    .set('authorization','14d1dc4b')
    .send(
      {
        "name": "Alvez",
        "email": "teste@test.com",
        "whatsapp": "2100000000",
        "city":"tuba",
        "UF": "SC"
      }
    );
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
  afterAll(async ()=>{
    await connection.destroy();
  });
});